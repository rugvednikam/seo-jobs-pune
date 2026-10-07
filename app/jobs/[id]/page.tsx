"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import ReportJobModal from "@/components/ReportJobModal";
import { Job } from "@/lib/types";
import { isJobSaved, saveLocalJob, removeLocalSavedJob } from "@/lib/clientState";
import {
  Building2,
  MapPin,
  Briefcase,
  GraduationCap,
  DollarSign,
  Clock,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  Share2,
  Check,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

function JobDetailContent() {
  const params = useParams();
  const id = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (res.ok) {
          const json = await res.json();
          setJob(json);
          setSaved(isJobSaved(json.id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <Navbar />
        <div className="max-w-4xl mx-auto p-12 text-center text-slate-500">
          Loading job details...
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <Navbar />
        <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Job Not Found or Expired</h2>
          <Link href="/" className="text-blue-600 hover:underline">
            &larr; Back to Pune SEO Jobs
          </Link>
        </div>
      </div>
    );
  }

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
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    identifier: {
      "@type": "PropertyValue",
      name: job.company,
      value: job.id,
    },
    datePosted: job.postedAt,
    validThrough: job.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    employmentType: job.employmentType === "Full-time" ? "FULL_TIME" : "INTERN",
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: job.companyWebsite,
      logo: job.companyLogo,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.locality || "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
  };

  const formatSalary = () => {
    if (!job.salaryDisclosed || job.salaryMin <= 0) return "Salary Not Disclosed";
    const min = `₹${job.salaryMin.toLocaleString("en-IN")}`;
    const max = job.salaryMax ? `₹${job.salaryMax.toLocaleString("en-IN")}` : "";
    return `${min}${max ? ` – ${max}` : ""} / ${job.salaryPeriod === "year" ? "yr" : "month"}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Navbar />

      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Pune Jobs</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-lg">
                {job.companyLogo ? (
                  <img src={job.companyLogo} alt={job.company} className="h-full w-full object-cover" />
                ) : (
                  <Building2 className="h-8 w-8 text-slate-700" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/company/${job.companyId}`}
                    className="text-sm font-bold text-blue-400 hover:underline"
                  >
                    {job.company}
                  </Link>
                  {job.verified && <CheckCircle2 className="h-4 w-4 text-blue-400" />}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {job.title}
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                  <span>📍 {job.location}</span>
                  <span>•</span>
                  <span>{job.experienceLabel}</span>
                  <span>•</span>
                  <span>🔥 {job.matchScore}% Match</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                title="Share job"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
              </button>
              <button
                onClick={toggleSave}
                className={`p-2.5 rounded-xl border transition-colors ${
                  saved
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                }`}
                title={saved ? "Saved" : "Save job"}
              >
                <Bookmark className={`h-4 w-4 ${saved ? "fill-white" : ""}`} />
              </button>
              <a
                href={job.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                <span>Apply on {job.source}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Quick Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <span className="text-xs text-slate-500 block">Salary</span>
            <strong className="text-slate-900 font-bold text-sm">{formatSalary()}</strong>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Experience</span>
            <strong className="text-emerald-700 font-bold text-sm">{job.experienceLabel}</strong>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Work Mode</span>
            <strong className="text-slate-900 font-bold text-sm">{job.workMode}</strong>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Source</span>
            <strong className="text-blue-700 font-bold text-sm">{job.source}</strong>
          </div>
        </div>

        {/* Can I Apply Analysis Box */}
        <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <h2 className="font-bold text-base text-white">Can I Apply? (Fresher Compatibility)</h2>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              job.canIApplyStatus === "STRONG_MATCH"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-amber-500/20 text-amber-300 border-amber-500/40"
            }`}>
              {job.canIApplyStatus === "STRONG_MATCH" ? "🟢 Strong Fresher Match" : "🟡 Possible Match"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {job.canIApplyExplanation}
          </p>
        </div>

        {/* Description & Responsibilities */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">Job Overview</h2>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {job.responsibilities && (
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">Key Responsibilities</h2>
              <ul className="space-y-2 text-sm text-slate-700">
                {job.responsibilities.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">Required Skills & Tools</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Direct Original Application CTA */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl p-6 text-white text-center space-y-3 shadow-xl">
          <h3 className="text-lg font-bold">Ready to submit your application?</h3>
          <p className="text-xs text-blue-200 max-w-md mx-auto">
            You will be redirected directly to the official listing on <strong>{job.source}</strong> with zero intermediary redirection.
          </p>
          <div className="pt-2">
            <a
              href={job.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              <span>APPLY ON ORIGINAL WEBSITE NOW</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>

      <ReportJobModal
        job={reportModalOpen ? job : null}
        onClose={() => setReportModalOpen(false)}
      />

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

export default function JobDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-100 p-12 text-center">Loading job details...</div>}>
      <JobDetailContent />
    </Suspense>
  );
}
