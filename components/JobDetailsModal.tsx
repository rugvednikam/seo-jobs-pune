"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  DollarSign,
  Clock,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  Share2,
  ShieldCheck,
  Building2,
  Check,
  Sparkles,
} from "lucide-react";
import { Job } from "@/lib/types";
import { isJobSaved, saveLocalJob, removeLocalSavedJob } from "@/lib/clientState";

interface JobDetailsModalProps {
  job: Job | null;
  onClose: () => void;
  onReport?: (job: Job) => void;
}

export default function JobDetailsModal({ job, onClose, onReport }: JobDetailsModalProps) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (job) {
      setSaved(isJobSaved(job.id));
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [job]);

  if (!job) return null;

  const toggleSave = () => {
    if (saved) {
      removeLocalSavedJob(job.id);
      setSaved(false);
    } else {
      saveLocalJob(job.id, "saved");
      setSaved(true);
    }
  };

  const handleShare = () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/jobs/${job.id}` : "";
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatSalary = () => {
    if (!job.salaryDisclosed || job.salaryMin <= 0) return "Salary Not Disclosed";
    const min = `₹${job.salaryMin.toLocaleString("en-IN")}`;
    const max = job.salaryMax ? `₹${job.salaryMax.toLocaleString("en-IN")}` : "";
    return `${min}${max ? ` – ${max}` : ""} / ${job.salaryPeriod === "year" ? "yr" : "month"}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/90 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center overflow-hidden shrink-0">
              {job.companyLogo ? (
                <img src={job.companyLogo} alt={job.company} className="h-full w-full object-cover" />
              ) : (
                <Building2 className="h-6 w-6 sm:h-7 sm:w-7 text-slate-400" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Link
                  href={`/company/${job.companyId}`}
                  className="text-xs sm:text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  {job.company}
                  {job.verified && <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />}
                </Link>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-600 font-medium">📍 {job.location}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5 sm:mt-1 line-clamp-2">
                {job.title}
              </h2>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 active:scale-95"
              title="Copy share link"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
            </button>
            <button
              onClick={toggleSave}
              className={`p-2 rounded-xl border transition-colors active:scale-95 ${
                saved
                  ? "bg-blue-50 border-blue-300 text-blue-600"
                  : "bg-white border-slate-200 text-slate-600"
              }`}
              title={saved ? "Saved" : "Save job"}
            >
              <Bookmark className={`h-4 w-4 ${saved ? "fill-blue-600" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-medium block">Salary / Stipend</span>
              <strong className="text-slate-900 font-bold text-xs sm:text-sm">{formatSalary()}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Experience</span>
              <strong className="text-emerald-700 font-bold text-xs sm:text-sm">{job.experienceLabel}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Work Mode</span>
              <strong className="text-slate-900 font-bold text-xs sm:text-sm">{job.employmentType} ({job.workMode})</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Relevance Match</span>
              <strong className="text-blue-700 font-bold text-xs sm:text-sm">🔥 {job.matchScore}% Match</strong>
            </div>
          </div>

          {/* "Can I Apply?" Fresher Analysis Widget */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-4 sm:p-5 border border-slate-800 shadow-md space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
                <h3 className="font-bold text-sm sm:text-base text-white">Can I Apply?</h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold border ${
                job.canIApplyStatus === "STRONG_MATCH"
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : job.canIApplyStatus === "POSSIBLE_MATCH"
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-rose-500/20 text-rose-300 border-rose-500/40"
              }`}>
                {job.canIApplyStatus === "STRONG_MATCH" ? "🟢 Strong Fresher Match" : "🟡 Possible Match"}
              </span>
            </div>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              {job.canIApplyExplanation}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
              <div>
                <span className="font-semibold text-emerald-400 block mb-1">
                  Why you match:
                </span>
                <ul className="space-y-1 text-slate-300">
                  {job.whyYouMatch.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-semibold text-amber-400 block mb-1">
                  Skills to study before interview:
                </span>
                <ul className="space-y-1 text-slate-300">
                  {job.missingRequirements.length > 0 ? (
                    job.missingRequirements.map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-400">All foundational skills matched!</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">Job Overview</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">Key Responsibilities</h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">Mandatory Requirements</h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {job.requirementsMandatory.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Sticky Apply CTA */}
        <div className="p-3.5 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2.5">
          <button
            onClick={toggleSave}
            className={`px-3 py-2.5 sm:px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 active:scale-95 ${
              saved
                ? "bg-blue-50 border-blue-300 text-blue-600"
                : "bg-white border-slate-300 text-slate-700"
            }`}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-blue-600" : ""}`} />
            <span className="hidden sm:inline">{saved ? "Saved" : "Save Job"}</span>
          </button>

          <a
            href={job.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
          >
            <span>APPLY ON ORIGINAL WEBSITE</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
