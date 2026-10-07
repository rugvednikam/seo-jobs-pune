"use client";

import React, { useState } from "react";
import { X, Flag, CheckCircle2, AlertTriangle } from "lucide-react";
import { Job } from "@/lib/types";

interface ReportJobModalProps {
  job: Job | null;
  onClose: () => void;
}

export default function ReportJobModal({ job, onClose }: ReportJobModalProps) {
  const [reason, setReason] = useState("expired");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Flag className="h-5 w-5 text-rose-500" />
            <span>Report Job Listing</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-slate-900 text-lg">Thank You!</h3>
            <p className="text-xs text-slate-600">
              Our Pune verification team has logged your report and will re-verify the original employer link.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs text-slate-700">
            <div>
              <span className="font-bold text-slate-900 block mb-1">Job:</span>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">{job.title}</div>
                <div className="text-slate-500">{job.company} • {job.location}</div>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-900 block mb-1">Reason for Report</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="expired">Listing has expired / vacancy filled</option>
                <option value="broken_link">Application link is broken / 404</option>
                <option value="incorrect_experience">Experience requirement is higher than 0-1 yr</option>
                <option value="fake_or_spam">Suspicious or inaccurate salary/role information</option>
                <option value="other">Other issue</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-900 block mb-1">Additional details (Optional)</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe what went wrong on the original site..."
                rows={3}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold shadow-sm"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
