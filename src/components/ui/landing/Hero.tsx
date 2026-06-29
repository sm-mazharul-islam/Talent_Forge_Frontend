"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-4xl mx-auto text-center px-6 pt-24 pb-16 relative z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-full text-xs text-slate-400 mb-6 backdrop-blur-md">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        Powered by Prisma v7 & Next.js Core Architecture
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
        The Next-Generation Asset & Recruitment Engine
      </h1>

      <p className="text-base sm:text-lg text-slate-400 mt-6 max-w-2xl mx-auto leading-relaxed">
        A high-performance platform orchestrating real-time database integrity
        layers, structural Zod validation guards, and a centralized operational
        runtime pipeline.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/jobs"
          className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-sm font-semibold rounded-xl transition-all duration-300 shadow-xl shadow-blue-600/10 flex items-center justify-center gap-2 group"
        >
          Browse Marketplace Feed
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
        <Link
          href="/login"
          className="w-full sm:w-auto px-6 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-sm font-semibold rounded-xl transition-all text-center"
        >
          Recruiter Access Portal
        </Link>
      </div>
    </section>
  );
}
