"use client";

import React, { useEffect, useState } from "react";
import API from "@/src/services/api";
import { PropertyListing, PropertiesResponse } from "@/src/types/property";
import { Briefcase, MapPin, DollarSign, Search, Calendar } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function PublicJobBoardPage() {
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await API.get("/properties");

        // 🔍 Log the response so you can see exactly what your backend returns in the browser console
        console.log("Backend response payload:", response.data);

        // 🛡️ Defensive Check: Map the array regardless of whether it's response.data.data or directly response.data
        if (response.data && Array.isArray(response.data.data)) {
          setListings(response.data.data);
        } else if (Array.isArray(response.data)) {
          setListings(response.data);
        } else {
          console.error(
            "API returned data that isn't an array:",
            response.data,
          );
          setListings([]); // Safe fallback
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              "Failed to load active job postings.",
          );
        } else {
          setError("An unhandled network error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // 🛡️ Ensure filteredListings doesn't crash even if listings is temporarily invalid
  const filteredListings = Array.isArray(listings)
    ? listings.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];
  return (
    <div className="min-h-screen bg-[#0d0f12] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background Orbits */}
      <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Opportunity Marketplace
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Discover modern engineering listings backed by real-time
              validation layers.
            </p>
          </div>
          <Link
            href="/login"
            className="self-start md:self-auto px-5 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-sm font-medium rounded-xl transition-all duration-200"
          >
            Dashboard Portal &rarr;
          </Link>
        </div>

        {/* Search Search Box Input Group */}
        <div className="relative max-w-md mb-10">
          <Search
            className="absolute left-4 top-3.5 text-slate-500"
            size={18}
          />
          <input
            type="text"
            className="w-full bg-[#14181f]/60 backdrop-blur-xl border border-white/[0.06] focus:border-blue-500/50 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200"
            placeholder="Search by title, stack, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Error State Handler */}
        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm text-center mb-8">
            {error}
          </div>
        )}

        {/* Loading Skeleton Elements */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-48 bg-[#14181f]/40 border border-white/[0.04] rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-20 bg-[#14181f]/20 border border-white/[0.04] rounded-2xl">
            <Briefcase className="mx-auto text-slate-600 mb-4" size={40} />
            <p className="text-slate-400 font-medium">
              No matching listings found
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Try modifying your search constraints.
            </p>
          </div>
        ) : (
          /* Actual Interactive Component Loop Grid Mapping */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredListings.map((job) => (
              <div
                key={job.id}
                className="group bg-[#14181f]/40 border border-white/[0.06] hover:border-blue-500/30 backdrop-blur-xl p-6 rounded-2xl transition-all duration-300 shadow-xl flex flex-col justify-between hover:translate-y-[-2px]"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors duration-200 line-clamp-1">
                      {job.title}
                    </h3>
                    <span className="flex items-center gap-1 text-[11px] font-mono font-medium text-slate-500 whitespace-nowrap">
                      <Calendar size={12} />
                      {new Date(job.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 line-clamp-2 mb-6 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] text-xs font-medium text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-slate-500" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/5 px-2 py-1 rounded-md border border-emerald-500/10">
                      <DollarSign size={13} />
                      {job.price.toLocaleString()}/mo
                    </span>
                  </div>

                  <Link
                    href={`/login?redirect=apply&id=${job.id}`}
                    className="text-blue-400 group-hover:text-blue-300 font-semibold flex items-center gap-1"
                  >
                    Apply Now &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
