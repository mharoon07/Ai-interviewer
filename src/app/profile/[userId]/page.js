"use client";
import { useEffect, useState } from "react";
import { Image } from "next/image";
import { getUser } from "../../../services/userService";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      if (res) {
        setUser(res);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <p className="text-xl animate-pulse text-blue-400">
          Loading your profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <p className="text-xl text-red-400">
          Unable to load profile. Please log in.
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-10 text-white"
      style={{
        background: "linear-gradient(352deg, #1e1e1e 3%, #000000 53%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-5xl font-extrabold mb-12 text-blue-400 tracking-wider">
          Profile 
        </h1>

        <div className="bg-[#111827] border border-gray-700 rounded-3xl shadow-xl p-10 md:p-12 space-y-10">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Image
              src={user.imgurl || "/default-avatar.png"}
              alt={user.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold">{user.name}</h2>
              <p className="text-gray-400 mt-1">{user.email}</p>
              <p className="mt-2 text-sm text-blue-300 italic">
                @{user.username}
              </p>
            </div>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatCard label="Joined On" value={new Date(user.createdAt).toLocaleDateString()} />
            <StatCard label="Items Interviews" value={user.itemsTraded || 0} />
            <StatCard label="Trust Score" value={`${user.trustScore || "N/A"}%`} color="text-green-400" />
            <StatCard label="User ID" value={user._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color = "text-white" }) {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:scale-[1.03] transition-all border border-gray-800">
      <p className="text-gray-400 mb-1">{label}</p>
      <p className={`text-lg font-semibold ${color}`}>{value}</p>
    </div>
  );
}
