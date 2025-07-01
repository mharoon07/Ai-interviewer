import { NextResponse } from "next/server";
import connectDb from "../../../lib/db";
import User from "../../../model/UserSchemaDb";
import Interview from "../../../model/InterviewSchemaDb";
import Job from "../../../model/JobsSchemaDb"; 
import { getUserIdFromCookies } from "../../../helper/getUserId";

export async function GET(request) {
  await connectDb();
  console.log("Step 1: Database connected");

  try {
    // Step 2: Get userId from cookies
    const userId = await getUserIdFromCookies(request);
    // console.log("Step 2: userId =", userId);
    if (!userId) {
      // console.log("Step 2: No userId found in cookies");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Step 3: Validate userId format
    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      // console.log("Step 3: Invalid userId format =", userId);
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Step 4: Find user and populate appliedInterviews
    const user = await User.findById(userId).populate("appliedInterviews");
    // console.log("Step 4: User =", user);
    if (!user) {
      // console.log("Step 4: User not found for userId =", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Step 5: Extract jobId from appliedInterviews
    const jobIds = user.appliedInterviews
      .map((interview) => {
        // console.log("Step 5: Processing interview =", interview);
        return interview.jobId; // Use jobId from Interview schema
      })
      .filter(Boolean); // Remove null/undefined
    // console.log("Step 5: jobIds =", jobIds);

    // Step 6: Fetch jobs using jobIds
    const jobs = await Job.find({ _id: { $in: jobIds } });
    // console.log("Step 6: Jobs =", jobs);

    // Step 7: Return jobs
    // console.log("Step 7: Returning jobs response");
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