import { NextResponse } from "next/server";
import connectDb from "../../../lib/db.js";
import Interview from "../../../model/InterviewSchemaDb.js";
import User from "../../../model/UserSchemaDb.js";
import Job from "../../../model/JobsSchemaDb.js";
import { getUserIdFromCookies } from "../../../helper/getUserId.js";

export async function POST(request) {
  await connectDb();

  try {
    const body = await request.json();
    const { jobId } = body;

    // Await getUserIdFromCookies since it's likely async
    const userId = await getUserIdFromCookies(request);
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Validate userId and jobId format
    if (!/^[0-9a-fA-F]{24}$/.test(userId) || !/^[0-9a-fA-F]{24}$/.test(jobId)) {
      return NextResponse.json({ error: "Invalid userId or jobId" }, { status: 400 });
    }

    const job = await Job.findById(jobId);
    console.log("jobId:", jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Check for existing interview where userId is in candidateId array
    const existingInterview = await Interview.findOne({
      jobId, // Match jobId field in Interview schema
      candidateId: { $in: [userId] }, // Check if userId is in candidateId array
    });

    console.log(existingInterview + "existingInterview")

    if (existingInterview) {
      return NextResponse.json(
        { message: "You have already applied to this job." },
        { status: 409 }
      );
    }

    const recruiterId = job.recruiterId?.toString() || "recruiter_placeholder";
    console.log("recruiterId:", recruiterId);

    // Create interview with correct field names
    const interview = await Interview.create({
      jobId, // Match Interview schema
      candidateId: [userId], // candidateId is an array
      recruiterId, // Match Interview schema
      interviewDate: new Date(),
    });

    // Add interview to user's appliedInterviews
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { appliedInterviews: interview._id },
      },
      { new: true }
    );

    // Add candidate to job's candidates array
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        $addToSet: { candidates: userId },
      },
      { new: true }
    );

    if (!updatedUser || !updatedJob) {
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: "Interview created and added to user",
        interviewId: interview._id,
        user: updatedUser,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error processing interview apply:", err);
    return NextResponse.json(
      { error: process.env.NODE_ENV === "development" ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}