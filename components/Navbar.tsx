"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Search,
  Sparkles,
  FileCheck,
  Bell,
  SlidersHorizontal,
  Bookmark,
  Menu,
  X,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { getLocalSavedJobs } from "@/lib/clientState";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setSavedCount(getLocalSavedJobs().length);
    };
    updateCount();
    window.addEventListener("saved-jobs-updated", updateCount);
    return () => window.removeEventListener("saved-jobs-updated", updateCount);
  }, []);

  const navLinks = [
    { href: "/", label: "Find Jobs", icon: Search },
    { href: "/seo-jobs-pune-freshers", label: "Fresher Only", icon: Sparkles, highlight: true },
    { href: "/resume-match", label: "Resume Matcher", icon: FileCheck },
    { href: "/tracker", label: "App Tracker", icon: Bookmark, badge: savedCount > 0 ? savedCount : undefined },
    { href: "/companies", label: "Companies", icon: Briefcase },
    { href: "/alerts", label: "Job Alerts", icon: Bell },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950 text-white">
      {/* Top Pune Fresher Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 px-4 py-1.5 text-center text-xs font-medium text-blue-100 flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          <strong>Pune SEO Jobs Discovery</strong> — 100% Genuine, Verified Fresher & Junior Roles in Pune & Remote
        </span>
        <span className="hidden md:inline-block text-blue-300">| Direct Employer & Portal Links</span>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20 group-hover:bg-blue-500 transition-colors">
            <span className="text-xl">S</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                SEO Jobs <span className="text-blue-400">Pune</span>
              </span>
              <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-blue-300 border border-blue-500/30">
                0-1 Yrs
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Dedicated Fresher & Entry-Level Job Board
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-slate-800 text-blue-400 font-semibold"
                    : link.highlight
                    ? "text-emerald-400 hover:bg-emerald-950/40 hover:text-emerald-300 font-semibold"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className="ml-1 rounded-full bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.2">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Admin */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/resume-match"
            className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg font-bold shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
          >
            <FileCheck className="h-3.5 w-3.5" />
            <span>Upload Resume</span>
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded border border-slate-800 hover:border-slate-700 bg-slate-900/60"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/tracker"
            className="relative p-2 text-slate-300 hover:text-white"
            aria-label="Saved Jobs"
          >
            <Bookmark className="h-5 w-5" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                {savedCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-1 animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-slate-800 text-blue-400 font-semibold"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-slate-400" />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && (
                  <span className="rounded-full bg-blue-500 text-white text-xs font-bold px-2 py-0.5">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between px-2">
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Admin Control Panel</span>
            </Link>
            <span className="text-[11px] text-slate-500">Pune, Maharashtra</span>
          </div>
        </div>
      )}
    </header>
  );
}
