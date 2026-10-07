import cron from "node-cron";
import { scraperManager } from "./scraper/scraperManager";
import { jobStore } from "./storage";

export interface SchedulerState {
  enabled: boolean;
  frequency: "6h" | "12h" | "daily";
  cronExpression: string;
  lastRunAt: string | null;
  nextRunAt: string | null;
  totalRunsExecuted: number;
  lastRunSummary: string;
}

class DailyJobScheduler {
  private cronTask: any = null;
  private state: SchedulerState = {
    enabled: true,
    frequency: "daily",
    cronExpression: "0 6 * * *", // 6:00 AM every day
    lastRunAt: new Date().toISOString(),
    nextRunAt: this.computeNextRun("daily"),
    totalRunsExecuted: 1,
    lastRunSummary: "Initial startup sync completed.",
  };

  constructor() {
    this.startSchedule();
  }

  public getState(): SchedulerState {
    return this.state;
  }

  private computeNextRun(freq: "6h" | "12h" | "daily"): string {
    const now = new Date();
    if (freq === "6h") {
      return new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString();
    } else if (freq === "12h") {
      return new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString();
    } else {
      // Daily: Tomorrow at 6:00 AM
      const next = new Date(now);
      next.setDate(next.getDate() + 1);
      next.setHours(6, 0, 0, 0);
      return next.toISOString();
    }
  }

  public async runDailyCycle(): Promise<{
    timestamp: string;
    totalFetched: number;
    newJobsAdded: number;
    duplicatesConsolidated: number;
    expiredJobsArchived: number;
    summary: string;
  }> {
    console.log("[DailyJobScheduler] Starting daily SEO jobs discovery cycle...");

    // 1. Ingest across all configured Pune source adapters
    const ingestionResult = await scraperManager.runIngestion(
      undefined,
      "SEO Fresher Pune",
      "Pune"
    );

    // 2. Scan and archive expired jobs (older than 30 days or past deadline)
    let expiredCount = 0;
    const allJobs = jobStore.getJobs();
    const nowMs = Date.now();

    for (const job of allJobs) {
      if (job.status === "active") {
        const postAgeDays = (nowMs - new Date(job.postedAt).getTime()) / (1000 * 60 * 60 * 24);
        const deadlinePast = job.deadline ? new Date(job.deadline).getTime() < nowMs : false;

        if (postAgeDays > 35 || deadlinePast) {
          jobStore.updateJobStatus(job.id, "expired");
          expiredCount++;
        }
      }
    }

    const timestamp = new Date().toISOString();
    const summary = `Daily Sync Complete: Fetched ${ingestionResult.totalFetched} vacancies, added ${ingestionResult.newJobsAdded} new Pune roles, consolidated ${ingestionResult.duplicatesConsolidated} duplicates, archived ${expiredCount} expired jobs.`;

    this.state.lastRunAt = timestamp;
    this.state.nextRunAt = this.computeNextRun(this.state.frequency);
    this.state.totalRunsExecuted++;
    this.state.lastRunSummary = summary;

    jobStore.addLog({
      source: "Automated Daily Scheduler",
      status: "success",
      message: summary,
      jobsFound: ingestionResult.totalFetched,
      newJobsAdded: ingestionResult.newJobsAdded,
    });

    console.log(`[DailyJobScheduler] ${summary}`);

    return {
      timestamp,
      totalFetched: ingestionResult.totalFetched,
      newJobsAdded: ingestionResult.newJobsAdded,
      duplicatesConsolidated: ingestionResult.duplicatesConsolidated,
      expiredJobsArchived: expiredCount,
      summary,
    };
  }

  public setFrequency(freq: "6h" | "12h" | "daily") {
    this.state.frequency = freq;
    if (freq === "6h") {
      this.state.cronExpression = "0 */6 * * *";
    } else if (freq === "12h") {
      this.state.cronExpression = "0 */12 * * *";
    } else {
      this.state.cronExpression = "0 6 * * *";
    }
    this.state.nextRunAt = this.computeNextRun(freq);
    this.startSchedule();
  }

  public toggleEnabled(enabled: boolean) {
    this.state.enabled = enabled;
    if (enabled) {
      this.startSchedule();
    } else {
      if (this.cronTask) {
        this.cronTask.stop();
        this.cronTask = null;
      }
    }
  }

  public startSchedule() {
    if (this.cronTask) {
      this.cronTask.stop();
      this.cronTask = null;
    }

    if (!this.state.enabled) return;

    try {
      this.cronTask = cron.schedule(this.state.cronExpression, async () => {
        try {
          await this.runDailyCycle();
        } catch (err) {
          console.error("[DailyJobScheduler] Error during scheduled daily run:", err);
        }
      });
      console.log(`[DailyJobScheduler] Active with cron: ${this.state.cronExpression}`);
    } catch (e) {
      console.error("[DailyJobScheduler] Failed to initialize cron schedule:", e);
    }
  }
}

// Global Singleton for persistence across hot-reloads
const globalScheduler = (global as any)._dailyJobScheduler || new DailyJobScheduler();
if (process.env.NODE_ENV !== "production") {
  (global as any)._dailyJobScheduler = globalScheduler;
}

export const dailyScheduler: DailyJobScheduler = globalScheduler;
