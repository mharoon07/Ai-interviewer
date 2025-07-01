import connectDb from "../../../lib/db";
import Job from "../../../model/JobsSchemaDb";
import User from "../../../model/UserSchemaDb";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDb();

  try {
    const { jobId } = await req.json();
  
    if (!jobId) {
      return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
    }

    // Get job by ID to get candidate IDs
    const job = await Job.findById(jobId);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Extract candidate IDs from the job
    const candidateIds = job.candidates || [];

    // Get user details for those IDs
    const users = await User.find(
      { _id: { $in: candidateIds } },
      "name email "
    );
    return NextResponse.json({ candidates: users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
