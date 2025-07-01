"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "", interviews: 3 },
  { name: "Feb", interviews: 5 },
  { name: "Mar", interviews: 2 },
  { name: "Apr", interviews: 7 },
  { name: "May", interviews: 4 },
];
export default function InterviewChart() {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">
        This Month Interviews
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="interviews" fill="#60A5FA" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
