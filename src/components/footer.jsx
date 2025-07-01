"use client";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="text-gray-300 py-10"
      style={{
        background:
          "linear-gradient(352deg, rgba(30, 30, 30, 1) 3%, rgba(0, 0, 0, 1) 53%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo and Tagline */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center">
            <span className="mr-2">⚡</span> AI 
          </h2>
          <p className="mt-2 text-sm text-gray-400 max-w-xl mx-auto">
            AI-powered recruitment platform that transforms hiring through
            intelligent matching, automated interviews, and data-driven
            insights.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm mb-10 text-gray-300">
          {/* Platform Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/features"
                  className="hover:text-blue-400 transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-blue-400 transition"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/learn-more"
                  className="hover:text-blue-400 transition"
                >
                  Learn More
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="hover:text-blue-400 transition"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* For Recruiters Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Recruiters</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/recruiter-login"
                  className="hover:text-blue-400 transition"
                >
                  Recruiter Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register-recruiter"
                  className="hover:text-blue-400 transition"
                >
                  Register as Recruiter
                </Link>
              </li>
            </ul>
          </div>

          {/* For Candidates Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Candidates</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/find-jobs"
                  className="hover:text-blue-400 transition"
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/candidate-login"
                  className="hover:text-blue-400 transition"
                >
                  Candidate Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register-candidate"
                  className="hover:text-blue-400 transition"
                >
                  Register as Candidate
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Socials */}
        <div className="border-t border-white/10 pt-6 flex flex-col items-center">
          <div className="flex space-x-6 mb-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-2xl hover:text-blue-400 transition-transform hover:scale-110" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-2xl hover:text-blue-400 transition-transform hover:scale-110" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl hover:text-blue-400 transition-transform hover:scale-110" />
            </a>
          </div>
          <p className="text-xs text-gray-500">
            © 2025 <span className="text-white font-medium">AI</span>.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
