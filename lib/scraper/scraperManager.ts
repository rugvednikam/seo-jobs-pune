import { BaseJobSourceAdapter } from "./baseAdapter";
import {
  NaukriAdapter,
  LinkedInAdapter,
  InternshalaAdapter,
  IndeedAdapter,
  FounditAdapter,
  CompanyCareersAdapter,
} from "./adapters";
import { jobStore } from "../storage";
import { Job } from "../types";

export class ScraperManager {
  private adapters: BaseJobSourceAdapter[] = [
    new NaukriAdapter(),
    new LinkedInAdapter(),
    new InternshalaAdapter(),
    new IndeedAdapter(),
    new FounditAdapter(),
    new CompanyCareersAdapter(),
  ];

  public getAdapters(): BaseJobSourceAdapter[] {
    return this.adapters;
  }

  public async runIngestion(
    sourceId?: string,
    keyword = "SEO Pune",
    location = "Pune"
  ): Promise<{
    totalFetched: number;
    newJobsAdded: number;
    duplicatesConsolidated: number;
    sourcesProcessed: number;
  }> {
    let totalFetched = 0;
    let newJobsAdded = 0;
    let duplicatesConsolidated = 0;
    let sourcesProcessed = 0;

    const targets = sourceId
      ? this.adapters.filter((a) => a.id === sourceId)
      : this.adapters;

    for (const adapter of targets) {
      try {
        sourcesProcessed++;
        const rawList = await adapter.fetchJobs(keyword, location);
        totalFetched += rawList.length;

        let addedFromSource = 0;
        let dupsFromSource = 0;

        for (const raw of rawList) {
          const existingJobs = jobStore.getJobs();
          // Deduplication matching: Check for exact company match + high title similarity
          const isDuplicate = existingJobs.find(
            (j) =>
              j.company.toLowerCase().trim() === raw.company.toLowerCase().trim() &&
              (j.title.toLowerCase().includes(raw.title.toLowerCase()) ||
                raw.title.toLowerCase().includes(j.title.toLowerCase()))
          );

          if (isDuplicate) {
            dupsFromSource++;
            duplicatesConsolidated++;
            // Merge sources
            jobStore.addOrUpdateJob({
              id: isDuplicate.id,
              source: raw.source,
              applicationUrl: isDuplicate.source === "Company Careers" ? isDuplicate.applicationUrl : raw.applicationUrl,
            });
          } else {
            addedFromSource++;
            newJobsAdded++;
            jobStore.addOrUpdateJob({
              title: raw.title,
              company: raw.company,
              companyLogo: raw.companyLogo,
              location: raw.location,
              locality: raw.locality || "Pune",
              description: raw.description,
              responsibilities: raw.responsibilities,
              requirementsMandatory: raw.requirementsMandatory,
              requirementsPreferred: raw.requirementsPreferred,
              education: raw.education,
              experienceMin: raw.experienceMin ?? 0,
              experienceMax: raw.experienceMax ?? 1,
              salaryMin: raw.salaryMin || 18000,
              salaryMax: raw.salaryMax || 28000,
              salaryDisclosed: raw.salaryDisclosed ?? true,
              employmentType: raw.employmentType || "Full-time",
              workMode: raw.workMode || "On-site",
              source: raw.source,
              sourceUrl: raw.sourceUrl,
              applicationUrl: raw.applicationUrl,
              postedAt: raw.postedAt || new Date().toISOString(),
              skills: raw.skills,
            });
          }
        }

        // Update Source status in store
        jobStore.updateSource(adapter.id, {
          lastRun: new Date().toISOString(),
          status: "operational",
          jobsFetched: (jobStore.getSources().find((s) => s.id === adapter.id)?.jobsFetched || 0) + rawList.length,
          jobsActive: jobStore.getJobs().filter((j) => j.source === rawList[0]?.source && j.status === "active").length,
          duplicatesConsolidated:
            (jobStore.getSources().find((s) => s.id === adapter.id)?.duplicatesConsolidated || 0) + dupsFromSource,
        });

        // Add Log
        jobStore.addLog({
          source: adapter.name,
          status: "success",
          message: `Fetched ${rawList.length} listings. Added ${addedFromSource} new jobs. Consolidated ${dupsFromSource} duplicates.`,
          jobsFound: rawList.length,
          newJobsAdded: addedFromSource,
        });
      } catch (err: any) {
        jobStore.updateSource(adapter.id, {
          status: "degraded",
          errorsCount: (jobStore.getSources().find((s) => s.id === adapter.id)?.errorsCount || 0) + 1,
        });
        jobStore.addLog({
          source: adapter.name,
          status: "error",
          message: `Failed to fetch: ${err?.message || "Source timeout or rate limited"}`,
          jobsFound: 0,
          newJobsAdded: 0,
        });
      }
    }

    return {
      totalFetched,
      newJobsAdded,
      duplicatesConsolidated,
      sourcesProcessed,
    };
  }
}

export const scraperManager = new ScraperManager();
