"use client";

import React from "react";
import { Database, ShieldCheck, Layers, Cpu } from "lucide-react";

export default function BentoGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Relational DB */}
        <div className="md:col-span-2 bg-[#14181f]/40 border border-white/[0.06] backdrop-blur-xl p-8 rounded-2xl flex flex-col justify-between group hover:border-white/[0.1] transition-colors duration-300">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
              <Database size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Relational Database Integration
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Fully mapped transactional schema configurations connecting
              individual user profiles with asset models and cascading
              dependency channels seamlessly.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center gap-6 text-[11px] font-mono text-slate-500">
            <span>⚡ SUPABASE POSTGRES</span>
            <span>⚡ ON-DELETE CASCADE</span>
          </div>
        </div>

        {/* Card 2: Zod Guards */}
        <div className="bg-[#14181f]/40 border border-white/[0.06] backdrop-blur-xl p-8 rounded-2xl flex flex-col justify-between group hover:border-white/[0.1] transition-colors duration-300">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Strict Runtime Guards</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Interceptors running execution assessments directly on payloads
              before they reach the core database engine layer.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/[0.04] text-[11px] font-mono text-slate-500">
            Schema Type Compliance Locked
          </div>
        </div>

        {/* Card 3: Centralized Architecture */}
        <div className="bg-[#14181f]/40 border border-white/[0.06] backdrop-blur-xl p-8 rounded-2xl flex flex-col justify-between group hover:border-white/[0.1] transition-colors duration-300">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
              <Layers size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Unified Pipelines</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              A single global handler captures synchronous exceptions, returning
              clean structural outputs back to clients.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/[0.04] text-[11px] font-mono text-slate-500">
            Zero Uncaught Server Loops
          </div>
        </div>

        {/* Card 4: Synchronized Engine */}
        <div className="md:col-span-2 bg-[#14181f]/40 border border-white/[0.06] backdrop-blur-xl p-8 rounded-2xl flex flex-col justify-between group hover:border-white/[0.1] transition-colors duration-300">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
              <Cpu size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Synchronized State Engine
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Axios interceptor middleware maps encrypted bearer tokens out of
              storage automatically to unlock high-speed contextual
              authorization.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center gap-4 text-[11px] font-mono text-slate-500">
            <span>JWT AUTHORIZATION</span>
            <span>LOCALSTORAGE TOKENS HYDRATED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
