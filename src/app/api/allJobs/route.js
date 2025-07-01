import { NextResponse } from "next/server";
import connectDb from "../../../lib/db";
import Job from "../../../model/JobsSchemaDb";

export async function GET() {
  try {
    await connectDb();
    // { status: "open" }
    const jobs = await Job.find().lean();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs for candidates:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
