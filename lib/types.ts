export type EmploymentType = "Full-time" | "Internship" | "Contract" | "Part-time";
export type WorkMode = "On-site" | "Hybrid" | "Remote";
export type ExperienceLevel = "Fresher" | "0-1 years" | "1-2 years" | "2-3 years" | "3+ years" | "All";
export type CanIApplyStatus = "STRONG_MATCH" | "POSSIBLE_MATCH" | "EXPERIENCE_REQUIRED";

export interface ConsolidatedSource {
  source: string;
  url: string;
  lastChecked: string;
  isPrimary?: boolean;
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyId: string;
  companyLogo?: string;
  companyWebsite?: string;
  companyRating?: number;
  companyReviewsCount?: number;
  description: string;
  responsibilities: string[];
  requirementsMandatory: string[];
  requirementsPreferred: string[];
  education?: string;
  location: string;
  city: "Pune" | "Pimpri-Chinchwad" | "Remote";
  locality: string;
  experienceMin: number;
  experienceMax: number;
  experienceLabel: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: "INR";
  salaryPeriod: "month" | "year";
  salaryDisclosed: boolean;
  employmentType: EmploymentType;
  workMode: WorkMode;
  source: string;
  sourceUrl: string;
  applicationUrl: string;
  postedAt: string;
  deadline?: string;
  skills: string[];
  fresherFriendly: boolean;
  seoRelevanceScore: number;
  fresherScore: number;
  locationScore: number;
  salaryScore: number;
  matchScore: number;
  canIApplyStatus: CanIApplyStatus;
  canIApplyExplanation: string;
  whyYouMatch: string[];
  missingRequirements: string[];
  consolidatedSources: ConsolidatedSource[];
  status: "active" | "expired" | "unverified" | "removed";
  verified: boolean;
  lastVerifiedAt: string;
  createdAt: string;
  updatedAt: string;
  viewsCount?: number;
  appliesCount?: number;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  website: string;
  location: string;
  about: string;
  industry: string;
  jobsCount: number;
  avgSalaryMin: number;
  avgSalaryMax: number;
  openPositions: string[];
  verified: boolean;
}

export interface SavedJob {
  jobId: string;
  status: "saved" | "applied" | "interview" | "offer" | "rejected";
  notes?: string;
  appliedDate?: string;
  interviewDate?: string;
  updatedAt: string;
  job?: Job;
}

export interface JobAlert {
  id: string;
  email: string;
  keyword: string;
  location: string;
  experience: string;
  frequency: "Daily" | "Weekly";
  createdAt: string;
  active: boolean;
}

export interface JobSourceStatus {
  id: string;
  name: string;
  type: "Public API" | "RSS / Job Feed" | "Company Career Crawler" | "Public Job Search Feed";
  enabled: boolean;
  status: "operational" | "degraded" | "paused";
  lastRun: string;
  jobsFetched: number;
  jobsActive: number;
  duplicatesConsolidated: number;
  errorsCount: number;
  rateLimitInfo: string;
}

export interface IngestionLog {
  id: string;
  timestamp: string;
  source: string;
  status: "success" | "warning" | "error";
  message: string;
  jobsFound: number;
  newJobsAdded: number;
}

export interface SearchFilters {
  keyword?: string;
  location?: string;
  locality?: string;
  experience?: string;
  workMode?: string;
  employmentType?: string;
  salaryMin?: number;
  source?: string;
  fresherOnly?: boolean;
  postedWithinDays?: number;
  sortBy?: "relevance" | "newest" | "salary" | "fresher" | "match";
  page?: number;
  limit?: number;
}

export interface SearchResult {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
  filters: {
    totalActive: number;
    newToday: number;
    fresherFriendly: number;
    fullTime: number;
    remote: number;
    salaryDisclosed: number;
    localities: { name: string; count: number }[];
    topSkills: { name: string; count: number }[];
    sources: { name: string; count: number }[];
  };
  lastUpdated: string;
}

export interface ResumeAnalysisResult {
  candidateName?: string;
  extractedExperience: number;
  extractedSkills: string[];
  matchedJobs: Array<{
    job: Job;
    matchScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    strengths: string[];
    improvements: string[];
  }>;
  allFoundSkills: string[];
}
