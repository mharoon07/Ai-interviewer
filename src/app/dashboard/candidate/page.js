"use client";
import { useEffect, useState } from "react";
import { getUser } from "../../../services/userService";
import Sidebar from "../../../components/sidebar";
import { RocketIcon, CalendarDaysIcon } from "lucide-react";
import InterviewChart from "../../../components/InterviewChart";
import MonthlyInterviewStats from "../../../components/MonthlyInterviewStats";
import CategorySuccessChart from "../../../components/CategorySuccessChart";
import RecruiterJobList from "../../../components/RecruiterJobList";
import AppliedJobsList from "../../../components/AppliedJobsList";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshAppliedJobs, setRefreshAppliedJobs] = useState(false);

  const handleJobApplied = () => {
    console.log(refreshAppliedJobs + " refreshAppliedJobs before");
    setRefreshAppliedJobs((prev) => !prev);
  };

  useEffect(() => {
    console.log(refreshAppliedJobs + " refreshAppliedJobs (after state update)");
  }, [refreshAppliedJobs]);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">Email</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-4 mb-2">
              <RocketIcon className="text-purple-400 w-6 h-6" />
              <h2 className="text-lg font-semibold">Interviews Taken</h2>
            </div>
            <p className="text-3xl font-bold">{user.interviewsTaken || 0}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-4 mb-2">
              <CalendarDaysIcon className="text-green-400 w-6 h-6" />
              <h2 className="text-lg font-semibold">Next Scheduled</h2>
            </div>
            <p className="text-gray-400 text-sm">No upcoming interviews</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Launch Interview</h2>
          <p className="text-gray-400 mb-4">
            Ready to simulate an AI-powered mock interview?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition">
            Launch
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <InterviewChart />
          <AppliedJobsList key={refreshAppliedJobs.toString()} />
          <CategorySuccessChart />
          <RecruiterJobList role="candidate" onJobApplied={handleJobApplied} />
        </div>
      </main>
    </div>
  );
}
