"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const features = [
  {
    title: "Smart Job Posting",
    description:
      "Create optimized job listings that automatically generate unique application URLs.",
    icon: "📄",
    color: "bg-blue-500",
  },
  {
    title: "Unique Application Links",
    description:
      "Share custom application URLs for each position to streamline the candidate experience.",
    icon: "🔗",
    color: "bg-indigo-500",
  },
  {
    title: "Resume Analysis",
    description:
      "Our AI analyzes resumes to identify the most qualified candidates based on skills and experience.",
    icon: "📤",
    color: "bg-purple-500",
  },
  {
    title: "AI-Powered Interviews",
    description:
      "Automated interview process that adapts questions based on candidate responses and resume.",
    icon: "💬",
    color: "bg-pink-500",
  },
  {
    title: "Comprehensive Feedback",
    description:
      "Provide detailed feedback to both recruiters and candidates after the interview process.",
    icon: "✅",
    color: "bg-green-500",
  },
  {
    title: "Data-Driven Insights",
    description:
      "Get actionable insights and analytics to improve your hiring process over time.",
    icon: "📊",
    color: "bg-orange-500",
  },
];

export default function Grid() {
    
      useEffect(() => {
        AOS.init({
          duration: 800, // animation duration in ms
          once: false, // whether animation should happen only once
        });
      }, []);
  return (

 <section className="bg-[#111] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-4 inline-block px-4 py-1 text-sm rounded-full bg-[#1e1b4b] text-blue-300 font-semibold">
          🚀 AI-Powered Features
        </div>
        <h2 className="text-4xl font-bold mb-4">
          Intelligent Recruitment Platform
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Our platform leverages cutting-edge AI to transform every step of the
          recruitment process, from job posting to final selection.
        </p>

        <div data-aos="fade-up"
     data-aos-duration="1000">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2e2e2e] shadow-lg transition duration-300 ease-in-out transform hover:rotate-1 hover:scale-105 hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-md text-white text-xl mb-4 ${feature.color}`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>


   
  );
}
