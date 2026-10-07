"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Job, JobSourceStatus, IngestionLog } from "@/lib/types";
import {
  ShieldCheck,
  Play,
  RotateCw,
  Server,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Activity,
  Trash2,
  Edit,
  ExternalLink,
  Plus,
  RefreshCw,
  Calendar,
  Clock,
  Zap,
  Check,
} from "lucide-react";

export default function AdminPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [sources, setSources] = useState<JobSourceStatus[]>([]);
  const [logs, setLogs] = useState<IngestionLog[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [schedulerState, setSchedulerState] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ingesting, setIngesting] = useState(false);
  const [ingestSuccessMsg, setIngestSuccessMsg] = useState("");
  const [searchJob, setSearchJob] = useState("");

  const fetchData = async () => {
    try {
      const [mRes, jRes, sRes] = await Promise.all([
        fetch("/api/admin/metrics"),
        fetch("/api/jobs?limit=100"),
        fetch("/api/admin/scheduler"),
      ]);

      if (mRes.ok) {
        const mJson = await mRes.json();
        setMetrics(mJson.metrics);
        setSources(mJson.sources);
        setLogs(mJson.recentLogs);
      }

      if (jRes.ok) {
        const jJson = await jRes.json();
        setJobs(jJson.jobs || []);
      }

      if (sRes.ok) {
        const sJson = await sRes.json();
        setSchedulerState(sJson);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRunIngestion = async (sourceId?: string) => {
    setIngesting(true);
    setIngestSuccessMsg("");
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceId }),
      });
      const data = await res.json();
      if (data.success) {
        setIngestSuccessMsg(data.message);
        await fetchData();
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIngesting(false);
    }
  };

  const handleRunDailyScheduler = async () => {
    setIngesting(true);
    setIngestSuccessMsg("");
    try {
      const res = await fetch("/api/admin/scheduler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "trigger_now" }),
      });
      const data = await res.json();
      if (data.success) {
        setIngestSuccessMsg(data.result?.summary || "Daily sync executed successfully.");
        await fetchData();
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIngesting(false);
    }
  };

  const handleFrequencyChange = async (freq: string) => {
    try {
      const res = await fetch("/api/admin/scheduler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frequency: freq }),
      });
      if (res.ok) {
        const data = await res.json();
        setSchedulerState(data.state);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleScheduler = async (enabled: boolean) => {
    try {
      const res = await fetch("/api/admin/scheduler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      });
      if (res.ok) {
        const data = await res.json();
        setSchedulerState(data.state);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleJobStatus = async (jobId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "active" ? "expired" : "active";
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchJob.toLowerCase()) ||
      j.company.toLowerCase().includes(searchJob.toLowerCase()) ||
      j.source.toLowerCase().includes(searchJob.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      <Navbar />

      <section className="bg-slate-950 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Admin Control Center & Data Engine
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Automated daily discovery scheduler, deduplication rules, live scrapers, and Pune listings manager.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunDailyScheduler}
              disabled={ingesting}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Zap className={`h-3.5 w-3.5 ${ingesting ? "animate-spin" : ""}`} />
              <span>{ingesting ? "Running Daily Cycle..." : "Trigger Daily Update Cycle Now"}</span>
            </button>
          </div>
        </div>
      </section>

      {ingestSuccessMsg && (
        <div className="bg-emerald-500 text-white px-4 py-2.5 text-center text-xs font-bold animate-fade-in">
          {ingestSuccessMsg}
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Metrics Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 block">Total Ingested</span>
            <strong className="text-xl font-extrabold text-slate-900">{metrics?.totalJobs || 0}</strong>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <span className="text-xs font-semibold text-emerald-600 block">Active Listings</span>
            <strong className="text-xl font-extrabold text-emerald-700">{metrics?.totalActive || 0}</strong>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <span className="text-xs font-semibold text-blue-600 block">Fresher Friendly</span>
            <strong className="text-xl font-extrabold text-blue-700">{metrics?.fresherJobs || 0}</strong>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <span className="text-xs font-semibold text-purple-600 block">Consolidated Dups</span>
            <strong className="text-xl font-extrabold text-purple-700">{metrics?.duplicatesConsolidated || 0}</strong>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 block">Total Views</span>
            <strong className="text-xl font-extrabold text-slate-900">{metrics?.totalViews || 0}</strong>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <span className="text-xs font-semibold text-emerald-600 block">Sources Health</span>
            <strong className="text-sm font-bold text-emerald-700">
              {metrics?.sourcesOperational || 0} / {metrics?.sourcesCount || 0} Operational
            </strong>
          </div>
        </div>

        {/* 🌟 AUTOMATED DAILY SCHEDULER CONTROLLER */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 border border-slate-800 shadow-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Automated Daily Job Ingestion Engine</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    schedulerState?.enabled
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : "bg-rose-500/20 text-rose-300 border-rose-500/40"
                  }`}>
                    {schedulerState?.enabled ? "🟢 ACTIVE & RUNNING" : "🔴 PAUSED"}
                  </span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Automatically discovers new Pune SEO listings, recalculates match scores, merges duplicates, and archives expired jobs daily.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggleScheduler(!schedulerState?.enabled)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  schedulerState?.enabled
                    ? "bg-rose-500/20 border-rose-500/40 text-rose-300 hover:bg-rose-500/30"
                    : "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30"
                }`}
              >
                {schedulerState?.enabled ? "Pause Schedule" : "Resume Schedule"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block font-semibold mb-1">Update Frequency</span>
              <select
                value={schedulerState?.frequency || "daily"}
                onChange={(e) => handleFrequencyChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-bold focus:outline-none focus:border-blue-400 cursor-pointer"
              >
                <option value="daily">Daily at 06:00 AM IST (Recommended)</option>
                <option value="12h">Every 12 Hours (Twice Daily)</option>
                <option value="6h">Every 6 Hours (High Frequency)</option>
              </select>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block font-semibold mb-1">Cron Expression & Status</span>
              <div className="font-mono text-emerald-400 font-bold">{schedulerState?.cronExpression || "0 6 * * *"}</div>
              <span className="text-[11px] text-slate-400">Total Runs: {schedulerState?.totalRunsExecuted || 1} cycles</span>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block font-semibold mb-1">Next Scheduled Execution</span>
              <div className="text-white font-bold flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                <span>
                  {schedulerState?.nextRunAt ? new Date(schedulerState.nextRunAt).toLocaleString() : "Tomorrow at 06:00 AM"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between gap-2">
            <span>
              <strong>Webhook URL for external cron:</strong> <code className="bg-slate-900 px-2 py-0.5 rounded text-blue-300 font-mono">/api/cron/daily-update</code> (Can be called by Vercel Cron or GitHub Actions)
            </span>
            <button
              onClick={handleRunDailyScheduler}
              disabled={ingesting}
              className="text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer shrink-0"
            >
              Test Daily Cycle Now
            </button>
          </div>
        </div>

        {/* Source Adapter Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Server className="h-4 w-4 text-blue-600" />
                <span>Configured Job Source Adapters ({sources.length})</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Compliant ingestion feeds adhering to rate limits and robots.txt policies.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sources.map((src) => (
              <div
                key={src.id}
                className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{src.name}</h4>
                    <span className="text-[11px] text-slate-500">{src.type}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {src.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs bg-white p-2 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Fetched</span>
                    <strong>{src.jobsFetched}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Active</span>
                    <strong className="text-emerald-600">{src.jobsActive}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Dups</span>
                    <strong>{src.duplicatesConsolidated}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Rate: {src.rateLimitInfo}</span>
                  <button
                    onClick={() => handleRunIngestion(src.id)}
                    disabled={ingesting}
                    className="text-blue-600 hover:underline font-bold"
                  >
                    Run Sync
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Ingestion Audit Logs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <span>Recent Ingestion & Deduplication Logs</span>
            </h3>
            <button onClick={fetchData} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              <RefreshCw className="h-3 w-3" />
              <span>Refresh Logs</span>
            </button>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto font-mono text-xs">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-lg bg-slate-950 text-slate-200 flex items-start justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">[{log.source}]</span>
                    <span className="text-slate-400 text-[10px]">
                      {log.timestamp ? log.timestamp.split("T")[1]?.substring(0, 8) || "Recent" : "Recent"}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{log.message}</p>
                </div>
                <span className="text-emerald-400 text-[10px] shrink-0 font-bold">
                  +{log.newJobsAdded} New
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Jobs Management Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Jobs Database ({jobs.length})
              </h3>
              <p className="text-xs text-slate-500">
                Review, toggle active/expired state, or inspect original source URLs.
              </p>
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                value={searchJob}
                onChange={(e) => setSearchJob(e.target.value)}
                placeholder="Search by title, company..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                <tr>
                  <th className="p-3">Job Title & Company</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Experience</th>
                  <th className="p-3">Salary</th>
                  <th className="p-3">Source</th>
                  <th className="p-3">Match</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/70">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{job.title}</div>
                      <div className="text-slate-500">{job.company}</div>
                    </td>
                    <td className="p-3 font-medium">📍 {job.locality || "Pune"}</td>
                    <td className="p-3">
                      <span className="font-semibold text-emerald-700">{job.experienceLabel}</span>
                    </td>
                    <td className="p-3 font-semibold text-slate-800">
                      {job.salaryDisclosed ? `₹${(job.salaryMin).toLocaleString()}` : "Not Disclosed"}
                    </td>
                    <td className="p-3 font-medium text-blue-600">{job.source}</td>
                    <td className="p-3 font-bold text-emerald-700">🔥 {job.matchScore}%</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          job.status === "active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleToggleJobStatus(job.id, job.status)}
                        className="text-xs text-blue-600 hover:underline font-semibold"
                      >
                        {job.status === "active" ? "Expire" : "Activate"}
                      </button>
                      <a
                        href={job.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-600 hover:text-slate-900"
                      >
                        <ExternalLink className="h-3.5 w-3.5 inline" />
                      </a>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-xs text-rose-500 hover:text-rose-700"
                        title="Delete listing"
                      >
                        <Trash2 className="h-3.5 w-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
