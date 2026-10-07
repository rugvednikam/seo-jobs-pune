"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { JobAlert } from "@/lib/types";
import { Bell, Sparkles, CheckCircle2, Send, Mail, MapPin, Search } from "lucide-react";

export default function AlertsPage() {
  const [email, setEmail] = useState("");
  const [keyword, setKeyword] = useState("SEO Executive Fresher");
  const [location, setLocation] = useState("Pune");
  const [frequency, setFrequency] = useState<"Daily" | "Weekly">("Daily");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertsList, setAlertsList] = useState<JobAlert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch("/api/alerts");
        if (res.ok) {
          const json = await res.json();
          setAlertsList(json);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAlerts();
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, keyword, location, frequency }),
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      <Navbar />

      <section className="bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/50 px-3.5 py-1 text-xs font-semibold text-blue-300">
            <Bell className="h-3.5 w-3.5 text-blue-400" />
            <span>Never Miss a New Opening</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pune SEO Job Alerts
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Get instant or daily notifications when fresh SEO Executive, Analyst, and Digital Marketing fresher vacancies appear in Pune.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {success ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto" />
              <h2 className="text-xl font-bold text-slate-900">Your Alert is Active!</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                You will receive <strong>{frequency.toLowerCase()}</strong> updates for <strong>"{keyword}"</strong> in <strong>{location}</strong> at <strong>{email}</strong>.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
              >
                Create Another Alert
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-700">
              <h3 className="text-base font-bold text-slate-900">Set Up Your Custom Criteria</h3>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Your Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-900 block mb-1">Role / Keyword</label>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g. SEO Executive Fresher"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-900 block mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Pune, Baner, Kharadi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Frequency</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFrequency("Daily")}
                    className={`p-3 rounded-xl border text-center font-bold cursor-pointer transition-colors ${
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
                    className={`p-3 rounded-xl border text-center font-bold cursor-pointer transition-colors ${
                      frequency === "Weekly"
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    📅 Weekly Summary
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !email.includes("@")}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl font-bold shadow-md transition-all cursor-pointer"
                >
                  {loading ? "Activating..." : "Subscribe to Job Alerts"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
