"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "candidate",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.issues?.map((i) => i.message).join(" | ") ||
          data.message ||
          "Login failed"
        );
      } else {
        router.push(data.redirect);
        location.reload();
      }
    } catch (err) {
      setError("Server error. Please try again later.");
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
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 bg-white/10 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-300"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center -mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
