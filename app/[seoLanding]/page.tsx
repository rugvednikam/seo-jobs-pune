"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import JobCard from "@/components/JobCard";
import JobDetailsModal from "@/components/JobDetailsModal";
import { Job, SearchResult } from "@/lib/types";
import {
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  ArrowLeft,
  Search,
} from "lucide-react";

interface LandingConfig {
  title: string;
  metaH1: string;
  subtitle: string;
  keyword: string;
  experience?: string;
  workMode?: string;
  employmentType?: string;
  fresherOnly?: boolean;
  faq: Array<{ q: string; a: string }>;
}

const LANDING_CONFIGS: Record<string, LandingConfig> = {
  "seo-jobs-pune": {
    title: "SEO Jobs in Pune (2025–2026) | Verified Openings",
    metaH1: "SEO Jobs in Pune",
    subtitle: "Explore verified search engine optimization vacancies across top Pune agencies and tech companies.",
    keyword: "SEO",
    faq: [
      {
        q: "What is the average starting salary for SEO freshers in Pune?",
        a: "Fresher SEO Executives in Pune typically start at ₹15,000 to ₹28,000 per month (₹2.0 to ₹3.5 LPA), with performance incentives and fast appraisal cycles in performance agencies.",
      },
      {
        q: "Which Pune localities have the highest concentration of SEO agencies?",
        a: "Viman Nagar, Baner, Kharadi, Kalyani Nagar, Shivajinagar, and Hinjawadi host the highest density of search marketing and IT consulting agencies in Pune.",
      },
    ],
  },
  "seo-jobs-pune-freshers": {
    title: "Fresher SEO Jobs in Pune (0–1 Years) | Entry Level Openings",
    metaH1: "Fresher SEO Jobs in Pune",
    subtitle: "Entry-level search marketing, trainee, and junior SEO executive roles for recent graduates in Pune.",
    keyword: "SEO Fresher",
    experience: "Fresher",
    fresherOnly: true,
    faq: [
      {
        q: "Can freshers with no prior agency experience get an SEO job in Pune?",
        a: "Yes! Many leading Pune agencies (Merkle Sokrati, NP Digital, IKF, Brainvire) actively hire freshers based on conceptual knowledge of crawling, keyword research, and Google Search Console.",
      },
      {
        q: "What certifications help Pune freshers land an SEO job faster?",
        a: "Google Search Console, Google Analytics 4 (Skillshop), HubSpot SEO Certification, and SEMrush Academy certificates significantly boost fresher selection rates.",
      },
    ],
  },
  "seo-executive-jobs-pune": {
    title: "SEO Executive Jobs in Pune | Agency & Corporate Openings",
    metaH1: "SEO Executive Jobs in Pune",
    subtitle: "On-page, off-page, and technical SEO executive positions across Pune IT parks and digital marketing agencies.",
    keyword: "SEO Executive",
    faq: [
      {
        q: "What are the core daily responsibilities of an SEO Executive in Pune?",
        a: "Key tasks include keyword intent discovery, meta tag and content optimization, Google Search Console indexing audits, backlink outreach, and monthly rank tracking.",
      },
    ],
  },
  "seo-analyst-jobs-pune": {
    title: "SEO Analyst Jobs in Pune | Technical & Performance Search",
    metaH1: "SEO Analyst Jobs in Pune",
    subtitle: "Data-driven organic search analytics, technical audits, and rank tracking roles in Pune.",
    keyword: "SEO Analyst",
    faq: [
      {
        q: "What tools should a Junior SEO Analyst know in Pune?",
        a: "Screaming Frog, Google Search Console, Google Analytics 4 (GA4), Ahrefs, SEMrush, and Looker Studio / Excel for automated reporting.",
      },
    ],
  },
  "digital-marketing-jobs-pune": {
    title: "Digital Marketing Jobs in Pune for Freshers & Trainees",
    metaH1: "Digital Marketing Jobs in Pune",
    subtitle: "Comprehensive search engine optimization, content marketing, and growth trainee vacancies across Pune.",
    keyword: "Digital Marketing",
    faq: [
      {
        q: "Is SEO a major requirement for Digital Marketing Executive roles in Pune?",
        a: "Yes, organic search optimization is the backbone of most 360-degree digital marketing roles in Pune, paired with social media and performance campaigns.",
      },
    ],
  },
  "seo-internships-pune": {
    title: "SEO Internships in Pune with PPO (Pre-Placement Offer)",
    metaH1: "SEO Internships in Pune",
    subtitle: "Paid SEO internships, summer traineeships, and fast-track PPO programs for Pune students and graduates.",
    keyword: "SEO Intern",
    employmentType: "Internship",
    faq: [
      {
        q: "Do SEO internships in Pune offer full-time PPO conversions?",
        a: "Over 80% of digital marketing agencies in Pune (such as IKF, SRV Media, and Tech Mahindra) convert successful 3–6 month interns into full-time Junior SEO Executives.",
      },
    ],
  },
  "fresher-jobs-pune": {
    title: "Fresher Jobs in Pune | Digital & IT Entry Level Roles",
    metaH1: "Entry-Level & Fresher Jobs in Pune",
    subtitle: "High-growth entry level positions in digital optimization, content, and search marketing across Pune.",
    keyword: "Fresher",
    experience: "Fresher",
    fresherOnly: true,
    faq: [
      {
        q: "How to prepare for a digital fresher interview in Pune?",
        a: "Understand core search ranking factors, showcase any personal blog or project, and demonstrate strong familiarity with Google's webmaster guidelines.",
      },
    ],
  },
  "remote-seo-jobs-india": {
    title: "Remote SEO Jobs for Pune & India Candidates",
    metaH1: "Remote SEO Jobs (Pune & India Candidates)",
    subtitle: "Work from home and hybrid search engine optimization opportunities with global and Indian agencies.",
    keyword: "SEO",
    workMode: "Remote",
    faq: [
      {
        q: "Can Pune freshers apply for 100% remote SEO jobs?",
        a: "Yes, international SaaS consultancies and national agencies hire remote Junior SEO Analysts in Pune with competitive compensation and flexible hours.",
      },
    ],
  },
};

function ProgrammaticSeoLandingContent() {
  const params = useParams();
  const slug = (params?.seoLanding as string) || "seo-jobs-pune";

  const config = LANDING_CONFIGS[slug] || LANDING_CONFIGS["seo-jobs-pune"];

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    if (!config) return;

    const fetchFilteredJobs = async () => {
      setLoading(true);
      try {
        const qParams = new URLSearchParams();
        if (config.keyword) qParams.set("keyword", config.keyword);
        if (config.experience) qParams.set("experience", config.experience);
        if (config.workMode) qParams.set("workMode", config.workMode);
        if (config.employmentType) qParams.set("employmentType", config.employmentType);
        if (config.fresherOnly) qParams.set("fresherOnly", "true");

        const res = await fetch(`/api/jobs?${qParams.toString()}`);
        if (res.ok) {
          const json: SearchResult = await res.json();
          setJobs(json.jobs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredJobs();
  }, [config, slug]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://seojobspune.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: config.metaH1,
        item: `https://seojobspune.in/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />

      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Home &bull; Pune Job Directory</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-semibold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>100% Real, Verified Pune Openings</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {config.metaH1}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {config.subtitle}
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Direct Employer & Portal Links
            </span>
            <span>•</span>
            <span>Pune, Maharashtra, India</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 pb-24 md:pb-8 space-y-6 sm:space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {loading ? "Searching..." : `${jobs.length} Verified Openings for "${config.metaH1}"`}
            </h2>
            <Link
              href="/"
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Explore with all filters</span>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-white rounded-xl border border-slate-200 animate-pulse p-5" />
              ))}
            </div>
          ) : jobs.length > 0 ? (
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
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              No matching jobs found in this specific category. Try our main search.
            </div>
          )}
        </div>

        {/* SEO FAQ Section */}
        {config.faq && config.faq.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Frequently Asked Questions: {config.metaH1}
            </h3>
            <div className="space-y-4 divide-y divide-slate-100">
              {config.faq.map((item, idx) => (
                <div key={idx} className={idx > 0 ? "pt-4" : ""}>
                  <h4 className="text-sm font-bold text-slate-800 flex items-start gap-2">
                    <span className="text-blue-600 font-extrabold">Q.</span>
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 pl-5 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
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

export default function ProgrammaticSeoLanding() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-100 p-12 text-center">Loading SEO landing page...</div>}>
      <ProgrammaticSeoLandingContent />
    </Suspense>
  );
}
