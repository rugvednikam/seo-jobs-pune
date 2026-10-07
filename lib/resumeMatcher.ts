import { CORE_SEO_SKILLS, extractSeoSkills } from "./scoring";
import { Job, ResumeAnalysisResult } from "./types";
import { jobStore } from "./storage";

export function analyzeResume(resumeText: string): ResumeAnalysisResult {
  const lower = resumeText.toLowerCase();

  // 1. Extract SEO & Digital Marketing Skills
  const extractedSkills = extractSeoSkills(resumeText);

  // Additional soft / technical tools detection
  const toolChecklist: [string, RegExp][] = [
    ["Google Search Console", /search console|gsc/i],
    ["Google Analytics 4 (GA4)", /analytics|ga4|google analytics/i],
    ["Keyword Research", /keyword research|search volume|kw research/i],
    ["On-Page SEO", /on-page|on page|meta tags|content optimization/i],
    ["Off-Page SEO", /off-page|off page|backlinks|outreach/i],
    ["Technical SEO", /technical seo|crawl|robots\.txt|sitemap|indexing/i],
    ["Ahrefs", /ahrefs/i],
    ["SEMrush", /semrush/i],
    ["Screaming Frog", /screaming frog|spider/i],
    ["WordPress", /wordpress|wp/i],
    ["Link Building", /link building|guest post/i],
    ["Local SEO", /local seo|google my business|gmb|google business profile/i],
    ["Excel / Sheets Reporting", /excel|sheets|pivot|vlookup/i],
    ["HTML/CSS Basics", /html|css/i],
    ["Schema Markup", /schema|json-ld|structured data/i],
  ];

  for (const [name, regex] of toolChecklist) {
    if (regex.test(lower) && !extractedSkills.includes(name)) {
      extractedSkills.push(name);
    }
  }

  // 2. Extract Candidate Experience estimate
  let extractedExperience = 0;
  if (/(\b[1-9]\b|\b\d+\b)\+?\s*years?\s*(of)?\s*exp/i.test(lower)) {
    const match = lower.match(/(\b\d+\b)\+?\s*years?\s*(of)?\s*exp/i);
    if (match && match[1]) {
      extractedExperience = parseInt(match[1], 10);
    }
  } else if (/fresher|intern|recent graduate|fresher looking/i.test(lower)) {
    extractedExperience = 0;
  }

  // 3. Match against all active Pune SEO jobs
  const allJobs = jobStore.getJobs().filter((j) => j.status === "active");

  const matchedJobs = allJobs.map((job) => {
    const jobSkills = job.skills || [];
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    for (const s of jobSkills) {
      if (
        extractedSkills.some(
          (candSkill) =>
            candSkill.toLowerCase() === s.toLowerCase() ||
            candSkill.toLowerCase().includes(s.toLowerCase()) ||
            s.toLowerCase().includes(candSkill.toLowerCase())
        )
      ) {
        matchedSkills.push(s);
      } else {
        missingSkills.push(s);
      }
    }

    // Skill match proportion (60% weight)
    const skillRatio = jobSkills.length > 0 ? matchedSkills.length / jobSkills.length : 0.5;
    const skillScorePart = skillRatio * 60;

    // Experience compatibility (25% weight)
    let expScorePart = 25;
    if (job.experienceMin > extractedExperience) {
      const gap = job.experienceMin - extractedExperience;
      expScorePart = Math.max(5, 25 - gap * 10);
    } else if (job.fresherFriendly && extractedExperience === 0) {
      expScorePart = 25;
    }

    // Fresher bonus (15% weight)
    const bonusPart = job.fresherFriendly ? 15 : 10;

    const matchScore = Math.min(99, Math.max(35, Math.round(skillScorePart + expScorePart + bonusPart)));

    const strengths: string[] = [];
    if (matchedSkills.length >= 3) {
      strengths.push(`Matches ${matchedSkills.length} key required SEO tools and competencies`);
    }
    if (job.fresherFriendly && extractedExperience <= 1) {
      strengths.push("Job experience criteria is 100% matched for fresher/entry-level profile");
    }
    if (job.location.includes("Pune") || job.workMode === "Remote") {
      strengths.push(`High location compatibility for Pune (${job.locality || "Pune"})`);
    }

    const improvements: string[] = [];
    if (missingSkills.length > 0) {
      improvements.push(`Review ${missingSkills.slice(0, 2).join(" & ")} concepts prior to technical interview`);
    }

    return {
      job,
      matchScore,
      matchedSkills,
      missingSkills,
      strengths,
      improvements,
    };
  });

  // Sort by highest match score
  matchedJobs.sort((a, b) => b.matchScore - a.matchScore);

  return {
    extractedExperience,
    extractedSkills,
    matchedJobs,
    allFoundSkills: extractedSkills,
  };
}
