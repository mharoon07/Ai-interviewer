"use client";
import { useEffect, useState } from "react";

export default function MonthlyInterviewStats() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulate fetching interviews from backend
    const simulateInterviews = () => {
      const simulatedCount = Math.floor(Math.random() * 10) + 5; // between 5 and 15
      setTimeout(() => {
        setCount(simulatedCount);
      }, 800);
    };

    simulateInterviews();
  }, []);

  return (
    <div className="bg-[#1f1f1f] border border-gray-800 rounded-2xl p-6 shadow text-white text-center">
      <h2 className="text-lg font-semibold text-gray-300">
        Interviews This Month
      </h2>
      <p className="text-5xl font-bold mt-3 text-blue-400 animate-pulse">
        {count}
      </p>
    </div>
  );
}
