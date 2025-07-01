"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function RoleSelection() {
  const router = useRouter();

  const handleSelect = (role) => {
    console.log(role);
    router.push(`/signup/${role}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-10"
      style={{
        background:
          "linear-gradient(352deg, rgba(30, 30, 30, 1) 3%, rgba(0, 0, 0, 1) 53%)",
      }}
    >
      <h1 className="text-3xl font-bold mb-8 capitalize">Signup As</h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl"
        style={{
          background:
            "linear-gradient(352deg, rgba(30, 30, 30, 1) 3%, rgba(0, 0, 0, 1) 53%)",
        }}
      >
        {["candidate", "recruiter"].map((role) => (
          <div
            key={role}
            onClick={() => handleSelect(role)}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-2xl shadow-lg cursor-pointer p-6 transition-all duration-200 transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold capitalize">{role}</h2>
            <p className="mt-2 text-gray-300 text-sm">
              {role === "candidate"
                ? "Apply for jobs and build your profile."
                : "Post jobs and find top talent."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
