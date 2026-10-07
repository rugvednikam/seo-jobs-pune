"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import DashboardStats from "@/components/DashboardStats";
import FilterSidebar from "@/components/FilterSidebar";
import JobCard from "@/components/JobCard";
import JobDetailsModal from "@/components/JobDetailsModal";
import ReportJobModal from "@/components/ReportJobModal";
import JobAlertModal from "@/components/JobAlertModal";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Job, SearchFilters, SearchResult } from "@/lib/types";
import {
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  Bell,
  Sparkles,
  RefreshCw,
  X,
  Filter,
} from "lucide-react";

export default function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: "",
    location: "Pune",
    locality: "all",
    experience: "all",
    workMode: "all",
    employmentType: "all",
    fresherOnly: false,
    salaryMin: 0,
    postedWithinDays: undefined,
    sortBy: "relevance",
    page: 1,
    limit: 12,
  });

  const [data, setData] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [reportingJob, setReportingJob] = useState<Job | null>(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Fetch jobs from API
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.keyword) params.set("keyword", filters.keyword);
      if (filters.location && filters.location !== "all") params.set("location", filters.location);
      if (filters.locality && filters.locality !== "all") params.set("locality", filters.locality);
      if (filters.experience && filters.experience !== "all") params.set("experience", filters.experience);
      if (filters.workMode && filters.workMode !== "all") params.set("workMode", filters.workMode);
      if (filters.employmentType && filters.employmentType !== "all") params.set("employmentType", filters.employmentType);
      if (filters.source && filters.source !== "all") params.set("source", filters.source);
      if (filters.fresherOnly) params.set("fresherOnly", "true");
      if (filters.salaryMin) params.set("salaryMin", filters.salaryMin.toString());
      if (filters.postedWithinDays) params.set("postedWithinDays", filters.postedWithinDays.toString());
      if (filters.sortBy) params.set("sortBy", filters.sortBy);
      if (filters.page) params.set("page", filters.page.toString());
      if (filters.limit) params.set("limit", filters.limit.toString());

      const res = await fetch(`/api/jobs?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleHeroSearch = (keyword: string, location: string) => {
    setFilters((prev) => ({
      ...prev,
      keyword,
      location,
      page: 1,
    }));
  };

  const handleQuickFilter = (type: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
      page: 1,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      keyword: "",
      location: "Pune",
      locality: "all",
      experience: "all",
      workMode: "all",
      employmentType: "all",
      fresherOnly: false,
      salaryMin: 0,
      postedWithinDays: undefined,
      sortBy: "relevance",
      page: 1,
      limit: 12,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      <Navbar />

      {/* Hero Search Section */}
      <HeroSearch
        keyword={filters.keyword || ""}
        location={filters.location || "Pune"}
        onSearch={handleHeroSearch}
        onQuickFilter={handleQuickFilter}
      />

      {/* Dashboard KPI Summary Strip */}
      <DashboardStats
        totalActive={data?.filters.totalActive || 0}
        newToday={data?.filters.newToday || 0}
        fresherFriendly={data?.filters.fresherFriendly || 0}
        fullTime={data?.filters.fullTime || 0}
        remote={data?.filters.remote || 0}
        salaryDisclosed={data?.filters.salaryDisclosed || 0}
        lastUpdated={data?.lastUpdated}
        onRefresh={fetchJobs}
        isLoading={loading}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 pb-24 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Left Column: Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
                localitiesCount={data?.filters.localities}
                sourcesCount={data?.filters.sources}
              />

              {/* Alert CTA Box */}
              <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white shadow-md">
                <div className="flex items-center gap-2 font-bold text-xs text-blue-200">
                  <Bell className="h-4 w-4 text-blue-300" />
                  <span>Never Miss a Pune SEO Job</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Get daily email alerts when fresh 0–1 year SEO roles are posted.
                </p>
                <button
                  onClick={() => setAlertModalOpen(true)}
                  className="mt-3 w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm"
                >
                  Create Job Alert
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Job List & Controls */}
          <div className="lg:col-span-3 space-y-4">
            {/* Top Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  {loading ? "Searching Pune jobs..." : `${data?.total || 0} Opportunities Found`}
                </span>
                {filters.fresherOnly && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                    Fresher Only
                  </span>
                )}
                {filters.locality && filters.locality !== "all" && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                    📍 {filters.locality}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-800"
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filters</span>
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-700 hidden sm:inline">Sort:</span>
                  <select
                    value={filters.sortBy || "relevance"}
                    onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any, page: 1 }))}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="relevance">Highest Relevance & Match</option>
                    <option value="newest">Newest First</option>
                    <option value="salary">Salary: High to Low</option>
                    <option value="fresher">Fresher Friendly First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Bar (if any applied) */}
            {(filters.keyword ||
              (filters.locality && filters.locality !== "all") ||
              (filters.experience && filters.experience !== "all") ||
              filters.fresherOnly ||
              (filters.salaryMin || 0) > 0 ||
              (filters.workMode && filters.workMode !== "all")) && (
              <div className="flex items-center gap-2 flex-wrap text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-600">Active Filters:</span>
                {filters.keyword && (
                  <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                    Keyword: "{filters.keyword}"
                    <X
                      className="h-3 w-3 cursor-pointer text-slate-400 hover:text-slate-700"
                      onClick={() => setFilters((p) => ({ ...p, keyword: "" }))}
                    />
                  </span>
                )}
                {filters.fresherOnly && (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-emerald-800 font-semibold">
                    Fresher Friendly
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters((p) => ({ ...p, fresherOnly: false }))}
                    />
                  </span>
                )}
                {filters.locality && filters.locality !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                    Locality: {filters.locality}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters((p) => ({ ...p, locality: "all" }))}
                    />
                  </span>
                )}
                {filters.workMode && filters.workMode !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                    Work Mode: {filters.workMode}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters((p) => ({ ...p, workMode: "all" }))}
                    />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-blue-600 hover:underline font-bold text-xs ml-auto"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Resume Upload & Match Quick Banner */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-blue-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="h-11 w-11 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 text-blue-300">
                  <Sparkles className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>Upload Resume to Auto-Match Pune SEO Openings</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.2 rounded-full border border-emerald-500/40">
                      New
                    </span>
                  </h3>
                  <p className="text-xs text-blue-200 mt-0.5">
                    Supports PDF, Word & TXT. Automatically extracts your tools & calculates your exact match %.
                  </p>
                </div>
              </div>

              <a
                href="/resume-match"
                className="shrink-0 text-center px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Upload Resume &rarr;
              </a>
            </div>

            {/* Job Cards Stream */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-44 bg-white rounded-xl border border-slate-200 animate-pulse p-5"
                  />
                ))}
              </div>
            ) : data?.jobs && data.jobs.length > 0 ? (
              <div className="space-y-4">
                {data.jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSelect={(j) => setSelectedJob(j)}
                    onReport={(j) => setReportingJob(j)}
                  />
                ))}

                {/* Pagination Controls */}
                {data.totalPages > 1 && (
                  <div className="pt-6 flex items-center justify-between">
                    <button
                      disabled={data.page <= 1}
                      onClick={() => setFilters((p) => ({ ...p, page: (p.page || 1) - 1 }))}
                      className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                      &larr; Previous Page
                    </button>
                    <span className="text-xs text-slate-600 font-medium">
                      Page <strong>{data.page}</strong> of <strong>{data.totalPages}</strong>
                    </span>
                    <button
                      disabled={data.page >= data.totalPages}
                      onClick={() => setFilters((p) => ({ ...p, page: (p.page || 1) + 1 }))}
                      className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                      Next Page &rarr;
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  No matching SEO jobs found
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try broadening your keyword or location filters, or reset to see all available Pune fresher opportunities.
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                  <button
                    onClick={() => setAlertModalOpen(true)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Alert Me for This Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-slate-950/80 backdrop-blur-sm lg:hidden animate-fade-in">
          <div className="w-4/5 max-w-sm bg-white h-full overflow-y-auto p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <span className="font-bold text-slate-900 text-base">Filter Jobs</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              localitiesCount={data?.filters.localities}
              sourcesCount={data?.filters.sources}
            />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs"
            >
              Show Results ({data?.total || 0})
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <JobDetailsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onReport={(j) => setReportingJob(j)}
      />

      <ReportJobModal
        job={reportingJob}
        onClose={() => setReportingJob(null)}
      />

      <JobAlertModal
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        initialKeyword={filters.keyword || "SEO Fresher"}
        initialLocation={filters.location || "Pune"}
      />

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
