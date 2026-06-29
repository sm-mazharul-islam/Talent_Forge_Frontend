"use client";

import React, { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import {
  LogOut,
  LayoutDashboard,
  Briefcase,
  UserCheck,
  Menu,
  X,
  Layers,
  Activity,
} from "lucide-react";

// Simple descriptive view union type for clarity
type DashboardView = "overview" | "listings" | "submissions";

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<DashboardView>("overview");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0f12] flex items-center justify-center text-slate-400 text-sm font-medium">
        Loading secure workspace context...
      </div>
    );
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Helper function to render views dynamically based on sidebar context state
  const renderContentView = () => {
    switch (activeView) {
      case "listings":
        return (
          <div className="bg-[#14181f]/40 border border-white/[0.06] backdrop-blur-xl p-6 rounded-2xl min-h-[300px]">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="text-blue-400" size={20} />
              <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
                Job Listings Manager
              </h3>
            </div>
            <p className="text-slate-500 text-sm mb-6">
              Create, edit, and audit active positions published to your
              Supabase instance.
            </p>
            <div className="border border-dashed border-white/[0.08] rounded-xl p-8 text-center text-xs text-slate-600">
              No custom recruitment pipelines initialized yet. Connect your POST
              /properties routes to populate this node.
            </div>
          </div>
        );
      case "submissions":
        return (
          <div className="bg-[#14181f]/40 border border-white/[0.06] backdrop-blur-xl p-6 rounded-2xl min-h-[300px]">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="text-indigo-400" size={20} />
              <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
                Application Submissions Pipeline
              </h3>
            </div>
            <p className="text-slate-500 text-sm mb-6">
              Review application payloads submitted by candidates tracking
              active listings.
            </p>
            <div className="border border-dashed border-white/[0.08] rounded-xl p-8 text-center text-xs text-slate-600">
              No candidate profiles have submitted records to your database
              infrastructure cluster yet.
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Box 1: Expanded Track */}
            <div className="lg:col-span-2 bg-[#14181f]/40 border border-white/[0.06] backdrop-blur-xl p-6 rounded-2xl min-h-[200px] sm:min-h-[240px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={16} className="text-emerald-400" />
                  <h3 className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                    Operational Stream
                  </h3>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Authentication stream verified successfully. Select an
                  administrative workflow option from the sidebar directory
                  matrix to inspect individual database data arrays.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-slate-600">
                STATUS: DISPATCHER_IDLE
              </div>
            </div>

            {/* Box 2: System Specs Anchor */}
            <div className="bg-[#14181f]/40 border border-white/[0.06] backdrop-blur-xl p-6 rounded-2xl min-h-[200px] sm:min-h-[240px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Layers size={16} className="text-blue-400" />
                  <h3 className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                    System Profile Status
                  </h3>
                </div>
                <div className="space-y-3 text-xs text-slate-400">
                  <p>
                    Database:{" "}
                    <span className="text-emerald-400 font-mono block sm:inline mt-0.5 sm:mt-0">
                      Supabase Online
                    </span>
                  </p>
                  <div>
                    <span className="text-slate-400">Identity ID:</span>
                    <span className="text-blue-400 font-mono text-[10px] block truncate mt-1 bg-white/[0.02] border border-white/[0.04] p-2 rounded-lg">
                      {user?.id || "no-active-session-id"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white flex flex-col md:flex-row relative">
      {/* 📱 Mobile Sticky Top Navigation Bar */}
      <header className="md:hidden w-full bg-[#14181f]/90 border-b border-white/[0.06] backdrop-blur-xl px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-[10px]">
            TF
          </div>
          <span className="font-bold tracking-wider text-sm bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            TalentForge
          </span>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-slate-400 hover:text-white rounded-lg bg-white/[0.02] border border-white/[0.04]"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* 🛡️ Adaptive Navigation Sidebar Container (Responsive Backdrop Shell) */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#14181f] md:bg-[#14181f]/80 border-r border-white/[0.06] backdrop-blur-xl p-6 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        md:relative md:transform-none md:flex
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div>
          {/* Header Area */}
          <div className="hidden md:block mb-8 px-2">
            <h2 className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              TalentForge
            </h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
              Core Engine v1.0
            </p>
          </div>

          {/* Close button for cleaner mobile overlay interaction */}
          <div className="md:hidden flex justify-end mb-6">
            <button
              onClick={toggleMobileMenu}
              className="text-slate-500 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => {
                setActiveView("overview");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeView === "overview" ? "bg-white/[0.04] text-white" : "text-slate-400 hover:text-white hover:bg-white/[0.02]"}`}
            >
              <LayoutDashboard
                size={18}
                className={activeView === "overview" ? "text-blue-400" : ""}
              />
              Overview Console
            </button>
            <button
              onClick={() => {
                setActiveView("listings");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeView === "listings" ? "bg-white/[0.04] text-white" : "text-slate-400 hover:text-white hover:bg-white/[0.02]"}`}
            >
              <Briefcase
                size={18}
                className={activeView === "listings" ? "text-blue-400" : ""}
              />
              Manage Listings
            </button>
            <button
              onClick={() => {
                setActiveView("submissions");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeView === "submissions" ? "bg-white/[0.04] text-white" : "text-slate-400 hover:text-white hover:bg-white/[0.02]"}`}
            >
              <UserCheck
                size={18}
                className={activeView === "submissions" ? "text-blue-400" : ""}
              />
              Track Submissions
            </button>
          </nav>
        </div>

        {/* User Identity Profile Summary Anchor */}
        <div className="pt-4 border-t border-white/[0.06]">
          <div className="flex items-center justify-between px-2 mb-4">
            <div className="truncate pr-2">
              <p className="text-sm font-semibold text-slate-200 truncate">
                {user?.name || "Authenticated User"}
              </p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-semibold py-2.5 rounded-xl transition-all duration-200"
          >
            <LogOut size={14} />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* 🌫️ Mobile Overlay Dark Shadow Mask */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* 🎛️ Primary Console Workspace Main Board */}
      <main className="flex-1 p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-600/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight capitalize">
              {activeView} Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {activeView === "overview" &&
                "Monitor active recruitment operations and application metrics pipelines."}
              {activeView === "listings" &&
                "Audit, format, and modify role parameters deployed inside your system instance."}
              {activeView === "submissions" &&
                "Cross-verify candidate resume pipelines and verification layers."}
            </p>
          </div>

          {/* Render layout component nodes conditionally based on selection state */}
          {renderContentView()}
        </div>
      </main>
    </div>
  );
}
