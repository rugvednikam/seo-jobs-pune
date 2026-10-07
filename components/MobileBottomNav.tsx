"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sparkles, Bookmark, FileCheck, Bell, ShieldCheck } from "lucide-react";
import { getLocalSavedJobs } from "@/lib/clientState";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setSavedCount(getLocalSavedJobs().length);
    };
    updateCount();
    window.addEventListener("saved-jobs-updated", updateCount);
    return () => window.removeEventListener("saved-jobs-updated", updateCount);
  }, []);

  const items = [
    { href: "/", label: "Jobs", icon: Search },
    { href: "/seo-jobs-pune-freshers", label: "Freshers", icon: Sparkles, highlight: true },
    { href: "/resume-match", label: "Matcher", icon: FileCheck },
    { href: "/tracker", label: "Tracker", icon: Bookmark, badge: savedCount > 0 ? savedCount : undefined },
    { href: "/alerts", label: "Alerts", icon: Bell },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 text-slate-400 px-2 py-2 flex items-center justify-around shadow-[0_-8px_20px_rgba(0,0,0,0.45)] select-none">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-semibold transition-all relative touch-manipulation active:scale-95 ${
              isActive
                ? "text-blue-400 font-bold bg-blue-500/10"
                : item.highlight
                ? "text-emerald-400 font-semibold hover:text-emerald-300"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <div className="relative">
              <Icon className={`h-5 w-5 ${isActive ? "text-blue-400" : item.highlight ? "text-emerald-400" : ""}`} />
              {item.badge !== undefined && (
                <span className="absolute -top-1.5 -right-2.5 bg-blue-500 text-white rounded-full text-[9px] font-extrabold px-1.5 min-w-[15px] h-4 flex items-center justify-center border border-slate-950 shadow-sm">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="mt-1 tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
