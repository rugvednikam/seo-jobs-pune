import React from "react";
import Link from "next/link";
import { Search, MapPin, ShieldCheck, Heart } from "lucide-react";
import { PUNE_LOCALITIES } from "@/lib/scoring";

export default function Footer() {
  const landingPages = [
    { href: "/seo-jobs-pune-freshers", label: "SEO Fresher Jobs in Pune" },
    { href: "/seo-executive-jobs-pune", label: "SEO Executive Jobs Pune" },
    { href: "/seo-analyst-jobs-pune", label: "SEO Analyst Jobs Pune" },
    { href: "/digital-marketing-jobs-pune", label: "Digital Marketing Jobs Pune" },
    { href: "/seo-internships-pune", label: "SEO Internships in Pune" },
    { href: "/fresher-jobs-pune", label: "Entry Level Digital Jobs Pune" },
    { href: "/remote-seo-jobs-india", label: "Remote SEO Jobs for Pune" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pb-20 md:pb-10 pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                S
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                SEO Jobs <span className="text-blue-400">Pune</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Specialized search & discovery platform built for Pune freshers, graduates, and junior SEO executives. 100% genuine verified vacancies with direct employer URLs.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
              <ShieldCheck className="h-4 w-4" />
              <span>Zero Fake Links • Direct Portal Ingestion</span>
            </div>
          </div>

          {/* Col 2: High Intent Landing Pages */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Popular Pune Job Roles
            </h4>
            <ul className="space-y-2">
              {landingPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="hover:text-blue-400 hover:underline transition-colors block"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Pune Localities */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Pune Tech & Agency Hubs
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {PUNE_LOCALITIES.slice(0, 14).map((loc) => (
                <Link
                  key={loc}
                  href={`/?locality=${encodeURIComponent(loc)}`}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2 py-1 rounded text-[11px] border border-slate-800 transition-colors"
                >
                  📍 {loc}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Platform & Compliance */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Trust & Ingestion
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              We respect site policies, robots.txt, and rate limits. All job postings link directly to their canonical origin on employer portals, Naukri, LinkedIn, Internshala, and Indeed.
            </p>
            <div className="pt-1">
              <Link
                href="/admin"
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                <span>Admin Ingestion Monitor & Telemetry &rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © 2026 SEO Jobs Pune. Designed for Pune Job Seekers.
          </div>
          <div className="flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for the Pune SEO community
          </div>
        </div>
      </div>
    </footer>
  );
}
