"use client";

import React, { useState } from "react";
import { X, Bell, CheckCircle2, Sparkles, Send } from "lucide-react";

interface JobAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialKeyword?: string;
  initialLocation?: string;
}

export default function JobAlertModal({
  isOpen,
  onClose,
  initialKeyword = "SEO Fresher",
  initialLocation = "Pune",
}: JobAlertModalProps) {
  const [email, setEmail] = useState("");
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [frequency, setFrequency] = useState<"Daily" | "Weekly">("Daily");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewActive, setPreviewActive] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, keyword, location, frequency, experience: "Fresher" }),
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch {}

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Create Pune SEO Job Alert</h3>
              <p className="text-xs text-blue-200">Get notified when new fresher openings match</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-blue-200 hover:text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="font-extrabold text-slate-900 text-xl">Job Alert Activated!</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              We will send <strong>{frequency}</strong> email digests for <strong>"{keyword}"</strong> in <strong>{location}</strong> to <strong>{email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-slate-700">
            <div>
              <label className="font-bold text-slate-900 block mb-1">Your Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@gmail.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Search Keywords</label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. SEO Executive"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Target Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Pune, Baner, Kharadi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-900 block mb-1">Notification Frequency</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFrequency("Daily")}
                  className={`py-2 px-3 rounded-lg border text-center font-bold cursor-pointer transition-colors ${
                    frequency === "Daily"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  ⚡ Daily Instant Digest
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("Weekly")}
                  className={`py-2 px-3 rounded-lg border text-center font-bold cursor-pointer transition-colors ${
                    frequency === "Weekly"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  📅 Weekly Roundup
                </button>
              </div>
            </div>

            {/* Email Notification Preview Sample */}
            <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1.5">
              <button
                type="button"
                onClick={() => setPreviewActive(!previewActive)}
                className="text-[11px] font-bold text-blue-600 hover:underline flex items-center justify-between w-full"
              >
                <span>{previewActive ? "Hide Email Preview" : "Show Email Notification Preview"}</span>
                <span>{previewActive ? "▲" : "▼"}</span>
              </button>

              {previewActive && (
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-[11px] text-slate-700 space-y-2 mt-2">
                  <div className="font-bold text-slate-900 border-b pb-1">
                    📩 Subject: 3 New Fresher SEO Jobs in Pune Match Your Criteria
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100">
                    <strong className="text-slate-900">SEO Executive Fresher</strong> — Merkle Sokrati (Viman Nagar, Pune)<br />
                    <span className="text-emerald-700 font-semibold">Salary: ₹18K–₹28K/mo • 🔥 96% Match</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-md transition-all cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{loading ? "Activating..." : "Create Job Alert"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
