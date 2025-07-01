"use client";

import { use, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { getUser } from "../services/userService";

import {
  FaPlay,
  FaSearch,
  FaRocket,
  FaUser,
  FaBriefcase,
} from "react-icons/fa";

const rotatingWords = [
  "Future of Hiring",
  "AI Interviews",
  "Smart Selection",
  "Automation",
];

export default function Header() {
  const [currentText, setCurrentText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [user, setUser] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      console.log("User ted" + user.name);

      if (user.name) {
        console.log("User get" + user);
        setUser(true);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  useEffect(() => {
    const currentWord = rotatingWords[wordIndex];
    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          setCurrentText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setCurrentText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }
        if (!isDeleting && charIndex === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
        if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }
      },
      isDeleting ? 50 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <div data-aos="fade-up">
      <section
        className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4"
        style={{
          background:
            "linear-gradient(352deg, rgba(79, 78, 78, 1) 3%, rgba(0, 0, 0, 1) 53%)",
        }}
      >
        {/* Top Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <FaRocket className="inline-block mr-2" /> Book a Demo
          </button>
          <button
            className="px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <FaPlay className="inline-block mr-2" /> View Demo
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Revolutionize Your Hiring with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {currentText}
            <span className="animate-blink">|</span>
          </span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-gray-300 mt-4">
          Our AI-driven platform transforms the recruitment process from job
          posting to candidate selection.
        </p>

        {/* Main Action Buttons */}
        <div className="flex flex-wrap justify-center space-x-4 mt-8">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <FaRocket className="mr-2" /> Get Started
          </button>
          <Link href="dashboard">
            <button
              className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition flex items-center"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <FaSearch className="mr-2" /> Find Jobs
            </button>
          </Link>
          <button
            className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition flex items-center"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <FaPlay className="mr-2" /> How It Works
          </button>
        </div>

        {!user && (
          <div className="flex flex-wrap justify-center space-x-4 mt-4">
            <Link href="/login/candidate">
              <button
                className="px-6 py-2 border border-gray-500 text-gray-300 rounded-lg bg-transparent hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition flex items-center"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <FaUser className="mr-2" /> Candidate Login
              </button>
            </Link>

            <Link href="/login/recruiter">
              <button
                className="px-6 py-2 border border-gray-500 text-gray-300 rounded-lg bg-transparent hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition duration-300 flex items-center"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <FaBriefcase className="mr-2" /> Recruiter Login
              </button>
            </Link>
          </div>
        )}

        {/* Footer */}
        <p
          className="text-2xl md:text-3xl font-semibold mt-12"
          data-aos="fade-up"
          data-aos-delay="900"
        >
          Intelligent Recruitment Platform
        </p>
      </section>
    </div>
  );
}
