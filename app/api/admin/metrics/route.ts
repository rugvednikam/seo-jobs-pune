import { NextResponse } from "next/server";
import { jobStore } from "@/lib/storage";

export async function GET() {
  try {
    const jobs = jobStore.getJobs();
    const sources = jobStore.getSources();
    const logs = jobStore.getLogs();

    const totalActive = jobs.filter((j) => j.status === "active").length;
    const totalExpired = jobs.filter((j) => j.status === "expired").length;
    const fresherJobs = jobs.filter((j) => j.fresherFriendly && j.status === "active").length;
    const totalViews = jobs.reduce((sum, j) => sum + (j.viewsCount || 0), 0);
    const totalApplies = jobs.reduce((sum, j) => sum + (j.appliesCount || 0), 0);

    const duplicatesConsolidated = sources.reduce((sum, s) => sum + s.duplicatesConsolidated, 0);
    const jobsFetchedTotal = sources.reduce((sum, s) => sum + s.jobsFetched, 0);
    const sourcesOperational = sources.filter((s) => s.status === "operational").length;
    const sourcesFailing = sources.filter((s) => s.status !== "operational").length;

    return NextResponse.json({
      metrics: {
        totalJobs: jobs.length,
        totalActive,
        totalExpired,
        fresherJobs,
        totalViews,
        totalApplies,
        duplicatesConsolidated,
        jobsFetchedTotal,
        sourcesOperational,
        sourcesFailing,
        sourcesCount: sources.length,
      },
      sources,
      recentLogs: logs.slice(0, 10),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to load metrics" }, { status: 500 });
  }
}
