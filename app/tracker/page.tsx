"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import JobDetailsModal from "@/components/JobDetailsModal";
import { SavedJob, Job } from "@/lib/types";
import { getLocalSavedJobs, saveLocalJob, removeLocalSavedJob } from "@/lib/clientState";
import {
  Bookmark,
  Send,
  Calendar,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Trash2,
  Plus,
} from "lucide-react";

export default function ApplicationTrackerPage() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState("");
  const [mobileActiveStage, setMobileActiveStage] = useState<SavedJob["status"]>("saved");

  const loadData = async () => {
    try {
      const res = await fetch("/api/jobs?limit=50");
      if (res.ok) {
        const json = await res.json();
        setAllJobs(json.jobs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const syncLocal = () => {
    const local = getLocalSavedJobs();
    setSavedJobs(local);
  };

  useEffect(() => {
    loadData();
    syncLocal();
    window.addEventListener("saved-jobs-updated", syncLocal);
    return () => window.removeEventListener("saved-jobs-updated", syncLocal);
  }, []);

  const getJob = (jobId: string) => {
    return allJobs.find((j) => j.id === jobId);
  };

  const stages: Array<{ id: SavedJob["status"]; title: string; icon: any }> = [
    { id: "saved", title: "Saved", icon: Bookmark },
    { id: "applied", title: "Applied", icon: Send },
    { id: "interview", title: "Interview", icon: Calendar },
    { id: "offer", title: "Offer", icon: CheckCircle2 },
    { id: "rejected", title: "Archived", icon: XCircle },
  ];

  const handleMoveStage = (jobId: string, nextStatus: SavedJob["status"]) => {
    saveLocalJob(jobId, nextStatus);
    syncLocal();
  };

  const handleRemove = (jobId: string) => {
    removeLocalSavedJob(jobId);
    syncLocal();
  };

  const handleSaveNotes = (jobId: string) => {
    saveLocalJob(jobId, undefined, notesText);
    setEditingNotesId(null);
    syncLocal();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 pb-20 md:pb-0">
      <Navbar />

      <section className="bg-slate-950 text-white py-6 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Pune SEO Application Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Track your hiring progress from initial discovery through interviews and offer letters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm text-center w-full sm:w-auto"
            >
              + Find More Jobs
            </Link>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {savedJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-3 max-w-md mx-auto">
            <Bookmark className="h-12 w-12 text-blue-500 mx-auto" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Your tracker is empty</h3>
            <p className="text-xs text-slate-500">
              Bookmark any Pune SEO opening while searching to track your application pipeline.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl inline-block shadow-md"
              >
                Browse Pune Jobs &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Mobile Horizontal Stage Segmented Tabs */}
            <div className="md:hidden flex items-center gap-1 overflow-x-auto pb-3 mb-3 no-scrollbar">
              {stages.map((stage) => {
                const count = savedJobs.filter((sj) => sj.status === stage.id).length;
                const active = mobileActiveStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setMobileActiveStage(stage.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    <span>{stage.title}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${active ? "bg-blue-800 text-white" : "bg-slate-100 text-slate-600"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Kanban / Mobile Active Stage Stream */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {stages.map((stage) => {
                const StageIcon = stage.icon;
                const jobsInStage = savedJobs.filter((sj) => sj.status === stage.id);
                const isMobileVisible = mobileActiveStage === stage.id;

                return (
                  <div
                    key={stage.id}
                    className={`bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 flex flex-col min-h-[400px] sm:min-h-[500px] shadow-xs ${
                      !isMobileVisible ? "hidden md:flex" : "flex"
                    }`}
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                      <div className="flex items-center gap-2">
                        <StageIcon className="h-4 w-4 text-blue-600" />
                        <span className="font-bold text-xs sm:text-sm text-slate-900">{stage.title}</span>
                      </div>
                      <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        {jobsInStage.length}
                      </span>
                    </div>

                    {/* Cards */}
                    <div className="flex-1 space-y-3">
                      {jobsInStage.length === 0 ? (
                        <div className="text-center py-8 text-xs text-slate-400">
                          No jobs in this stage
                        </div>
                      ) : (
                        jobsInStage.map((savedItem) => {
                          const job = getJob(savedItem.jobId);
                          if (!job) return null;

                          return (
                            <div
                              key={savedItem.jobId}
                              className="bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-blue-400 p-3.5 space-y-2.5 transition-all shadow-xs"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <span className="text-[11px] font-semibold text-slate-500 block">
                                    {job.company}
                                  </span>
                                  <h4
                                    onClick={() => setSelectedJob(job)}
                                    className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1"
                                  >
                                    {job.title}
                                  </h4>
                                </div>
                                <button
                                  onClick={() => handleRemove(savedItem.jobId)}
                                  title="Remove from tracker"
                                  className="text-slate-400 hover:text-rose-500 p-1 rounded"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              <div className="text-[11px] text-slate-600 flex items-center justify-between">
                                <span>📍 {job.locality || "Pune"}</span>
                                <span className="font-bold text-emerald-700">
                                  {job.salaryDisclosed ? `₹${job.salaryMin.toLocaleString()}` : "Disclosed on Apply"}
                                </span>
                              </div>

                              {/* Notes */}
                              <div className="pt-1 text-[11px]">
                                {editingNotesId === savedItem.jobId ? (
                                  <div className="space-y-1">
                                    <input
                                      type="text"
                                      value={notesText}
                                      onChange={(e) => setNotesText(e.target.value)}
                                      placeholder="e.g. Sent email on 12th..."
                                      className="w-full bg-white border border-slate-300 rounded p-1 text-[11px]"
                                    />
                                    <div className="flex justify-end gap-1">
                                      <button
                                        onClick={() => setEditingNotesId(null)}
                                        className="px-2 py-0.5 text-slate-500"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        onClick={() => handleSaveNotes(savedItem.jobId)}
                                        className="px-2 py-0.5 bg-blue-600 text-white rounded font-bold"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    onClick={() => {
                                      setEditingNotesId(savedItem.jobId);
                                      setNotesText(savedItem.notes || "");
                                    }}
                                    className="text-slate-500 hover:text-slate-700 cursor-pointer italic line-clamp-2"
                                  >
                                    {savedItem.notes ? `📝 ${savedItem.notes}` : "+ Add interview note/date"}
                                  </div>
                                )}
                              </div>

                              {/* Stage Selector */}
                              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-1 text-[10px]">
                                <select
                                  value={savedItem.status}
                                  onChange={(e) => handleMoveStage(savedItem.jobId, e.target.value as any)}
                                  className="bg-white border border-slate-200 rounded px-1.5 py-1 text-slate-700 font-semibold cursor-pointer"
                                >
                                  <option value="saved">Saved</option>
                                  <option value="applied">Applied</option>
                                  <option value="interview">Interview</option>
                                  <option value="offer">Offer</option>
                                  <option value="rejected">Archived</option>
                                </select>

                                <a
                                  href={job.applicationUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline font-bold flex items-center gap-0.5"
                                >
                                  <span>Apply</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
