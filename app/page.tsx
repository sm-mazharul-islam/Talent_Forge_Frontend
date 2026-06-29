"use client";

import BentoGrid from "@/src/components/ui/landing/BentoGrid";
import Hero from "@/src/components/ui/landing/Hero";
import Navbar from "@/src/components/ui/landing/Navbar";
import Footer from "@/src/shared/Footer";
import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-white relative overflow-hidden font-sans">
      {/* 🌌 Premium Glowing Ambient Background Accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* 🧩 Section Modules Assembly */}
      <Navbar />
      <Hero />
      <BentoGrid />
      <Footer />
    </div>
  );
}
