"use client";

import React, { useState } from "react";
import { Search, MapPin, Sparkles, GraduationCap, Briefcase, Laptop, Building2 } from "lucide-react";
import { PUNE_LOCALITIES } from "@/lib/scoring";

interface HeroSearchProps {
  keyword: string;
  location: string;
  onSearch: (kw: string, loc: string) => void;
  onQuickFilter: (type: string, value: string) => void;
}

export default function HeroSearch({
  keyword,
  location,
  onSearch,
  onQuickFilter,
}: HeroSearchProps) {
  const [kw, setKw] = useState(keyword);
  const [loc, setLoc] = useState(location || "Pune");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(kw, loc);
  };

  const quickPills = [
    { label: "🎓 Fresher (0-1 yrs)", type: "experience", value: "Fresher" },
    { label: "💼 Full-Time", type: "employmentType", value: "Full-time" },
    { label: "🧑‍💻 Internships", type: "employmentType", value: "Internship" },
    { label: "🏠 Remote", type: "workMode", value: "Remote" },
    { label: "📍 Baner", type: "locality", value: "Baner" },
    { label: "📍 Hinjawadi", type: "locality", value: "Hinjawadi" },
    { label: "📍 Kharadi", type: "locality", value: "Kharadi" },
    { label: "📍 Viman Nagar", type: "locality", value: "Viman Nagar" },
    { label: "📍 Wakad", type: "locality", value: "Wakad" },
  ];

  return (
    <section className="relative bg-slate-950 text-white pt-6 pb-6 sm:pt-10 sm:pb-8 px-3 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 -z-10 h-64 w-72 sm:w-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-64 w-72 sm:w-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-3 sm:space-y-4">
        {/* Mobile Fresher Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-3 py-1 text-[11px] sm:text-xs font-semibold text-blue-300">
          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-400 shrink-0" />
          <span>Pune's Dedicated Fresher & Entry-Level Job Board</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight px-1">
          Find SEO Jobs in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Pune</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-normal px-2">
          Freshers, internships, and junior SEO opportunities — verified from legitimate portals and Pune companies.
        </p>

        {/* Search Bar Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-700 shadow-xl max-w-4xl mx-auto text-left"
        >
          {/* Keyword Input */}
          <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5 sm:py-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={kw}
              onChange={(e) => setKw(e.target.value)}
              placeholder="Search SEO Executive, GSC, Baner..."
              className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Location Input with suggestions */}
          <div className="sm:w-64 flex items-center gap-2 px-3 py-2.5 sm:py-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 shrink-0" />
            <select
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
            >
              <option value="Pune" className="bg-slate-900 text-white">All Pune Localities</option>
              <option value="Pimpri-Chinchwad" className="bg-slate-900 text-white">Pimpri-Chinchwad</option>
              <option value="Baner" className="bg-slate-900 text-white">Baner</option>
              <option value="Hinjawadi" className="bg-slate-900 text-white">Hinjawadi</option>
              <option value="Kharadi" className="bg-slate-900 text-white">Kharadi</option>
              <option value="Viman Nagar" className="bg-slate-900 text-white">Viman Nagar</option>
              <option value="Kalyani Nagar" className="bg-slate-900 text-white">Kalyani Nagar</option>
              <option value="Wakad" className="bg-slate-900 text-white">Wakad</option>
              <option value="Shivajinagar" className="bg-slate-900 text-white">Shivajinagar</option>
              <option value="Magarpatta" className="bg-slate-900 text-white">Magarpatta</option>
              <option value="Remote" className="bg-slate-900 text-white">Remote (Pune Eligible)</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="h-4 w-4" />
            <span>SEARCH JOBS</span>
          </button>
        </form>

        {/* Horizontal Scrollable Quick Pills on Mobile */}
        <div className="pt-2 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar justify-start sm:justify-center px-1">
          <span className="text-[11px] text-slate-400 font-medium shrink-0 hidden sm:inline">Popular:</span>
          {quickPills.map((pill) => (
            <button
              key={pill.label}
              onClick={() => onQuickFilter(pill.type, pill.value)}
              className="text-[11px] bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-full border border-slate-800 hover:border-slate-700 transition-colors whitespace-nowrap shrink-0 active:scale-95"
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
