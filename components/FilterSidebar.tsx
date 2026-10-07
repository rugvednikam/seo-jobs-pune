"use client";

import React from "react";
import { SlidersHorizontal, RotateCcw, Check, Sparkles, MapPin, DollarSign, Clock, Briefcase, Building } from "lucide-react";
import { SearchFilters } from "@/lib/types";
import { PUNE_LOCALITIES } from "@/lib/scoring";

interface FilterSidebarProps {
  filters: SearchFilters;
  onChange: (newFilters: SearchFilters) => void;
  onReset: () => void;
  localitiesCount?: { name: string; count: number }[];
  sourcesCount?: { name: string; count: number }[];
}

export default function FilterSidebar({
  filters,
  onChange,
  onReset,
  localitiesCount = [],
  sourcesCount = [],
}: FilterSidebarProps) {
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onChange({ ...filters, [key]: value, page: 1 });
  };

  const experienceOptions = [
    { label: "All Experience", value: "all" },
    { label: "Fresher (0-1 yrs)", value: "Fresher" },
    { label: "1–2 years", value: "1-2 years" },
    { label: "2–3 years", value: "2-3 years" },
    { label: "3+ years", value: "3+ years" },
  ];

  const workModeOptions = [
    { label: "All Work Modes", value: "all" },
    { label: "On-site", value: "On-site" },
    { label: "Hybrid", value: "Hybrid" },
    { label: "Remote", value: "Remote" },
  ];

  const employmentTypeOptions = [
    { label: "All Types", value: "all" },
    { label: "Full-time", value: "Full-time" },
    { label: "Internship / Trainee", value: "Internship" },
  ];

  const salaryOptions = [
    { label: "Any Salary", value: 0 },
    { label: "₹10,000+/mo", value: 10000 },
    { label: "₹15,000+/mo", value: 15000 },
    { label: "₹20,000+/mo", value: 20000 },
    { label: "₹30,000+/mo", value: 30000 },
  ];

  const postedWithinOptions = [
    { label: "Anytime", value: undefined },
    { label: "Today (24h)", value: 1 },
    { label: "Last 3 days", value: 3 },
    { label: "Last 7 days", value: 7 },
    { label: "Last 30 days", value: 30 },
  ];

  const sourcesList = ["Naukri", "LinkedIn", "Internshala", "Indeed", "Foundit", "Company Careers"];

  return (
    <aside className="w-full bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-6 text-sm text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <SlidersHorizontal className="h-4 w-4 text-blue-600" />
          <span>Filter Jobs</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 font-medium cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Fresher Only Prominent Toggle */}
      <div className="bg-emerald-50/80 border border-emerald-200 p-3.5 rounded-xl space-y-2">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span className="font-bold text-xs text-emerald-950">Fresher Friendly Only</span>
          </div>
          <input
            type="checkbox"
            checked={!!filters.fresherOnly}
            onChange={(e) => updateFilter("fresherOnly", e.target.checked)}
            className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
          />
        </label>
        <p className="text-[11px] text-emerald-800 leading-tight">
          Hides senior & 2+ yrs roles. Displays roles accepting 0-1 yr or fresh graduates.
        </p>
      </div>

      {/* 2. Experience Level */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-900 block">Experience Level</span>
        <div className="space-y-1">
          {experienceOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer p-1 rounded hover:bg-slate-50"
            >
              <input
                type="radio"
                name="experience"
                value={opt.value}
                checked={(filters.experience || "all") === opt.value}
                onChange={() => updateFilter("experience", opt.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Pune Localities Dropdown */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-900 block flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-blue-600" />
          <span>Pune Locality</span>
        </span>
        <select
          value={filters.locality || "all"}
          onChange={(e) => updateFilter("locality", e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="all">All Localities</option>
          {PUNE_LOCALITIES.slice(0, 15).map((loc) => {
            const count = localitiesCount.find((l) => l.name.toLowerCase() === loc.toLowerCase())?.count;
            return (
              <option key={loc} value={loc}>
                {loc} {count ? `(${count})` : ""}
              </option>
            );
          })}
        </select>
      </div>

      {/* 4. Work Mode */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-900 block">Work Mode</span>
        <div className="grid grid-cols-2 gap-1.5">
          {workModeOptions.map((opt) => {
            const active = (filters.workMode || "all") === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateFilter("workMode", opt.value)}
                className={`text-xs py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                  active
                    ? "bg-blue-50 border-blue-500 text-blue-700 font-bold"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Minimum Salary */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-900 block flex items-center gap-1">
          <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
          <span>Minimum Monthly Salary</span>
        </span>
        <div className="space-y-1">
          {salaryOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer p-1 rounded hover:bg-slate-50"
            >
              <input
                type="radio"
                name="salary"
                value={opt.value}
                checked={(filters.salaryMin || 0) === opt.value}
                onChange={() => updateFilter("salaryMin", opt.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 6. Employment Type */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-900 block">Job Type</span>
        <div className="space-y-1">
          {employmentTypeOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer p-1 rounded hover:bg-slate-50"
            >
              <input
                type="radio"
                name="employmentType"
                value={opt.value}
                checked={(filters.employmentType || "all") === opt.value}
                onChange={() => updateFilter("employmentType", opt.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 7. Date Posted */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-900 block flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-slate-500" />
          <span>Date Posted</span>
        </span>
        <select
          value={filters.postedWithinDays || ""}
          onChange={(e) =>
            updateFilter(
              "postedWithinDays",
              e.target.value ? parseInt(e.target.value, 10) : undefined
            )
          }
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          {postedWithinOptions.map((opt, i) => (
            <option key={i} value={opt.value || ""}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 8. Source Filter */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-900 block flex items-center gap-1">
          <Building className="h-3.5 w-3.5 text-slate-500" />
          <span>Job Source</span>
        </span>
        <select
          value={filters.source || "all"}
          onChange={(e) => updateFilter("source", e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="all">All Job Portals & Feeds</option>
          {sourcesList.map((src) => {
            const count = sourcesCount.find((s) => s.name.toLowerCase() === src.toLowerCase())?.count;
            return (
              <option key={src} value={src}>
                {src} {count ? `(${count})` : ""}
              </option>
            );
          })}
        </select>
      </div>
    </aside>
  );
}
