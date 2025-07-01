import { jobFormSchema } from "../../../types/jobFormSchema";
import connectDb from "../../../lib/db";
import { NextResponse } from "next/server";
import Job from "../../../model/JobsSchemaDb";
import { getUserIdFromCookies } from "../../../helper/getUserId";

export async function POST(request) {
  try {
    await connectDb();
    const body = await request.json();
    const recruiterId = await getUserIdFromCookies(request);
    console.log("Incoming Body:", body);
    const validData = jobFormSchema.parse(body);
    const {
      title,
      category,
      description,
      status,
      jobType,
      workMode,
      salary,
      timing,
    } = validData;
    const job = new Job({
      recruiterId,
      title,
      category,
      description,
      status,
      jobType,
      workMode,
      salary,
      timing,
    });
    console.log("JOB Data:", job);
    const savedJob = await job.save();
    console.log("Saved Job:", savedJob);
    return NextResponse.json(
      {
        status: true,
        message: "Job created successfully",
        job: savedJob,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          status: false,
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        status: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
