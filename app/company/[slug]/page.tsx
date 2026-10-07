"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import JobCard from "@/components/JobCard";
import JobDetailsModal from "@/components/JobDetailsModal";
import { Company, Job } from "@/lib/types";
import {
  Building2,
  MapPin,
  DollarSign,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  Briefcase,
} from "lucide-react";

function SingleCompanyContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchCompanyData = async () => {
      try {
        const res = await fetch(`/api/companies/${slug}`);
        if (res.ok) {
          const json = await res.json();
          setCompany(json.company);
          setJobs(json.jobs || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <Navbar />
        <div className="max-w-4xl mx-auto p-12 text-center text-slate-500">
          Loading company details...
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <Navbar />
        <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Company Not Found</h2>
          <Link href="/companies" className="text-blue-600 hover:underline">
            &larr; Back to Companies Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto space-y-6">
          <Link
            href="/companies"
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Companies Directory</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-lg">
                {company.logo ? (
                  <img src={company.logo} alt={company.name} className="h-full w-full object-cover" />
                ) : (
                  <Building2 className="h-8 w-8 text-slate-700" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{company.name}</h1>
                  {company.verified && <CheckCircle2 className="h-5 w-5 text-blue-400" />}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                  <span>{company.industry}</span>
                  <span>•</span>
                  <span>📍 {company.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 shadow-sm"
              >
                <span>Visit Career Page</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* About & Stats */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">About {company.name}</h2>
          <p className="text-sm text-slate-700 leading-relaxed">{company.about}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block">Open Positions in Pune</span>
              <strong className="text-base text-slate-900 font-bold">{jobs.length} Jobs</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block">Estimated Average Salary</span>
              <strong className="text-base text-emerald-700 font-bold">
                ₹{company.avgSalaryMin.toLocaleString()} – ₹{company.avgSalaryMax.toLocaleString()}/mo
              </strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-500 block">Location Focus</span>
              <strong className="text-base text-slate-900 font-bold">{company.location}</strong>
            </div>
          </div>
        </div>

        {/* Open Job Listings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <span>Active SEO & Digital Roles at {company.name} ({jobs.length})</span>
            </h3>
          </div>

          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSelect={(j) => setSelectedJob(j)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
              No active job openings currently listed for this company.
            </div>
          )}
        </div>
      </main>

      <JobDetailsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

export default function SingleCompanyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-100 p-12 text-center">Loading company profile...</div>}>
      <SingleCompanyContent />
    </Suspense>
  );
}
