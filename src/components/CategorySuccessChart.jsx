"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const dummyData = [
  { category: "Technical", score: 82 },
  { category: "HR", score: 74 },
  { category: "Behavioral", score: 68 },
  { category: "System Design", score: 89 },
  { category: "Culture Fit", score: 61 },
];

const COLORS = ["#3b82f6", "#10b981", "#facc15", "#f472b6", "#8b5cf6"];

export default function CategorySuccessPieChart() {
  return (
    <div className="bg-[#1f1f1f] border border-gray-800 rounded-2xl p-6 shadow text-white">
      <h2 className="text-lg font-semibold text-gray-300 mb-4">
        Success Rate in Each Category 
      </h2>
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={dummyData}
              dataKey="score"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {dummyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
