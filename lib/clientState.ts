"use client";

import { SavedJob } from "./types";

const SAVED_JOBS_KEY = "seo_pune_saved_jobs_v1";

export function getLocalSavedJobs(): SavedJob[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_JOBS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalJob(jobId: string, status: SavedJob["status"] = "saved", notes?: string): SavedJob[] {
  if (typeof window === "undefined") return [];
  const current = getLocalSavedJobs();
  const index = current.findIndex((item) => item.jobId === jobId);

  if (index !== -1) {
    current[index] = {
      ...current[index],
      status,
      notes: notes !== undefined ? notes : current[index].notes,
      updatedAt: new Date().toISOString(),
      ...(status === "applied" && !current[index].appliedDate ? { appliedDate: new Date().toISOString() } : {}),
      ...(status === "interview" && !current[index].interviewDate ? { interviewDate: new Date().toISOString() } : {}),
    };
  } else {
    current.unshift({
      jobId,
      status,
      notes: notes || "",
      updatedAt: new Date().toISOString(),
      ...(status === "applied" ? { appliedDate: new Date().toISOString() } : {}),
    });
  }

  try {
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event("saved-jobs-updated"));
  } catch {}

  return current;
}

export function removeLocalSavedJob(jobId: string): SavedJob[] {
  if (typeof window === "undefined") return [];
  let current = getLocalSavedJobs();
  current = current.filter((item) => item.jobId !== jobId);
  try {
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event("saved-jobs-updated"));
  } catch {}
  return current;
}

export function isJobSaved(jobId: string): boolean {
  const current = getLocalSavedJobs();
  return current.some((item) => item.jobId === jobId);
}

export function getJobSavedStatus(jobId: string): SavedJob["status"] | null {
  const current = getLocalSavedJobs();
  const found = current.find((item) => item.jobId === jobId);
  return found ? found.status : null;
}
