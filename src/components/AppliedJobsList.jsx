"use client";
import { useEffect, useState } from "react";
import { getappliedjobs } from "../services/interviewService";
import Link from "next/link";

export default function AppliedJobsList({ refreshTrigger }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(refreshTrigger + "refreshTrigger");
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setLoading(true); // optional to show loading again
      try {
        const res = await getappliedjobs();
        if (res && res.jobs) {
          setJobs(res.jobs);
        } else {
          console.error("Failed to fetch applied jobs:", res?.error);
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <p className="text-center text-gray-400 animate-pulse">
        Loading applied jobs...
      </p>
    );
  }

  if (jobs.length === 0) {
    return (
      <p className="text-center text-gray-400">
        You haven’t applied to any jobs yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white text-center mb-4">
        Applied Jobs
      </h2>

      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-white">{job.title}</h3>
              <p className="text-blue-400 text-sm">{job.category}</p>
            </div>
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                job.status === "open"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {job.status}
            </span>
          </div>

          <p className="text-gray-300 mt-4">{job.description}</p>

          <div className="mt-6 text-right">
            <Link
              href={`/dashboard/candidate/ResumeAnalyzer?jobid=${job._id}&jobCat=${job.category}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-xl transition-all"
            >
              Start Interview
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
