"use client";
import { useState } from "react";
import { postJob } from "../../../services/jobService";
import { toast } from "react-hot-toast";
export default function JobUploadForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    status: "open",
    jobType: "full-time",
    workMode: "remote",
    salary: "",
    timing: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const payload = {
        ...formData,
        createdAt: new Date().toISOString(),
      };
      const res = await postJob(payload);
      console.log(JSON.stringify(res) + "Response");
   

      toast.success("Job posted successfully!");
      setSuccess("Job posted successfully!");
      setFormData({
        title: "",
        category: "",
        description: "",
        status: "open",
        jobType: "full-time",
        workMode: "remote",
        salary: "",
        timing: "",
      });
    } catch (err) {
      console.error("Job upload failed", err);
      setSuccess("Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  const jobCategories = [
    "Software Engineering",
    "UI/UX Design",
    "Marketing",
    "Sales",
    "Customer Support",
    "Product Management",
    "Data Science",
    "DevOps",
  ];

  return (
    <div
      className="max-w-2xl mx-auto p-8 rounded-3xl shadow-lg mt-10 "
      style={{
        backgroundColor: "#000",
        color: "#fff",
        boxShadow: "0 8px 30px rgba(255, 255, 255, 0.1)",
      }}
    >
      <h2 className="text-3xl font-bold mb-8 tracking-tight">Post a New Job</h2>

      <form onSubmit={handleSubmit} className="space-y-7">
        <div>
          <label className="block text-sm font-semibold mb-2">Job Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter job title"
            className="w-full px-5 py-3 bg-black border border-gray-600 rounded-2xl text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-5 py-3  border border-gray-600 rounded-2xl text-white
              focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition bg-black"
          >
            <option value="" disabled className="text-black-500">
              Select Category
            </option>
            {jobCategories.map((cat) => (
              <option key={cat} value={cat} className="text-white ">
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            required
            placeholder="Write detailed job description"
            className="w-full px-5 py-4 bg-black border border-gray-600 rounded-2xl text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          <div>
            <label className="block text-sm font-semibold mb-2">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-black border border-gray-600 rounded-2xl text-white
                focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Work Mode
            </label>
            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-black border border-gray-600 rounded-2xl text-white
                focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            >
              <option value="remote">Remote</option>
              <option value="in-office">In Office</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Salary</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., Rs.60,000/ month"
              className="w-full px-5 py-3 bg-black border border-gray-600 rounded-2xl text-white placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Timing</label>
            <input
              type="text"
              name="timing"
              value={formData.timing}
              onChange={handleChange}
              placeholder="e.g., 9 AM - 5 PM"
              className="w-full px-5 py-3 bg-black border border-gray-600 rounded-2xl text-white placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-5 py-3 bg-black border border-gray-600 rounded-2xl text-white
              focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold tracking-wide
            bg-white text-black shadow-md transition-transform
            hover:scale-105 active:scale-95
            ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>

        {success && (
          <p className="text-green-400 mt-4 font-semibold text-center">
            {success}
          </p>
        )}
      </form>
    </div>
  );
}
