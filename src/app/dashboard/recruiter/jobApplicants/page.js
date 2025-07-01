"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { jobApplicants } from "../../../../services/jobService";

export default function JobApplicantsPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await jobApplicants({ jobId });
        setCandidates(res.candidates || []);
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchApplicants();
    }
  }, [jobId]);

  return (
    <div
      className="min-h-screen text-white px-4 py-20"
      style={{
        background:
          "linear-gradient(338deg,rgba(79, 78, 78, 1) 0%, rgba(0, 0, 0, 1) 29%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Job Applicants
        </h1>

        {loading ? (
          <div className="text-center py-16 text-gray-400 text-lg animate-pulse">
            Fetching applicants...
          </div>
        ) : candidates.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-lg">
            No one has applied for this job yet.
          </div>
        ) : (
          <ul className="space-y-6">
            {candidates.map((user) => (
              <li
                key={user._id}
                className="bg-gray-800 rounded-2xl p-6 flex items-center gap-5 shadow-lg hover:shadow-blue-600/40 transition-shadow"
              >
                <img
                  src={
                    user.profilePic ||
                    "https://icons.veryicon.com/png/o/internet--web/web-interface-flat/6606-male-user.png"
                  }
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500"
                />
                <div>
                  <p className="text-xl font-semibold">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
