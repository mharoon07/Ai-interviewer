"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm({ role, onSubmit, error }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
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
        Login as {role}
      </button>
    </form>
  );
}
