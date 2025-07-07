"use client";

import { useEffect, useState } from "react";
import { FileUp, Loader2, Sparkles } from "lucide-react";
import { ResumeAnalysis, CheckSession } from "../services/interviewService"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const searchParams = useSearchParams();
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const jobId = searchParams.get("jobid");
  const jobCategory = searchParams.get("jobCat");
  const router = useRouter();
  console.log("Job ID:", jobId);
  console.log("Job Category:", jobCategory);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFeedback("");

  };

  useEffect(() => {
    const checkSessionStatus = async () => {
      try {
        console.log(jobId)
        const res = await CheckSession(jobId);
        console.log(res);
        router.push(res.redirect)
      } catch (error) {
        console.error("Failed to check session:", error);
      }
    };

    checkSessionStatus();
  }, [jobId,router]);


  const handleUpload = async () => {
    if (!file) {
      console.warn("⚠ No file selected to upload.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobid", jobId);
    formData.append("jobCategory", jobCategory);

    console.log(formData + "formData")
    try {
      console.log("Getting File ")
      const data = await ResumeAnalysis(formData)
      console.log(data)
      if (data?.feedback?.output) {
        setFeedback(data.feedback.output);
      } else {
        setFeedback("⚠ No feedback received from AI.");
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
      setFeedback("❌ Something went wrong while analyzing your resume.");
    } finally {
      setLoading(false);
    }
  };
  const getHeadingColor = (heading) => {
    const lower = heading.toLowerCase();
    if (lower.includes("summary")) return "text-yellow-400";
    if (lower.includes("education")) return "text-blue-400";
    if (lower.includes("skills")) return "text-green-400";
    if (lower.includes("experience")) return "text-red-400";
    if (lower.includes("projects")) return "text-purple-400";
    if (lower.includes("interests")) return "text-pink-400";
    return "text-white";
  };
  const formatFeedback = (text) => {
    return text
      .split(/\n\n+/)
      .map((paragraph, idx) => {
        const formatted = paragraph
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/```/g, "")
          .replace(/\*/g, "")
          .replace(/\n/g, "<br/>");

        const isHeading = /^\s*(<strong>.*?<\/strong>)\s*$/.test(formatted);
        const rawHeading = formatted.replace(/<\/?strong>/g, "");

        return (
          <div key={idx} className="space-y-2">
            <p
              className={`leading-relaxed ${isHeading ? `font-bold text-xl ${getHeadingColor(rawHeading)}` : "text-gray-300"
                }`}
              dangerouslySetInnerHTML={{ __html: formatted }}
            />
            <hr className="border-gray-700 my-2" />
          </div>
        );
      });
  };
  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl max-w-3xl mx-auto mt-10 space-y-6">
      <h2 className="text-3xl font-bold text-center">
        Resume Analyzer <Sparkles className="inline-block ml-2 text-yellow-400" />
      </h2>
      <div className="flex flex-col items-center justify-center gap-4">
        <input
          type="file"
          accept=".pdf"
          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-all"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <FileUp />}
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
      </div>
      {feedback && (
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 mt-6 max-h-[600px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">
            AI Feedback:
          </h3>
          {formatFeedback(feedback)}
        </div>
      )}
    </div>
  );
}
