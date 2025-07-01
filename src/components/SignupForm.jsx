"use client";
import { useState } from "react";
export default function SignupForm({ role, onSubmit, error, success }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm text-gray-300 mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          value={formData.name}
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
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="relative">
        <label className="block text-sm text-gray-300 mb-1">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          value={formData.password}
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

      <div className="relative">
        <label className="block text-sm text-gray-300 mb-1">
          Re-enter Password
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
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
        <p className="text-sm text-green-500 text-center -mt-2">{success}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Sign Up as {role}
      </button>
    </form>
  );
}
