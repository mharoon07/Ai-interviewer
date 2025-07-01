import { NextResponse } from "next/server";
import InterviewSessionSchema from "../../../model/InterviewSessionSchema";
import connectDb from "../../../lib/db.js";
import { getUserIdFromCookies } from "../../../helper/getUserId";

export const POST = async (req) => {
  try {
    await connectDb();

    const userId = await getUserIdFromCookies(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("resume");
    const jobId = formData.get("jobid");
    const jobCategory = formData.get("jobCategory");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: file.type });
    const forwardedFormData = new FormData();
    forwardedFormData.append("resume", blob, file.name);
    forwardedFormData.append("jobCategory", jobCategory);

    const response = await fetch("http://localhost:4000/analyze-resume", {
      method: "POST",
      body: forwardedFormData,
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.message || "Backend error" }, { status: response.status });
    }

    const result = await response.json();
    const feedbackOutput = result?.feedback?.output || "";

    const scoreMatch = feedbackOutput.match(/Resume Score:\s*(\d+)\s*\/\s*10/i);
    const resumeScore = scoreMatch ? parseInt(scoreMatch[1], 10) : null;

    const remarksMatch = feedbackOutput.match(/\*\*Remarks:\*\*\s*([\s\S]*?)(\n?\*{2}|$)/);
    const feedbackRemarks = remarksMatch ? remarksMatch[1].trim() : null;

    console.log("Resume Score:", resumeScore);
    console.log("Remarks:", feedbackRemarks);

    const existingSession = await InterviewSessionSchema.findOne({
      userId,
      jobId: { $in: [jobId] }
    });

    if (existingSession) {
      const stepIndex = existingSession.steps.findIndex(step => step.stepName === "Resume Analysis");

      const updatedStep = {
        stepName: "Resume Analysis",
        status: "completed",
        score: resumeScore,
        remarks: feedbackRemarks,
      };

      if (stepIndex !== -1) {
        existingSession.steps[stepIndex] = updatedStep;
      } else {
        existingSession.steps.push(updatedStep);
      }

      existingSession.overallScore = resumeScore;
      existingSession.capabilityStatus = resumeScore > 6 ? "fit" : "needs_review";
      existingSession.feedback = feedbackRemarks;

      await existingSession.save();
      return NextResponse.json(result);
    }

    const newSession = new InterviewSessionSchema({
      userId,
      jobId: [jobId],
      interviewId: userId,
      steps: [{
        stepName: "Resume Analysis",
        status: "completed",
        score: resumeScore,
        remarks: feedbackRemarks,
      }],
      overallScore: resumeScore,
      capabilityStatus: resumeScore > 6 ? "fit" : "needs_review",
      feedback: feedbackRemarks,
    });

    await newSession.save();
    return NextResponse.json(result);

  } catch (err) {
    console.error("❌ Error forwarding resume:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
