"use client";

import React from "react";
import { Flame, GraduationCap, Briefcase, Home, DollarSign, Clock, RefreshCw } from "lucide-react";

interface DashboardStatsProps {
  totalActive: number;
  newToday: number;
  fresherFriendly: number;
  fullTime: number;
  remote: number;
  salaryDisclosed: number;
  lastUpdated?: string;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export default function DashboardStats({
  totalActive,
  newToday,
  fresherFriendly,
  fullTime,
  remote,
  salaryDisclosed,
  lastUpdated,
  onRefresh,
  isLoading,
}: DashboardStatsProps) {
  const [formattedTime, setFormattedTime] = React.useState("Just now");

  React.useEffect(() => {
    if (lastUpdated) {
      try {
        setFormattedTime(
          new Date(lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      } catch {}
    }
  }, [lastUpdated]);

  return (
    <section className="bg-slate-900 border-b border-slate-800 text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                SEO Jobs in Pune
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Auto-Updated Daily
              </span>
              <span className="hidden sm:inline-flex items-center text-[11px] text-blue-300 bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-800/60">
                ⚡ 06:00 AM IST Daily Sync Active
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              <strong className="text-white font-semibold">{totalActive} relevant opportunities</strong> found across verified Pune employers & portals
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-md border border-slate-800">
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              <span>Last updated: {formattedTime}</span>
            </div>
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isLoading}
                title="Refresh jobs feed"
                className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md border border-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-blue-400" : ""}`} />
                <span>Sync</span>
              </button>
            )}
          </div>
        </div>

        {/* 5 KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-5">
          {/* 1. New Today */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-lg p-3.5 flex items-center gap-3.5 hover:border-slate-700 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">New Today</div>
              <div className="text-lg font-bold text-white tracking-tight">{newToday}</div>
            </div>
          </div>

          {/* 2. Fresher Friendly */}
          <div className="bg-slate-950/60 border border-emerald-900/40 rounded-lg p-3.5 flex items-center gap-3.5 hover:border-emerald-700/60 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-emerald-400 font-semibold">Fresher Friendly</div>
              <div className="text-lg font-bold text-white tracking-tight">{fresherFriendly}</div>
            </div>
          </div>

          {/* 3. Full Time */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-lg p-3.5 flex items-center gap-3.5 hover:border-slate-700 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Full Time</div>
              <div className="text-lg font-bold text-white tracking-tight">{fullTime}</div>
            </div>
          </div>

          {/* 4. Remote / Hybrid */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-lg p-3.5 flex items-center gap-3.5 hover:border-slate-700 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Remote & Hybrid</div>
              <div className="text-lg font-bold text-white tracking-tight">{remote}</div>
            </div>
          </div>

          {/* 5. Salary Disclosed */}
          <div className="col-span-2 sm:col-span-1 bg-slate-950/60 border border-slate-800/90 rounded-lg p-3.5 flex items-center gap-3.5 hover:border-slate-700 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Salary Disclosed</div>
              <div className="text-lg font-bold text-white tracking-tight">{salaryDisclosed}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
