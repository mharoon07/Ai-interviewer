import { NextResponse } from "next/server";
import InterviewSessionSchema from "../../../model/InterviewSessionSchema";
import connectDb from "../../../lib/db.js";
import { getUserIdFromCookies } from "../../../helper/getUserId";
export async function POST(req) {
    try {
        await connectDb();
        const jobId = await req.json();
        const userId = await getUserIdFromCookies(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const existingSession = await InterviewSessionSchema.findOne({
            userId,
            jobId: { $in: [jobId] }
        });
        if (existingSession) {
            const resumeStep = existingSession.steps.find(
                step => step.stepName === "Resume Analysis" && step.status === "completed"
            );
            if (resumeStep) {
                console.log("✅ Resume Analysis already completed. Redirecting to /dashboard");
                return NextResponse.json({
                    message: "Resume Analysis already completed",
                    redirect: "/dashboard/candidate/InterviewRoom"
                });
            }
        }
        console.log("🆕 Resume Analysis not completed. Proceeding to Resume Analyzer");
        return NextResponse.json({
            message: "Proceed to Resume Analysis",
            redirect: "/profile"
        });
    } catch (err) {
        console.error("Error checking resume analysis status:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
