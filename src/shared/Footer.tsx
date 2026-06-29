"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.04] py-8 text-center text-xs text-slate-600 relative z-10 bg-[#0d0f12]">
      &copy; {new Date().getFullYear()} TalentForge Platform Engine. All system
      parameters operational.
    </footer>
  );
}
