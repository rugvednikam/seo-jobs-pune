"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  DollarSign,
  Clock,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Flag,
} from "lucide-react";
import { Job } from "@/lib/types";
import { isJobSaved, saveLocalJob, removeLocalSavedJob } from "@/lib/clientState";

interface JobCardProps {
  job: Job;
  onSelect: (job: Job) => void;
  onReport?: (job: Job) => void;
}

export default function JobCard({ job, onSelect, onReport }: JobCardProps) {
  const [saved, setSaved] = useState(false);
  const [timeAgo, setTimeAgo] = useState("Recently");

  useEffect(() => {
    setSaved(isJobSaved(job.id));
    if (job.postedAt) {
      try {
        const diff = Date.now() - new Date(job.postedAt).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 1) setTimeAgo("Just now");
        else if (hours < 24) setTimeAgo(`${hours}h ago`);
        else {
          const days = Math.floor(hours / 24);
          setTimeAgo(days === 1 ? "Yesterday" : `${days}d ago`);
        }
      } catch {}
    }
  }, [job.id, job.postedAt]);

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeLocalSavedJob(job.id);
      setSaved(false);
    } else {
      saveLocalJob(job.id, "saved");
      setSaved(true);
    }
  };

  const formatSalary = () => {
    if (!job.salaryDisclosed || job.salaryMin <= 0) {
      return "Salary Not Disclosed";
    }
    const minK = job.salaryMin >= 1000 ? `₹${job.salaryMin.toLocaleString("en-IN")}` : `₹${job.salaryMin}`;
    const maxK = job.salaryMax ? `₹${job.salaryMax.toLocaleString("en-IN")}` : "";
    return `${minK}${maxK ? `–${maxK}` : ""}/${job.salaryPeriod === "year" ? "yr" : "mo"}`;
  };

  const getEligibilityBadge = () => {
    if (job.canIApplyStatus === "STRONG_MATCH") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Fresher Match (🟢 Strong)
        </span>
      );
    }
    if (job.canIApplyStatus === "POSSIBLE_MATCH") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Possible (🟡 0-2 yrs)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
        Experience Req (🔴)
      </span>
    );
  };

  return (
    <div
      onClick={() => onSelect(job)}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer relative flex flex-col justify-between active:scale-[0.99] touch-manipulation"
    >
      {/* Top Row: Logo, Title & Match Score */}
      <div>
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-base font-bold text-slate-700">
                  {job.company.charAt(0)}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                  {job.company}
                </span>
                {job.verified && (
                  <span title="Verified Pune Company" className="text-blue-600">
                    <CheckCircle2 className="h-3 w-3" />
                  </span>
                )}
                {job.companyRating && (
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                    ★ {job.companyRating}
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mt-0.5">
                {job.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
              <span>🔥</span>
              <span>{job.matchScore}%</span>
            </div>

            <button
              onClick={toggleSave}
              className={`p-1.5 sm:p-2 rounded-lg border transition-colors ${
                saved
                  ? "bg-blue-50 border-blue-300 text-blue-600"
                  : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600"
              }`}
              title={saved ? "Saved to tracker" : "Save job"}
              aria-label="Save Job"
            >
              <Bookmark className={`h-4 w-4 ${saved ? "fill-blue-600" : ""}`} />
            </button>
          </div>
        </div>

        {/* Meta Info Grid: Location, Work Mode, Exp, Salary */}
        <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate font-medium text-slate-700">📍 {job.location}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <GraduationCap className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="font-semibold text-emerald-800">{job.experienceLabel}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <Briefcase className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{job.employmentType} &bull; {job.workMode}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <DollarSign className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span className="font-bold text-slate-900 truncate">{formatSalary()}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {getEligibilityBadge()}

          {job.consolidatedSources && job.consolidatedSources.length > 1 && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
              <Layers className="h-3 w-3 text-slate-500" />
              Found on {job.consolidatedSources.length} sources
            </span>
          )}
        </div>

        {/* Skills List */}
        <div className="mt-2.5 flex flex-wrap items-center gap-1">
          {job.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[10px] text-slate-400 font-medium">
              +{job.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Source + Actions */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center justify-between sm:justify-start gap-2 text-slate-500 text-[11px]">
          <span className="flex items-center gap-1 font-medium text-slate-600">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            {job.source}
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timeAgo}
          </span>
          {onReport && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReport(job);
              }}
              title="Report outdated job"
              className="ml-auto sm:ml-0 p-1 text-slate-400 hover:text-slate-600"
            >
              <Flag className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Buttons on Mobile: full-width grid */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onSelect(job)}
            className="text-center py-2 sm:py-1.5 px-3 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            VIEW DETAILS
          </button>

          <a
            href={job.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1 py-2 sm:py-1.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            <span>APPLY NOW</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
