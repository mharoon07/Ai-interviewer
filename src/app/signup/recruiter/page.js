"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "recruiter",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmpassword: formData.confirmPassword,
          role: "candidate",
        }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        const errorMessages =
          data.issues?.map((issue) => issue.message).join(" | ") ||
          data.message ||
          "Something went wrong";
        setError(errorMessages);
      } else {
        setSuccess("Account created successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        // const res = await fetch("/api/otp", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     email: formData.email
        //   }),
        // });

        // const data = await res.json();
        // console.log(data);
        router.push(data.redirect);
      }
    } catch (err) {
      setError("Server error. Please try again later.",err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(352deg, rgba(30, 30, 30, 1) 3%, rgba(0, 0, 0, 1) 53%)",
      }}
    >
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-md w-full shadow-lg">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Create Your Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 bg-white/10 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 cursor-pointer select-none"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label className="block text-sm text-gray-300 mb-1">
              Re-enter Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 bg-white/10 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-400 cursor-pointer select-none"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center -mt-2">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-500 text-center -mt-2">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
