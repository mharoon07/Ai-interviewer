import { NextResponse } from "next/server";
import connectDb from "../../../lib/db";
import Job from "../../../model/JobsSchemaDb";
import { getUserIdFromCookies } from "../../../helper/getUserId";

export async function GET(request) {
  try {
    await connectDb();
    const recruiterId = await getUserIdFromCookies(request);
    console.log(recruiterId + "recruiterId in route ");
    if (!recruiterId) {
      return NextResponse.json(
        { error: "Recruiter ID is required" },
        { status: 400 }
      );
    }
    console.log("Finding jobs for recruiter ID:", recruiterId);
    const jobs = await Job.find({ recruiterId }).lean();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
