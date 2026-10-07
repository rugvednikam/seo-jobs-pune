import { CanIApplyStatus, Job } from "./types";

export const PUNE_LOCALITIES = [
  "Baner",
  "Hinjawadi",
  "Hinjewadi",
  "Wakad",
  "Aundh",
  "Kharadi",
  "Viman Nagar",
  "Kalyani Nagar",
  "Koregaon Park",
  "Hadapsar",
  "Magarpatta",
  "Yerawada",
  "Shivajinagar",
  "Deccan",
  "Swargate",
  "Kondhwa",
  "Sinhagad Road",
  "Pimpri-Chinchwad",
  "Pimpri",
  "Chinchwad",
  "Bavdhan",
  "Kothrud",
  "Nigdi",
  "Bhosari",
  "Balewadi",
  "Senapati Bapat Road",
  "Camp",
  "F.C. Road",
  "JM Road",
];

export const SEO_KEYWORDS = [
  "seo",
  "search engine optimization",
  "seo executive",
  "seo analyst",
  "seo intern",
  "seo trainee",
  "technical seo",
  "on-page seo",
  "on page seo",
  "off-page seo",
  "off page seo",
  "link building",
  "local seo",
  "keyword research",
  "google search console",
  "gsc",
  "google analytics",
  "ga4",
  "ahrefs",
  "semrush",
  "screaming frog",
  "wordpress",
  "content optimization",
  "backlinks",
  "site audit",
  "page speed",
  "core web vitals",
  "schema markup",
  "digital marketing executive",
  "digital marketing intern",
  "digital marketing trainee",
  "growth marketing",
  "content marketing",
];

export const CORE_SEO_SKILLS = [
  "Keyword Research",
  "On-Page SEO",
  "Off-Page SEO",
  "Technical SEO",
  "Google Search Console",
  "Google Analytics 4 (GA4)",
  "Ahrefs",
  "SEMrush",
  "Screaming Frog",
  "WordPress",
  "Content Optimization",
  "Link Building",
  "Local SEO",
  "HTML/CSS Basics",
  "Meta Tag Optimization",
  "Schema Markup",
  "Competitor Analysis",
  "Core Web Vitals",
  "Canva / Visuals",
  "Excel / Google Sheets Reporting",
];

export interface ScoreBreakdown {
  seoTitleScore: number; // max 25
  fresherScore: number; // max 25
  locationScore: number; // max 15
  skillScore: number; // max 15
  salaryScore: number; // max 5
  recencyScore: number; // max 10
  applicationScore: number; // max 5
  totalScore: number; // max 100
  canIApplyStatus: CanIApplyStatus;
  canIApplyExplanation: string;
  whyYouMatch: string[];
  missingRequirements: string[];
}

export function extractSeoSkills(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];

  const skillPatterns: [string, RegExp][] = [
    ["Keyword Research", /\b(keyword research|search intent|keyword targeting)\b/i],
    ["On-Page SEO", /\b(on-page|on page|title tags|meta descriptions|heading tags|h1 tags)\b/i],
    ["Off-Page SEO", /\b(off-page|off page|backlink|link acquisition)\b/i],
    ["Link Building", /\b(link building|guest post|outreach|backlinks)\b/i],
    ["Technical SEO", /\b(technical seo|crawlability|indexing|robots\.txt|sitemap|site architecture)\b/i],
    ["Google Search Console", /\b(search console|gsc|google webmaster)\b/i],
    ["Google Analytics 4 (GA4)", /\b(google analytics|ga4|analytics 4|web analytics)\b/i],
    ["Ahrefs", /\b(ahrefs)\b/i],
    ["SEMrush", /\b(semrush)\b/i],
    ["Screaming Frog", /\b(screaming frog|spider)\b/i],
    ["WordPress", /\b(wordpress|wp|yoast|rank math)\b/i],
    ["Content Optimization", /\b(content optimization|seo copywriting|content strategy|article optimization)\b/i],
    ["Local SEO", /\b(local seo|google business profile|gmb|google my business|citations)\b/i],
    ["HTML/CSS Basics", /\b(html|css|basic html|html tags)\b/i],
    ["Schema Markup", /\b(schema|structured data|schema\.org|rich snippets)\b/i],
    ["Core Web Vitals", /\b(core web vitals|page speed|lighthouse|cwv)\b/i],
    ["Competitor Analysis", /\b(competitor analysis|competitive research|gap analysis)\b/i],
    ["Excel / Sheets Reporting", /\b(excel|google sheets|seo reporting|data analysis)\b/i],
  ];

  for (const [skillName, regex] of skillPatterns) {
    if (regex.test(lower)) {
      found.push(skillName);
    }
  }

  // Ensure minimum default skills if none found but text mentions general SEO
  if (found.length === 0) {
    found.push("Keyword Research", "On-Page SEO", "Google Search Console");
  }

  return Array.from(new Set(found));
}

export function calculateJobScores(job: Partial<Job>): ScoreBreakdown {
  const title = (job.title || "").toLowerCase();
  const desc = (job.description || "").toLowerCase();
  const location = (job.location || "").toLowerCase();
  const workMode = job.workMode || "On-site";
  const expMin = job.experienceMin ?? 0;
  const expMax = job.experienceMax ?? (expMin + 1);

  // 1. SEO Title Relevance (Max 25)
  let seoTitleScore = 0;
  if (
    title.includes("seo executive") ||
    title.includes("seo analyst") ||
    title.includes("search engine optimization") ||
    title.includes("technical seo")
  ) {
    seoTitleScore = 25;
  } else if (
    title.includes("seo") ||
    title.includes("link building") ||
    title.includes("local seo") ||
    title.includes("digital marketing executive") ||
    title.includes("digital marketing intern")
  ) {
    seoTitleScore = 22;
  } else if (
    title.includes("digital marketing") ||
    title.includes("growth marketing") ||
    title.includes("content & seo")
  ) {
    seoTitleScore = 18;
  } else if (desc.includes("seo") && desc.includes("search engine")) {
    seoTitleScore = 15;
  } else {
    seoTitleScore = 10;
  }

  // 2. Fresher Compatibility (Max 25)
  let fresherScore = 0;
  const isExplicitFresher =
    title.includes("fresher") ||
    title.includes("intern") ||
    title.includes("trainee") ||
    desc.includes("fresher") ||
    desc.includes("freshers welcome") ||
    desc.includes("0-1 year") ||
    desc.includes("0 to 1") ||
    desc.includes("no experience required") ||
    desc.includes("entry level");

  const isSenior =
    title.includes("senior") ||
    title.includes("lead") ||
    title.includes("manager") ||
    title.includes("head") ||
    expMin >= 3;

  if (isSenior) {
    fresherScore = 4;
  } else if (isExplicitFresher || expMin === 0) {
    if (expMax <= 1 || title.includes("intern") || title.includes("fresher")) {
      fresherScore = 25;
    } else if (expMax <= 2) {
      fresherScore = 21;
    } else {
      fresherScore = 16;
    }
  } else if (expMin === 1) {
    fresherScore = 18;
  } else if (expMin === 2) {
    fresherScore = 10;
  } else {
    fresherScore = 5;
  }

  // 3. Location Match (Max 15)
  let locationScore = 0;
  const isPune =
    location.includes("pune") ||
    location.includes("hinjawadi") ||
    location.includes("baner") ||
    location.includes("wakad") ||
    location.includes("kharadi") ||
    location.includes("viman nagar") ||
    location.includes("hadapsar") ||
    location.includes("magarpatta") ||
    location.includes("pimpri");

  if (isPune) {
    locationScore = 15;
  } else if (workMode === "Remote" || location.includes("remote")) {
    locationScore = 13;
  } else if (workMode === "Hybrid") {
    locationScore = 12;
  } else {
    locationScore = 8;
  }

  // 4. Skill Match (Max 15)
  const extractedSkills = job.skills && job.skills.length > 0 ? job.skills : extractSeoSkills(desc + " " + title);
  let skillScore = 0;
  if (extractedSkills.length >= 6) {
    skillScore = 15;
  } else if (extractedSkills.length >= 4) {
    skillScore = 13;
  } else if (extractedSkills.length >= 2) {
    skillScore = 10;
  } else {
    skillScore = 7;
  }

  // 5. Salary Availability (Max 5)
  let salaryScore = 0;
  if (job.salaryDisclosed && (job.salaryMin || 0) > 0) {
    salaryScore = 5;
  } else {
    salaryScore = 2;
  }

  // 6. Recency (Max 10)
  let recencyScore = 8;
  if (job.postedAt) {
    const postDate = new Date(job.postedAt).getTime();
    const now = Date.now();
    const hoursDiff = (now - postDate) / (1000 * 60 * 60);

    if (hoursDiff <= 24) {
      recencyScore = 10;
    } else if (hoursDiff <= 72) {
      recencyScore = 9;
    } else if (hoursDiff <= 168) {
      recencyScore = 7;
    } else if (hoursDiff <= 720) {
      recencyScore = 5;
    } else {
      recencyScore = 3;
    }
  }

  // 7. Application Availability (Max 5)
  let applicationScore = 0;
  if (job.applicationUrl && job.applicationUrl.length > 5) {
    applicationScore = 5;
  } else {
    applicationScore = 3;
  }

  const totalScore = Math.min(
    100,
    Math.round(
      seoTitleScore +
        fresherScore +
        locationScore +
        skillScore +
        salaryScore +
        recencyScore +
        applicationScore
    )
  );

  // Determine Can I Apply Status & Breakdown
  let canIApplyStatus: CanIApplyStatus = "STRONG_MATCH";
  let canIApplyExplanation = "";
  const whyYouMatch: string[] = [];
  const missingRequirements: string[] = [];

  if (expMin >= 2 || isSenior) {
    canIApplyStatus = "EXPERIENCE_REQUIRED";
    canIApplyExplanation = `This role requires prior full-time experience (${expMin}+ years) or specialized leadership. Freshers may apply if possessing exceptional portfolio proof or agency internship background.`;
  } else if (expMin === 1 || expMax >= 2) {
    canIApplyStatus = "POSSIBLE_MATCH";
    canIApplyExplanation = `Role prefers 0–2 years of experience or relevant internship background in SEO / digital marketing. Freshers with hands-on project knowledge or SEO certification can readily apply.`;
  } else {
    canIApplyStatus = "STRONG_MATCH";
    canIApplyExplanation = `Yes — this role actively welcomes freshers and 0–1 year candidates with basic SEO, keyword research, and Search Console knowledge. Direct training/mentorship is provided.`;
  }

  // Why you match bullet points
  if (expMin === 0) {
    whyYouMatch.push("Fresher / Entry-level candidates welcome (0-1 yrs)");
  }
  if (isPune) {
    whyYouMatch.push(`Located in ${job.locality || "Pune"} (Accessible to Pune candidates)`);
  } else if (workMode === "Remote") {
    whyYouMatch.push("100% Remote flexibility for Pune candidates");
  }

  if (seoTitleScore >= 20) {
    whyYouMatch.push("Direct core SEO / Search Engine Optimization specialization");
  }

  if (extractedSkills.includes("Keyword Research") || extractedSkills.includes("On-Page SEO")) {
    whyYouMatch.push("Foundational SEO skills match (On-page, Keyword Research)");
  }

  // Potential missing or growth skills
  const advancedSkills = ["Technical SEO", "Google Analytics 4 (GA4)", "Ahrefs", "SEMrush", "Screaming Frog", "Schema Markup"];
  for (const adv of advancedSkills) {
    if (!extractedSkills.includes(adv)) {
      missingRequirements.push(adv);
    }
    if (missingRequirements.length >= 3) break;
  }

  return {
    seoTitleScore,
    fresherScore,
    locationScore,
    skillScore,
    salaryScore,
    recencyScore,
    applicationScore,
    totalScore,
    canIApplyStatus,
    canIApplyExplanation,
    whyYouMatch,
    missingRequirements,
  };
}
