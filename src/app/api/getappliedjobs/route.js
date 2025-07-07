import { NextResponse } from "next/server";
import connectDb from "../../../lib/db";
import User from "../../../model/UserSchemaDb";
import Job from "../../../model/JobsSchemaDb";
import { getUserIdFromCookies } from "../../../helper/getUserId";

export async function GET(request) {
  await connectDb();
  console.log("Step 1: Database connected");

  try {

    const userId = await getUserIdFromCookies(request);

    if (!userId) {

      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {

      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }


    const user = await User.findById(userId).populate("appliedInterviews");

    if (!user) {

      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }


    const jobIds = user.appliedInterviews
      .map((interview) => {

        return interview.jobId;
      })
      .filter(Boolean);



    const jobs = await Job.find({ _id: { $in: jobIds } });

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return NextResponse.json(
      {
        error: process.env.NODE_ENV === "development" ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}