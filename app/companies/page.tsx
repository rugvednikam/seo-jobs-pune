"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Company } from "@/lib/types";
import { Building2, MapPin, DollarSign, CheckCircle2, Search, Briefcase, ExternalLink } from "lucide-react";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("/api/companies");
        if (res.ok) {
          const json = await res.json();
          setCompanies(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      <Navbar />

      <section className="bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/50 px-3.5 py-1 text-xs font-semibold text-blue-300">
            <Building2 className="h-3.5 w-3.5 text-blue-400" />
            <span>Verified Employer Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pune SEO & Digital Marketing Companies
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Discover top digital agencies, tech corporates, and startups actively recruiting SEO talent and freshers in Pune.
          </p>

          <div className="pt-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 rounded-xl border border-slate-700 shadow-md">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search company by name, locality (Baner, Kharadi)..."
                className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-white rounded-2xl border border-slate-200 animate-pulse p-6" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((comp) => (
              <div
                key={comp.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                      {comp.logo ? (
                        <img src={comp.logo} alt={comp.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="font-bold text-slate-700">{comp.name.charAt(0)}</span>
                      )}
                    </div>
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">
                      {comp.jobsCount} Open Roles
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-900 text-base">{comp.name}</h3>
                      {comp.verified && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{comp.industry}</p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {comp.about}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{comp.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Average: ₹{comp.avgSalaryMin.toLocaleString()} – ₹{comp.avgSalaryMax.toLocaleString()}/mo</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                  <Link
                    href={`/company/${comp.slug}`}
                    className="font-bold text-blue-600 hover:text-blue-700"
                  >
                    View Open Positions &rarr;
                  </Link>
                  <a
                    href={comp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-700 flex items-center gap-1"
                  >
                    <span>Website</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            No companies matching "{search}"
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
