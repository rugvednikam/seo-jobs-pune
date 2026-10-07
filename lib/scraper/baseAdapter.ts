import { Job } from "../types";

export interface RawJobInput {
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  locality?: string;
  description: string;
  responsibilities?: string[];
  requirementsMandatory?: string[];
  requirementsPreferred?: string[];
  education?: string;
  experienceMin?: number;
  experienceMax?: number;
  salaryMin?: number;
  salaryMax?: number;
  salaryDisclosed?: boolean;
  employmentType?: "Full-time" | "Internship" | "Contract" | "Part-time";
  workMode?: "On-site" | "Hybrid" | "Remote";
  source: string;
  sourceUrl: string;
  applicationUrl: string;
  postedAt?: string;
  skills?: string[];
}

export abstract class BaseJobSourceAdapter {
  abstract id: string;
  abstract name: string;
  abstract type: "Public API" | "RSS / Job Feed" | "Company Career Crawler" | "Public Job Search Feed";

  abstract fetchJobs(keyword?: string, location?: string): Promise<RawJobInput[]>;
}
