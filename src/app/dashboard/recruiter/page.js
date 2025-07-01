"use client";
import { useEffect, useState } from "react";
import { getUser } from "../../../services/userService";
import Sidebar from "../../../components/sidebar";
import {
  BriefcaseIcon,
  UsersIcon,
  CalendarClockIcon,
  SparklesIcon,
} from "lucide-react";
import RecruiterJobList from "../../../components/RecruiterJobList";
// import JobPostChart from "../../components/JobPostChart";
// import ApplicantTrendsChart from "../../components/ApplicantTrendsChart";
// import MatchInsightsChart from "../../components/MatchInsightsChart";

export default function RecruiterDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      if (res) setUser(res);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div
        className="min-h-screen flex justify-center items-center text-white"
        style={{
          background:
            "linear-gradient(352deg, rgba(30, 30, 30, 1) 3%, rgba(0, 0, 0, 1) 53%)",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <main
        className="ml-64 flex-1 px-6 py-10 text-white"
        style={{
          background:
            "linear-gradient(352deg, rgba(30, 30, 30, 1) 3%, rgba(0, 0, 0, 1) 53%)",
        }}
      >
        <h1 className="text-4xl font-bold mb-8">Welcome, {user.name}</h1>

        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-4 mb-2">
              <BriefcaseIcon className="text-indigo-400 w-6 h-6" />
              <h2 className="text-lg font-semibold">Job Posts</h2>
            </div>
            <p className="text-3xl font-bold">{user.jobPosts || 0}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-4 mb-2">
              <UsersIcon className="text-green-400 w-6 h-6" />
              <h2 className="text-lg font-semibold">Applicants</h2>
            </div>
            <p className="text-3xl font-bold">{user.totalApplicants || 0}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-4 mb-2">
              <CalendarClockIcon className="text-yellow-400 w-6 h-6" />
              <h2 className="text-lg font-semibold">Upcoming Interviews</h2>
            </div>
            <p className="text-gray-400 text-sm">No interviews scheduled</p>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <SparklesIcon className="text-purple-400 w-5 h-5" />
            AI Match Suggestions
          </h2>
          <p className="text-gray-400 mb-4">
            Based on recent applications, we recommend 3 strong candidates for
            your open roles.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-xl transition">
            View Suggestions
          </button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* <JobPostChart />
          <ApplicantTrendsChart />
          <MatchInsightsChart /> */}
        </div>
        <RecruiterJobList role={"recruiter"} />
      </main>
    </div>
  );
}
