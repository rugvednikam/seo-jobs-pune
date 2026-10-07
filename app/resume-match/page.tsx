"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import JobDetailsModal from "@/components/JobDetailsModal";
import { ResumeAnalysisResult, Job } from "@/lib/types";
import {
  FileText,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Wand2,
  FileCheck2,
  Trash2,
  File,
  Check,
  Building2,
  ExternalLink,
} from "lucide-react";

export default function ResumeMatchPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sampleResume = `Pooja Deshmukh
Email: pooja.deshmukh.pune@gmail.com | Phone: +91 98220 12345 | Pune, Maharashtra
LinkedIn: linkedin.com/in/pooja-seo-pune

CAREER OBJECTIVE:
Enthusiastic BCA Graduate seeking Fresher / Entry-level SEO Executive role in Pune to apply keyword research, on-page optimization, and analytics skills.

TECHNICAL & SEO SKILLS:
- Search Engine Optimization (SEO), Keyword Research, Search Intent Mapping
- On-Page SEO (Meta tags, H1/H2 tags, Image Alt tags, URL structuring)
- Off-Page SEO, Backlinks outreach, Local SEO (Google Business Profile)
- Google Search Console (GSC), Google Analytics 4 (GA4), Google Sheets
- Basic HTML, CSS, WordPress CMS, Yoast SEO plugin, Screaming Frog (Free)

EDUCATION:
- Bachelor of Computer Applications (BCA), Pune University (SPPU), 2025 - 78%

CERTIFICATIONS & PROJECTS:
- Completed HubSpot Search Engine Optimization Certification (2025)
- Managed personal WordPress blog: optimized 15 articles, ranked for 8 long-tail search terms in Pune`;

  const handleSampleFill = () => {
    setActiveTab("paste");
    setResumeText(sampleResume);
    setErrorMsg("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setErrorMsg("");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setErrorMsg("");
    }
  };

  const handleUploadAndAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (activeTab === "upload") {
      if (!selectedFile) {
        setErrorMsg("Please choose or drop a resume file (PDF, DOCX, TXT)");
        return;
      }

      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await fetch("/api/resume/upload", {
          method: "POST",
          body: formData,
        });

        const json = await res.json();
        if (res.ok && json.success) {
          setResult(json);
        } else {
          setErrorMsg(json.error || "Failed to process resume file");
        }
      } catch (err: any) {
        setErrorMsg(err?.message || "Server connection error");
      } finally {
        setLoading(false);
      }
    } else {
      if (!resumeText.trim() || resumeText.trim().length < 15) {
        setErrorMsg("Please paste your resume text or digital marketing summary.");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("/api/resume/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText }),
        });

        const json = await res.json();
        if (res.ok) {
          setResult(json);
        } else {
          setErrorMsg(json.error || "Failed to analyze resume text");
        }
      } catch (err: any) {
        setErrorMsg(err?.message || "Server connection error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/50 px-3.5 py-1 text-xs font-semibold text-blue-300">
            <BrainCircuit className="h-3.5 w-3.5 text-blue-400" />
            <span>AI Powered Fresher Matcher</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Upload Your Resume & Match <span className="text-blue-400">Pune SEO Jobs</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal">
            Upload your resume (PDF / Word / TXT) or paste text. Our engine extracts your SEO tools, calculates candidate compatibility, and suggests high-matching entry-level Pune openings.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 pb-24 md:pb-8 space-y-6 sm:space-y-8">
        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Tab Switcher */}
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "upload"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <UploadCloud className="h-4 w-4" />
                <span>Upload Resume File (PDF / DOCX / TXT)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("paste")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "paste"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Paste Resume Text</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleSampleFill}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Wand2 className="h-3.5 w-3.5" />
              <span>Load Sample Fresher Resume</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleUploadAndAnalyze} className="space-y-5">
            {activeTab === "upload" ? (
              /* Drag and Drop Zone */
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!selectedFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-blue-500 bg-blue-50/50 scale-[1.01]"
                        : "border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-slate-50"
                    }`}
                  >
                    <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <UploadCloud className="h-8 w-8" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      Drag & Drop your resume here, or <span className="text-blue-600 hover:underline">browse file</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Supports PDF, Word (.docx, .doc), or Text (.txt) &bull; Max 10MB
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-[11px] font-medium shadow-2xs">
                      <span>🔒 100% Private: Extracted in-memory only</span>
                    </div>
                  </div>
                ) : (
                  /* File Selected Preview */
                  <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                        <FileCheck2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 truncate max-w-sm">
                          {selectedFile.name}
                        </h4>
                        <span className="text-xs text-slate-500">
                          {(selectedFile.size / 1024).toFixed(1)} KB &bull; Ready to scan
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg"
                      >
                        Change File
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                        title="Remove file"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Paste Resume Text Area */
              <div className="space-y-2">
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={8}
                  placeholder="Paste your resume text here (education, SEO tools, internships, Google Search Console, GA4, WordPress, etc.)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{resumeText.length} characters</span>
                  <span>Minimum 15 characters required</span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                disabled={loading || (activeTab === "upload" ? !selectedFile : resumeText.trim().length < 15)}
                className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer hover:shadow-blue-500/25"
              >
                <Sparkles className="h-4 w-4" />
                <span>{loading ? "Parsing & Matching Jobs..." : "Match With Pune Jobs &rarr;"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            {/* Candidate Extracted Skills Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span>Candidate Profile Extracted</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {result.fileName && `File: ${result.fileName} • `}
                    Experience level: <strong>{result.extractedExperience === 0 ? "Fresher / 0–1 Years" : `${result.extractedExperience} Years`}</strong>
                  </p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-lg">
                  {result.allFoundSkills.length} SEO Tools & Competencies Found
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-2">Detected Skills & Tools:</span>
                <div className="flex flex-wrap gap-2">
                  {result.allFoundSkills.map((s: string) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Check className="h-3 w-3 text-emerald-400" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Matched Jobs List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Top Matching Pune SEO Openings ({result.matchedJobs.length})</span>
                </h3>
                <span className="text-xs text-slate-500">Sorted by resume match score</span>
              </div>

              <div className="space-y-4">
                {result.matchedJobs.map(({ job, matchScore, matchedSkills, missingSkills }: any) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 p-5 shadow-sm space-y-4 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                          {job.companyLogo ? (
                            <img src={job.companyLogo} alt={job.company} className="h-full w-full object-cover" />
                          ) : (
                            <span className="font-bold text-slate-700">{job.company.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-600">{job.company} • 📍 {job.location}</span>
                          <h4 className="text-base font-bold text-slate-900">{job.title}</h4>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="inline-flex items-center gap-1 text-sm font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span>🔥</span>
                          <span>{matchScore}% Match</span>
                        </div>
                      </div>
                    </div>

                    {/* Skill Match Breakdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                      <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-100">
                        <span className="font-bold text-emerald-900 block mb-1">
                          ✓ Matched Skills ({matchedSkills.length}):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {matchedSkills.map((ms: string) => (
                            <span key={ms} className="bg-white text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                              {ms}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="font-bold text-slate-700 block mb-1">
                          • Growth skills to prep ({missingSkills.length}):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {missingSkills.length > 0 ? (
                            missingSkills.map((mis: string) => (
                              <span key={mis} className="bg-white text-slate-700 font-medium px-2 py-0.5 rounded border border-slate-200">
                                {mis}
                              </span>
                            ))
                          ) : (
                            <span className="text-emerald-700 font-semibold">All primary required skills matched!</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg cursor-pointer"
                      >
                        View Details
                      </button>
                      <a
                        href={job.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm"
                      >
                        <span>Apply on {job.source}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
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
