"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-white/[0.06] backdrop-blur-md sticky top-0 z-50 bg-[#0d0f12]/70">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/20">
            TF
          </div>
          <span className="font-bold tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            TalentForge
          </span>
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
          <Link href="/jobs" className="hover:text-white transition-colors">
            Explore Jobs
          </Link>
          <Link href="/login" className="hover:text-white transition-colors">
            Console Portal
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/10 text-xs"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
