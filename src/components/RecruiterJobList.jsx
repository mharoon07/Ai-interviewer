"use client";
import { useEffect, useState } from "react";
import { getJobsByRecruiter, getAllJobs } from "../services/jobService";
import { ApplyForJob } from "../services/interviewService";
import Link from "next/link";
import { UsersIcon, PencilIcon, EyeIcon, FileUser } from "lucide-react";
import { toast } from "react-hot-toast";

export default function RecruiterJobList({ role, onJobApplied }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let res;
        if (role === "recruiter") {
          res = await getJobsByRecruiter();
        } else {
          res = await getAllJobs();
        }

        if (res) setJobs(res);
        if (res?.error) toast.error(res.error);
      } catch (err) {
        console.error("Error fetching jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [role]);

  const ApplyNow = async (jobId) => {
    try {
      const res = await ApplyForJob({ jobId });
      toast.success("Successfully applied for the job!");
      console.log(res);

      if (onJobApplied) onJobApplied();
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Something went wrong";

      if (status === 409) {
        toast.error("You have already applied to this job.");
      } else {
        toast.error(message);
      }

      console.error("Apply error:", error);
    }
  };

  if (loading) {
    return (
      <p className="text-white text-center py-10 text-lg animate-pulse">
        Loading jobs...
      </p>
    );
  }

  if (jobs.length === 0) {
    return (
      <p className="text-white text-center py-10 text-lg">
        {role === "recruiter"
          ? "You haven't posted any jobs yet."
          : "No jobs available at the moment."}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        {role === "recruiter" ? "Your Job Posts" : "Available Jobs"}
      </h2>

      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-1">{job.title}</h3>
              <p className="text-gray-400 text-sm">{job.category}</p>
              <span
                className={`inline-block mt-2 text-sm font-semibold px-3 py-1 rounded-full ${
                  job.status === "open"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {job.status === "open" ? "Open" : "Closed"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 justify-end">
              {role === "candidate" && (
                <button
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 transition-all"
                  onClick={() => ApplyNow(job._id)}
                >
                  <FileUser className="w-4 h-4" />
                  Apply
                </button>
              )}

              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <UsersIcon className="w-4 h-4" />
                <span>{job.candidates?.length || 0} Applicants</span>
              </div>

              {role === "recruiter" && (
                <>
                  <Link
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 transition-all"
                    href={`/dashboard/recruiter/jobApplicants?jobId=${job._id}`}
                  >
                    <EyeIcon className="w-4 h-4" />
                    View Applicants
                  </Link>

                  <button className="flex items-center gap-2 border border-gray-500 hover:bg-gray-700 text-white rounded-xl px-4 py-2 transition-all">
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
