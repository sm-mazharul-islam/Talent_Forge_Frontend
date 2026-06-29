"use client";

import React, { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import API from "@/src/services/api";
import Link from "next/link";
import axios from "axios"; // 🔗 Import axios for type-guarding catch blocks

export default function RegisterPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Fire registration request to your backend
      await API.post("/auth/register", formData);

      // 2. Automatically login user right after successful account configuration
      const loginResponse = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = loginResponse.data;
      login(token, user);
    } catch (err: unknown) {
      // 🛡️ Explicit type assertion guard avoiding 'any' violations
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Registration failed. Account might already exist.",
        );
      } else {
        setError("An unexpected runtime error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0f12] text-white p-4 relative overflow-hidden">
      {/* Premium Glowing Ambient Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Glassmorphism Card Frame Container */}
      <div className="w-full max-w-md bg-[#14181f]/60 backdrop-blur-xl border border-white/[0.06] p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Get Started
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Create your account profile system instance
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full bg-[#0d1015]/80 border border-white/[0.08] focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full bg-[#0d1015]/80 border border-white/[0.08] focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full bg-[#0d1015]/80 border border-white/[0.08] focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
              placeholder="•••••••• (Min 6 characters)"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-sm font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/10 transform active:scale-[0.99] mt-2"
          >
            {loading ? "Registering account entries..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-400">
          Already registered?{" "}
          <Link
            href="/login"
            className="text-indigo-400 hover:underline font-medium"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
