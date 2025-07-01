"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Works() {
  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);
  const steps = [
    {
      id: 1,
      side: "left",
      title: "Create Job",
      label: "Recruiter",
      description:
        "Recruiters create a job profile defining role, skills, and requirements.",
    },
    {
      id: 2,
      side: "right",
      title: "Apply for Job",
      label: "Candidate",
      description:
        "Candidates apply to listed jobs by submitting resumes and necessary details.",
    },
    {
      id: 3,
      side: "left",
      title: "Compare Resume and Candidate Application",
      label: "AI Engine",
      description:
        "Automatically match candidate resumes against job criteria and identify top fits.",
    },
    {
      id: 4,
      side: "right",
      title: "Generate Description According to Job Role",
      label: "AI Generator",
      description:
        "AI drafts compelling job descriptions tailored to attract qualified candidates.",
    },
    {
      id: 5,
      side: "left",
      title: "Generate Dynamic URLs",
      label: "System",
      description:
        "Every job and candidate interaction is linked via custom dynamic URLs.",
    },
    {
      id: 6,
      side: "right",
      title: "Score Resume",
      label: "AI Scoring",
      description:
        "AI evaluates resumes based on skill relevance, experience, and fit score.",
    },
    {
      id: 7,
      side: "left",
      title: "AI-Based Interview",
      label: "Virtual Interviewer",
      description:
        "Candidates go through AI-conducted interviews with smart question selection.",
    },
    {
      id: 8,
      side: "right",
      title: "Feedback",
      label: "System",
      description:
        "Automated feedback is provided to candidates and recruiters post-interview.",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#4f4e4e] to-black text-white text-white px-4 py-20">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <span className="text-sm bg-gray-800 px-4 py-1 rounded-full">
          ⚡ Streamlined Process
        </span>
        <h2 className="text-4xl font-bold mt-4" data-aos="fade-down">
          How This AI Works
        </h2>
        <p className="mt-2 text-gray-400 max-w-xl mx-auto" data-aos="fade-up">
          Our AI-powered platform streamlines the entire recruitment journey
          from job posting to final selection.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="absolute top-0 left-1/2 w-1 h-full bg-blue-700 transform -translate-x-1/2" />

        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`mb-16 flex flex-col md:flex-row items-start ${
              step.side === "left" ? "md:justify-start" : "md:justify-end"
            }`}
            data-aos={step.side === "left" ? "fade-right" : "fade-left"}
            data-aos-delay={index * 50}
          >
            <div
              className={`relative md:w-1/2 ${
                step.side === "left" ? "pr-8" : "pl-8"
              }`}
            >
              <div
                className={`absolute top-0 ${
                  step.side === "left" ? "right-[-15px]" : "left-[-15px]"
                } bg-blue-700 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full z-10 shadow-lg`}
              >
                {step.id}
              </div>
              <div className="bg-[#1f1f1f] border border-[#2e2e2e] p-6 rounded-lg shadow-lg">
                <div className="text-xs bg-blue-800 text-white px-2 py-1 inline-block rounded mb-2">
                  {step.label}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
