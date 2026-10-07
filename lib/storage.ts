import { Job, Company, SavedJob, JobAlert, JobSourceStatus, IngestionLog, SearchFilters, SearchResult } from "./types";
import { calculateJobScores, extractSeoSkills } from "./scoring";

// Pre-seeded verified Pune Companies
export const INITIAL_COMPANIES: Company[] = [
  {
    id: "merkle-sokrati",
    name: "Merkle Sokrati",
    slug: "merkle-sokrati",
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=128&auto=format&fit=crop&q=80",
    website: "https://www.sokrati.com",
    location: "Viman Nagar, Pune",
    about: "Merkle Sokrati is India's premier data-driven digital agency and search performance leader, operating with over 1,000+ digital experts in Pune.",
    industry: "Digital Marketing & Performance Media",
    jobsCount: 4,
    avgSalaryMin: 22000,
    avgSalaryMax: 35000,
    openPositions: ["SEO Executive Fresher", "Organic Performance Analyst", "SEO Content Strategist"],
    verified: true,
  },
  {
    id: "np-digital-india",
    name: "Neil Patel Digital India (NP Digital)",
    slug: "neil-patel-digital-india",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=128&auto=format&fit=crop&q=80",
    website: "https://npdigital.com/in",
    location: "Kalyani Nagar, Pune",
    about: "NP Digital is a global search & performance agency co-founded by Neil Patel, helping fast-growth and enterprise brands dominate search engines.",
    industry: "Search Engine Optimization & Global Content",
    jobsCount: 3,
    avgSalaryMin: 25000,
    avgSalaryMax: 40000,
    openPositions: ["SEO Analyst Trainee", "Technical SEO Specialist", "Digital PR Associate"],
    verified: true,
  },
  {
    id: "brainvire",
    name: "Brainvire Infotech",
    slug: "brainvire-infotech",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&auto=format&fit=crop&q=80",
    website: "https://www.brainvire.com",
    location: "Baner, Pune",
    about: "Brainvire is a top-tier digital transformation and full-service ecommerce SEO consulting firm in Baner, Pune.",
    industry: "IT Services & Digital Marketing",
    jobsCount: 3,
    avgSalaryMin: 20000,
    avgSalaryMax: 32000,
    openPositions: ["Junior SEO Analyst", "E-commerce SEO Executive"],
    verified: true,
  },
  {
    id: "srv-media",
    name: "SRV Media Pvt Ltd",
    slug: "srv-media",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&auto=format&fit=crop&q=80",
    website: "https://www.srvmedia.com",
    location: "Kharadi, Pune",
    about: "SRV Media is a premier full-service digital marketing agency founded by Symbiosis alumni, serving higher-ed, health, and enterprise clients.",
    industry: "Digital Marketing & PR Agency",
    jobsCount: 3,
    avgSalaryMin: 18000,
    avgSalaryMax: 28000,
    openPositions: ["Off-Page SEO Executive", "SEO Content Writer", "Search Associate"],
    verified: true,
  },
  {
    id: "ikf-pune",
    name: "IKnowledgeFactory (IKF)",
    slug: "iknowledgefactory",
    logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=128&auto=format&fit=crop&q=80",
    website: "https://www.ikf.co.in",
    location: "Shivajinagar, Pune",
    about: "With 20+ years of digital marketing authority in Pune, IKF has mentored hundreds of successful digital marketing and SEO professionals.",
    industry: "Integrated Digital Marketing Agency",
    jobsCount: 2,
    avgSalaryMin: 15000,
    avgSalaryMax: 24000,
    openPositions: ["SEO & Digital Marketing Intern", "Junior SEO Executive"],
    verified: true,
  },
  {
    id: "dimakh-consultants",
    name: "Dimakh Consultants",
    slug: "dimakh-consultants",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=128&auto=format&fit=crop&q=80",
    website: "https://www.dimakhconsultants.com",
    location: "Koregaon Park, Pune",
    about: "A trusted Pune-based web hosting and digital marketing consultancy founded in 1998, with specialized focus on organic search.",
    industry: "Web & Digital Consulting",
    jobsCount: 2,
    avgSalaryMin: 16000,
    avgSalaryMax: 25000,
    openPositions: ["Digital Marketing Trainee (SEO Specialization)"],
    verified: true,
  },
  {
    id: "pubmatic",
    name: "PubMatic",
    slug: "pubmatic",
    logo: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=128&auto=format&fit=crop&q=80",
    website: "https://pubmatic.com",
    location: "Hinjawadi Phase 1, Pune",
    about: "PubMatic is an independent technology company maximizing customer value in digital advertising with its global R&D center in Pune.",
    industry: "AdTech & Digital Web Engineering",
    jobsCount: 2,
    avgSalaryMin: 35000,
    avgSalaryMax: 50000,
    openPositions: ["Search Engine Optimization Specialist", "Web Analytics Associate"],
    verified: true,
  },
  {
    id: "brandloom",
    name: "BrandLoom Digital",
    slug: "brandloom-digital",
    logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=128&auto=format&fit=crop&q=80",
    website: "https://www.brandloom.com",
    location: "Magarpatta, Hadapsar, Pune",
    about: "BrandLoom is a brand consulting and ROI-driven digital agency helping local brands establish market dominance.",
    industry: "Brand Consulting & Local SEO",
    jobsCount: 2,
    avgSalaryMin: 17000,
    avgSalaryMax: 26000,
    openPositions: ["Local SEO Specialist", "Digital Marketing Executive"],
    verified: true,
  }
];

export const INITIAL_SOURCES: JobSourceStatus[] = [
  {
    id: "naukri",
    name: "Naukri Pune SEO Feed",
    type: "Public Job Search Feed",
    enabled: true,
    status: "operational",
    lastRun: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    jobsFetched: 48,
    jobsActive: 34,
    duplicatesConsolidated: 14,
    errorsCount: 0,
    rateLimitInfo: "60 req/hr (Compliant)",
  },
  {
    id: "linkedin",
    name: "LinkedIn Pune Jobs Public Feed",
    type: "Public API",
    enabled: true,
    status: "operational",
    lastRun: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    jobsFetched: 38,
    jobsActive: 29,
    duplicatesConsolidated: 9,
    errorsCount: 0,
    rateLimitInfo: "40 req/hr (Compliant)",
  },
  {
    id: "internshala",
    name: "Internshala Pune SEO Internships",
    type: "Public API",
    enabled: true,
    status: "operational",
    lastRun: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    jobsFetched: 24,
    jobsActive: 21,
    duplicatesConsolidated: 3,
    errorsCount: 0,
    rateLimitInfo: "30 req/hr (Compliant)",
  },
  {
    id: "indeed",
    name: "Indeed Pune RSS / Public Search",
    type: "RSS / Job Feed",
    enabled: true,
    status: "operational",
    lastRun: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    jobsFetched: 32,
    jobsActive: 24,
    duplicatesConsolidated: 8,
    errorsCount: 0,
    rateLimitInfo: "50 req/hr (Compliant)",
  },
  {
    id: "foundit",
    name: "Foundit Pune SEO Feed",
    type: "Public API",
    enabled: true,
    status: "operational",
    lastRun: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    jobsFetched: 20,
    jobsActive: 16,
    duplicatesConsolidated: 4,
    errorsCount: 0,
    rateLimitInfo: "30 req/hr (Compliant)",
  },
  {
    id: "company_careers",
    name: "Direct Pune Agency & Tech Careers",
    type: "Company Career Crawler",
    enabled: true,
    status: "operational",
    lastRun: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    jobsFetched: 18,
    jobsActive: 18,
    duplicatesConsolidated: 0,
    errorsCount: 0,
    rateLimitInfo: "20 domains / day (Compliant)",
  }
];

export const INITIAL_LOGS: IngestionLog[] = [
  {
    id: "log-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    source: "Direct Pune Agency & Tech Careers",
    status: "success",
    message: "Discovered 4 new listings from verified Pune career portals. Normalized and deduplicated.",
    jobsFound: 4,
    newJobsAdded: 3,
  },
  {
    id: "log-2",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    source: "Naukri Pune SEO Feed",
    status: "success",
    message: "Ingested 12 Pune fresher SEO roles. Consolidated 4 duplicates.",
    jobsFound: 12,
    newJobsAdded: 8,
  },
  {
    id: "log-3",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    source: "LinkedIn Pune Jobs Public Feed",
    status: "success",
    message: "Synced LinkedIn Pune entries for 'SEO Trainee' & 'Junior SEO'.",
    jobsFound: 8,
    newJobsAdded: 5,
  }
];

// Helper to create a comprehensive initial verified job dataset
function buildInitialJobs(): Job[] {
  const rawDefinitions = [
    {
      id: "pune-seo-001",
      slug: "seo-executive-fresher-merkle-sokrati-viman-nagar-pune",
      title: "SEO Executive Fresher",
      company: "Merkle Sokrati",
      companyId: "merkle-sokrati",
      companyLogo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=128&auto=format&fit=crop&q=80",
      companyWebsite: "https://www.sokrati.com",
      companyRating: 4.3,
      companyReviewsCount: 340,
      description: "Merkle Sokrati is looking for an analytical and ambitious SEO Executive Fresher to join its organic search marketing team in Viman Nagar, Pune. You will be directly mentored by Senior SEO Strategists while working on live enterprise campaigns.",
      responsibilities: [
        "Perform in-depth keyword research and competitor SERP analysis using Google Keyword Planner, Ahrefs, and SEMrush",
        "Craft and implement on-page optimizations: meta titles, descriptions, H1/H2 heading hierarchy, image ALT tags, and internal link silos",
        "Monitor Google Search Console for crawl errors, indexing status, XML sitemaps, and core web vitals",
        "Collaborate with content creators to formulate high-intent search content briefs and verify keyword density",
        "Prepare monthly organic traffic, keyword ranking, and conversion reports using Google Analytics 4 (GA4) and Looker Studio"
      ],
      requirementsMandatory: [
        "Bachelor's degree (BCA, B.Tech, BCS, BBA, B.Com, or Any Graduate) or recognized SEO course certification",
        "0 to 1 years experience (Freshers with strong foundational SEO knowledge are highly encouraged)",
        "Clear understanding of search engine ranking factors, crawling, and indexing",
        "Familiarity with Google Search Console and Google Analytics",
        "Good written and verbal communication in English"
      ],
      requirementsPreferred: [
        "Basic HTML and CSS understanding (meta tags, anchor tags, robots directives)",
        "Familiarity with WordPress CMS or Shopify",
        "HubSpot or Google Digital Garage Certification"
      ],
      education: "BCA / BCS / B.Tech / BBA / Any Graduate",
      location: "Viman Nagar, Pune",
      city: "Pune" as const,
      locality: "Viman Nagar",
      experienceMin: 0,
      experienceMax: 1,
      experienceLabel: "Fresher (0-1 yrs)",
      salaryMin: 18000,
      salaryMax: 28000,
      salaryCurrency: "INR" as const,
      salaryPeriod: "month" as const,
      salaryDisclosed: true,
      employmentType: "Full-time" as const,
      workMode: "Hybrid" as const,
      source: "Naukri",
      sourceUrl: "https://www.naukri.com/job-listings-seo-executive-fresher-merkle-sokrati-pune",
      applicationUrl: "https://www.naukri.com/job-listings-seo-executive-fresher-merkle-sokrati-pune",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20).toISOString(),
      skills: ["Keyword Research", "On-Page SEO", "Google Search Console", "Google Analytics 4 (GA4)", "Excel / Sheets Reporting", "Content Optimization", "Technical SEO"],
      fresherFriendly: true,
      consolidatedSources: [
        { source: "Naukri", url: "https://www.naukri.com/job-listings-seo-executive-fresher-merkle-sokrati-pune", lastChecked: "1 hour ago", isPrimary: true },
        { source: "LinkedIn", url: "https://www.linkedin.com/jobs/view/seo-executive-merkle-pune", lastChecked: "3 hours ago" },
        { source: "Indeed", url: "https://in.indeed.com/viewjob?jk=sokrati-seo-pune", lastChecked: "6 hours ago" }
      ],
      status: "active" as const,
      verified: true,
      lastVerifiedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "pune-seo-002",
      slug: "seo-analyst-trainee-np-digital-kalyani-nagar-pune",
      title: "SEO Analyst Trainee",
      company: "Neil Patel Digital India (NP Digital)",
      companyId: "neil-patel-digital-india",
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=128&auto=format&fit=crop&q=80",
      companyWebsite: "https://npdigital.com/in",
      companyRating: 4.5,
      companyReviewsCount: 210,
      description: "Neil Patel Digital India is hiring ambitious SEO Analyst Trainees for its Kalyani Nagar Pune operations. If you follow modern search trends, understand searcher intent, and want to learn advanced search optimization from global experts, apply now!",
      responsibilities: [
        "Analyze organic search queries and build clustered keyword taxonomies",
        "Execute technical website crawls using Screaming Frog and identify broken redirects, 404s, and duplicate canonicals",
        "Work with editorial teams on optimizing long-form articles for AI search engines (Google AI Overviews, Perplexity)",
        "Audit competitor backlink profiles and identify high-authority guest posting opportunities",
        "Track daily and weekly organic search KPI movement across international search engines"
      ],
      requirementsMandatory: [
        "2024, 2025, or 2026 Batch Freshers / 0-1 years in digital marketing",
        "Knowledge of fundamental SEO mechanics: Crawling, Indexing, Keyword Intent, Page Experience",
        "Comfortable with Google Sheets / Excel formulas (VLOOKUP, Pivot tables)",
        "Passionate about technology, web trends, and AI in search"
      ],
      requirementsPreferred: [
        "Google Analytics or HubSpot Inbound/SEO certification",
        "Personal website, blog, or WordPress testing ground"
      ],
      education: "B.Tech / B.E / BCA / BBA / Mass Communication",
      location: "Kalyani Nagar, Pune",
      city: "Pune" as const,
      locality: "Kalyani Nagar",
      experienceMin: 0,
      experienceMax: 1,
      experienceLabel: "Fresher (0-1 yrs)",
      salaryMin: 22000,
      salaryMax: 32000,
      salaryCurrency: "INR" as const,
      salaryPeriod: "month" as const,
      salaryDisclosed: true,
      employmentType: "Full-time" as const,
      workMode: "Hybrid" as const,
      source: "LinkedIn",
      sourceUrl: "https://www.linkedin.com/jobs/view/seo-analyst-trainee-np-digital-pune",
      applicationUrl: "https://www.linkedin.com/jobs/view/seo-analyst-trainee-np-digital-pune",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(),
      skills: ["Keyword Research", "On-Page SEO", "Google Search Console", "Google Analytics 4 (GA4)", "Technical SEO", "Screaming Frog", "Ahrefs", "Competitor Analysis"],
      fresherFriendly: true,
      consolidatedSources: [
        { source: "LinkedIn", url: "https://www.linkedin.com/jobs/view/seo-analyst-trainee-np-digital-pune", lastChecked: "30 mins ago", isPrimary: true },
        { source: "Company Careers", url: "https://npdigital.com/careers/seo-trainee-pune", lastChecked: "2 hours ago" }
      ],
      status: "active" as const,
      verified: true,
      lastVerifiedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "pune-seo-003",
      slug: "junior-seo-analyst-brainvire-baner-pune",
      title: "Junior SEO Analyst",
      company: "Brainvire Infotech",
      companyId: "brainvire",
      companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&auto=format&fit=crop&q=80",
      companyWebsite: "https://www.brainvire.com",
      companyRating: 4.1,
      companyReviewsCount: 520,
      description: "Brainvire is looking for a Junior SEO Analyst at our Baner, Pune center. This role focuses on ecommerce SEO, Shopify/Magento optimization, and technical performance for retail brands in US and India.",
      responsibilities: [
        "Audit product categories, collection pages, and faceted navigation for SEO crawl traps",
        "Implement schema.org markup (Product, BreadcrumbList, Organization, FAQ)",
        "Conduct competitive backlink gap analysis using SEMrush and Ahrefs",
        "Manage keyword ranking dashboards and troubleshoot sudden ranking fluctuations"
      ],
      requirementsMandatory: [
        "0 to 1 years experience or completed SEO training course",
        "Understanding of technical SEO factors (robots.txt, sitemaps, canonicals, URL structure)",
        "Proficiency with Google Search Console and Google Analytics",
        "Residing in or willing to work at Baner, Pune office"
      ],
      requirementsPreferred: [
        "Basic knowledge of eCommerce platforms (Shopify, WooCommerce, Magento)",
        "Basic understanding of Schema markup and HTML"
      ],
      education: "Graduate in Computer Science / IT / Marketing",
      location: "Baner, Pune",
      city: "Pune" as const,
      locality: "Baner",
      experienceMin: 0,
      experienceMax: 1,
      experienceLabel: "Fresher & 0-1 yrs",
      salaryMin: 20000,
      salaryMax: 30000,
      salaryCurrency: "INR" as const,
      salaryPeriod: "month" as const,
      salaryDisclosed: true,
      employmentType: "Full-time" as const,
      workMode: "On-site" as const,
      source: "Naukri",
      sourceUrl: "https://www.naukri.com/job-listings-junior-seo-analyst-brainvire-pune",
      applicationUrl: "https://www.naukri.com/job-listings-junior-seo-analyst-brainvire-pune",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18).toISOString(),
      skills: ["Keyword Research", "Technical SEO", "Ahrefs", "SEMrush", "Schema Markup", "WordPress", "Google Search Console"],
      fresherFriendly: true,
      consolidatedSources: [
        { source: "Naukri", url: "https://www.naukri.com/job-listings-junior-seo-analyst-brainvire-pune", lastChecked: "2 hours ago", isPrimary: true },
        { source: "Indeed", url: "https://in.indeed.com/viewjob?jk=brainvire-seo-pune", lastChecked: "4 hours ago" }
      ],
      status: "active" as const,
      verified: true,
      lastVerifiedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "pune-seo-004",
      slug: "seo-digital-marketing-intern-ikf-shivajinagar-pune",
      title: "SEO & Digital Marketing Intern",
      company: "IKnowledgeFactory (IKF)",
      companyId: "ikf-pune",
      companyLogo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=128&auto=format&fit=crop&q=80",
      companyWebsite: "https://www.ikf.co.in",
      companyRating: 4.4,
      companyReviewsCount: 180,
      description: "IKF Pune (Shivajinagar) offers an intensive 3 to 6-month hands-on SEO Internship with high Pre-Placement Offer (PPO) conversion rates to full-time SEO Executive positions. You will work on Pune and international business accounts.",
      responsibilities: [
        "Learn and execute on-page SEO checklists across customer websites",
        "Conduct keyword discovery and map search intent for local Pune businesses",
        "Optimize Google Business Profiles, create citations, and audit local business listings",
        "Assist senior account managers with monthly client reports and presentation decks"
      ],
      requirementsMandatory: [
        "College freshers, final year students, or recent graduates passionate about SEO",
        "Good English writing ability for meta tags and content briefs",
        "Eagerness to learn search engine algorithms and ranking factors",
        "Available for in-person internship at Shivajinagar, Pune"
      ],
      requirementsPreferred: [
        "Prior coursework in digital marketing or social media marketing",
        "Basic hands-on experience with Canva, WordPress, or Google Sheets"
      ],
      education: "Any Degree / Diploma / Student",
      location: "Shivajinagar, Pune",
      city: "Pune" as const,
      locality: "Shivajinagar",
      experienceMin: 0,
      experienceMax: 0,
      experienceLabel: "Fresher / Intern (0 yrs)",
      salaryMin: 12000,
      salaryMax: 18000,
      salaryCurrency: "INR" as const,
      salaryPeriod: "month" as const,
      salaryDisclosed: true,
      employmentType: "Internship" as const,
      workMode: "On-site" as const,
      source: "Internshala",
      sourceUrl: "https://internshala.com/internship/detail/seo-internship-in-pune-at-ikf",
      applicationUrl: "https://internshala.com/internship/detail/seo-internship-in-pune-at-ikf",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
      skills: ["On-Page SEO", "Keyword Research", "Local SEO", "Google Search Console", "Content Optimization", "Excel / Sheets Reporting"],
      fresherFriendly: true,
      consolidatedSources: [
        { source: "Internshala", url: "https://internshala.com/internship/detail/seo-internship-in-pune-at-ikf", lastChecked: "45 mins ago", isPrimary: true },
        { source: "Company Careers", url: "https://www.ikf.co.in/careers", lastChecked: "2 hours ago" }
      ],
      status: "active" as const,
      verified: true,
      lastVerifiedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "pune-seo-005",
      slug: "remote-junior-seo-analyst-growthspurt-pune",
      title: "Remote Junior SEO Analyst",
      company: "GrowthSpurt Marketing",
      companyId: "growthspurt-marketing",
      companyLogo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=128&auto=format&fit=crop&q=80",
      companyWebsite: "https://growthspurt.agency",
      companyRating: 4.6,
      companyReviewsCount: 95,
      description: "100% remote SEO role for candidates in Pune & Maharashtra. We are an international search consultancy providing technical auditing, programatic SEO, and content optimization for SaaS brands.",
      responsibilities: [
        "Audit client websites for crawlability errors, 404s, redirect loops, and core web vitals bottlenecks",
        "Build keyword clustering models and semantic search briefs using Google Sheets and AI tooling",
        "Set up and monitor Google Search Console properties, submit sitemaps, and analyze index coverage reports",
        "Track search visibility and assist in writing technical action items for client engineering teams"
      ],
      requirementsMandatory: [
        "Fresher or 0–1 year experience with solid grasp of search engine fundamentals",
        "Fluent written English communication skills",
        "Comfortable working remotely with high-speed internet in Pune",
        "Proficiency with Google Sheets / Excel"
      ],
      requirementsPreferred: [
        "Experience running Screaming Frog (free/paid) crawls",
        "Basic familiarity with GA4 and Looker Studio"
      ],
      education: "Any Graduate",
      location: "Remote (Pune Candidates Eligible)",
      city: "Remote" as const,
      locality: "Remote",
      experienceMin: 0,
      experienceMax: 1,
      experienceLabel: "Fresher & 0-1 yrs",
      salaryMin: 25000,
      salaryMax: 35000,
      salaryCurrency: "INR" as const,
      salaryPeriod: "month" as const,
      salaryDisclosed: true,
      employmentType: "Full-time" as const,
      workMode: "Remote" as const,
      source: "Company Careers",
      sourceUrl: "https://growthspurt.agency/careers/apply-junior-seo",
      applicationUrl: "https://growthspurt.agency/careers/apply-junior-seo",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      skills: ["Technical SEO", "Keyword Research", "Google Search Console", "Google Analytics 4 (GA4)", "Screaming Frog", "Content Optimization", "Core Web Vitals"],
      fresherFriendly: true,
      consolidatedSources: [
        { source: "Company Careers", url: "https://growthspurt.agency/careers/apply-junior-seo", lastChecked: "20 mins ago", isPrimary: true },
        { source: "LinkedIn", url: "https://www.linkedin.com/jobs/view/remote-junior-seo-growthspurt", lastChecked: "1 hour ago" }
      ],
      status: "active" as const,
      verified: true,
      lastVerifiedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "pune-seo-006",
      slug: "off-page-seo-executive-srv-media-kharadi-pune",
      title: "Off-Page SEO Executive / Link Building",
      company: "SRV Media Pvt Ltd",
      companyId: "srv-media",
      companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&auto=format&fit=crop&q=80",
      companyWebsite: "https://www.srvmedia.com",
      companyRating: 4.2,
      companyReviewsCount: 310,
      description: "SRV Media is looking for an enthusiastic Off-Page SEO Executive to execute ethical outreach, high DA/DR guest posting, and digital PR campaigns at our Kharadi, Pune office.",
      responsibilities: [
        "Identify high quality niche websites, blogs, and industry directories for outreach",
        "Draft tailored outreach emails to webmasters and editors for guest posting and brand mentions",
        "Monitor backlink health, ensure proper anchor text distribution, and disavow spam links",
        "Collaborate with content writers on developing link-worthy assets and infographics"
      ],
      requirementsMandatory: [
        "0 to 1 years experience or digital marketing training",
        "Good communication and persuasive email outreach skills",
        "Understanding of Domain Authority (DA), Page Authority (PA), and dofollow/nofollow attributes",
        "Living in Pune (Kharadi / Hadapsar / Viman Nagar area preferred)"
      ],
      requirementsPreferred: [
        "Familiarity with Ahrefs or SEMrush Backlink Audit tools",
        "Experience with Excel/Sheets tracking"
      ],
      education: "Graduate in any discipline",
      location: "Kharadi, Pune",
      city: "Pune" as const,
      locality: "Kharadi",
      experienceMin: 0,
      experienceMax: 1,
      experienceLabel: "Fresher (0-1 yrs)",
      salaryMin: 16000,
      salaryMax: 24000,
      salaryCurrency: "INR" as const,
      salaryPeriod: "month" as const,
      salaryDisclosed: true,
      employmentType: "Full-time" as const,
      workMode: "Hybrid" as const,
      source: "Naukri",
      sourceUrl: "https://www.naukri.com/job-listings-off-page-seo-srv-media-pune",
      applicationUrl: "https://www.naukri.com/job-listings-off-page-seo-srv-media-pune",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
      skills: ["Off-Page SEO", "Link Building", "SEMrush", "Content Optimization", "Excel / Sheets Reporting", "Competitor Analysis"],
      fresherFriendly: true,
      consolidatedSources: [
        { source: "Naukri", url: "https://www.naukri.com/job-listings-off-page-seo-srv-media-pune", lastChecked: "4 hours ago", isPrimary: true },
        { source: "Foundit", url: "https://www.foundit.in/job/srv-media-offpage-pune", lastChecked: "8 hours ago" }
      ],
      status: "active" as const,
      verified: true,
      lastVerifiedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "pune-seo-007",
      slug: "local-seo-specialist-brandloom-magarpatta-pune",
      title: "Local SEO Specialist",
      company: "BrandLoom Digital",
      companyId: "brandloom",
      companyLogo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=128&auto=format&fit=crop&q=80",
      companyWebsite: "https://www.brandloom.com",
      companyRating: 4.4,
      companyReviewsCount: 140,
      description: "BrandLoom is hiring a Local SEO Executive to manage local organic presence, Google Business Profiles (GBP), NAP consistency, and local schema markup for multi-location healthcare and retail clients.",
      responsibilities: [
        "Manage, optimize, and update Google Business Profile listings across multiple Pune & Mumbai locations",
        "Build high-quality local business citations on Justdial, Sulekha, IndiaMART, and industry directories",
        "Implement LocalBusiness Schema markup and localized city landing pages",
        "Track local map pack rankings and optimize review response workflows"
      ],
      requirementsMandatory: [
        "Fresher or 0–1 year in local search optimization",
        "Understanding of local ranking factors (Proximity, Prominence, Relevance)",
        "Attention to detail with business address and contact consistency",
        "Based in Pune (Accessible to Magarpatta City)"
      ],
      requirementsPreferred: [
        "Experience with Google Search Console and local SEO tools",
        "Basic photo editing in Canva for GBP post updates"
      ],
      education: "Any Graduate",
      location: "Magarpatta City, Hadapsar, Pune",
      city: "Pune" as const,
      locality: "Magarpatta",
      experienceMin: 0,
      experienceMax: 1,
      experienceLabel: "Fresher & 0-1 yrs",
      salaryMin: 17000,
      salaryMax: 25000,
      salaryCurrency: "INR" as const,
      salaryPeriod: "month" as const,
      salaryDisclosed: true,
      employmentType: "Full-time" as const,
      workMode: "On-site" as const,
      source: "Indeed",
      sourceUrl: "https://in.indeed.com/viewjob?jk=brandloom-local-seo-pune",
      applicationUrl: "https://in.indeed.com/viewjob?jk=brandloom-local-seo-pune",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 22).toISOString(),
      skills: ["Local SEO", "Keyword Research", "On-Page SEO", "Google Search Console", "Schema Markup", "Excel / Sheets Reporting"],
      fresherFriendly: true,
      consolidatedSources: [
        { source: "Indeed", url: "https://in.indeed.com/viewjob?jk=brandloom-local-seo-pune", lastChecked: "1 hour ago", isPrimary: true },
        { source: "Naukri", url: "https://www.naukri.com/job-listings-local-seo-brandloom-pune", lastChecked: "3 hours ago" }
      ],
      status: "active" as const,
      verified: true,
      lastVerifiedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "pune-seo-008",
      slug: "content-seo-executive-upscale-wakad-pune",
      title: "Content & SEO Executive",
      company: "Upscale SEO Solutions",
      companyId: "upscale-seo",
      companyLogo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=128&auto=format&fit=crop&q=80",
      companyWebsite: "https://upscaleseo.com",
      companyRating: 4.3,
      companyReviewsCount: 80,
      description: "Upscale SEO Solutions (Wakad, Pune) is looking for a Content & SEO Executive who can craft search-friendly articles, optimize WordPress pages, and implement on-page SEO best practices.",
      responsibilities: [
        "Conduct keyword clustering and search intent analysis for client blogs",
        "Write and optimize engaging meta tags, header outlines, and FAQ schemas",
        "Upload and format articles on WordPress CMS with Yoast / RankMath plugins",
        "Audit existing articles for search decay and refresh with updated statistics and keywords"
      ],
      requirementsMandatory: [
        "0 to 1 years experience or strong content writing portfolio with SEO knowledge",
        "Proficient English writing and proofreading skills",
        "Comfortable navigating WordPress block editor",
        "Pune resident (Wakad / Hinjawadi / Pimpri vicinity preferred)"
      ],
      requirementsPreferred: [
        "Basic understanding of Google Search Console performance metrics",
        "Knowledge of internal linking strategies"
      ],
      education: "BA / MA in English, Mass Comm, Journalism, or Any Graduate",
      location: "Wakad, Pune",
      city: "Pune" as const,
      locality: "Wakad",
      experienceMin: 0,
      experienceMax: 1,
      experienceLabel: "Fresher & 0-1 yrs",
      salaryMin: 18000,
      salaryMax: 26000,
      salaryCurrency: "INR" as const,
      salaryPeriod: "month" as const,
      salaryDisclosed: true,
      employmentType: "Full-time" as const,
      workMode: "Hybrid" as const,
      source: "Indeed",
      sourceUrl: "https://in.indeed.com/viewjob?jk=upscale-content-seo-pune",
      applicationUrl: "https://in.indeed.com/viewjob?jk=upscale-content-seo-pune",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 16).toISOString(),
      skills: ["Content Optimization", "Keyword Research", "On-Page SEO", "WordPress", "Google Search Console", "Competitor Analysis"],
      fresherFriendly: true,
      consolidatedSources: [
        { source: "Indeed", url: "https://in.indeed.com/viewjob?jk=upscale-content-seo-pune", lastChecked: "2 hours ago", isPrimary: true },
        { source: "LinkedIn", url: "https://www.linkedin.com/jobs/view/content-seo-upscale-pune", lastChecked: "5 hours ago" }
      ],
      status: "active" as const,
      verified: true,
      lastVerifiedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "pune-seo-009",
      slug: "search-engine-optimization-specialist-pubmatic-hinjawadi-pune",
      title: "Search Engine Optimization Specialist",
      company: "PubMatic",
      companyId: "pubmatic",
      companyLogo: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=128&auto=format&fit=crop&q=80",
      companyWebsite: "https://pubmatic.com",
      companyRating: 4.5,
      companyReviewsCount: 890,
      description: "PubMatic Pune is hiring an SEO Specialist for its Hinjawadi Phase 1 campus. This position oversees technical architecture, international hreflang configuration, core web vitals, and structured data implementation across global sites.",
      responsibilities: [
        "Lead technical audits across global web assets using Screaming Frog and Botify",
        "Collaborate with frontend engineers to improve PageSpeed Lighthouse metrics and Core Web Vitals",
        "Deploy advanced Schema.org JSON-LD microdata across product and resource pages",
        "Analyze enterprise search traffic trends across US, EMEA, and APAC markets"
      ],
      requirementsMandatory: [
        "1 to 2 years experience in Technical SEO or Web Development",
        "Strong understanding of JavaScript SEO, server response codes, and canonical routing",
        "Hands-on expertise with Google Search Console, Screaming Frog, and Ahrefs"
      ],
      requirementsPreferred: [
        "B.Tech/B.E in Computer Science / IT or equivalent web development background",
        "Knowledge of Next.js / React SSR indexing"
      ],
      education: "B.Tech / B.E in CS/IT / MCA",
      location: "Hinjawadi Phase 1, Pune",
      city: "Pune" as const,
      locality: "Hinjawadi",
      experienceMin: 1,
      experienceMax: 2,
      experienceLabel: "1-2 years",
      salaryMin: 35000,
      salaryMax: 50000,
      salaryCurrency: "INR" as const,
      salaryPeriod: "month" as const,
      salaryDisclosed: true,
      employmentType: "Full-time" as const,
      workMode: "Hybrid" as const,
      source: "LinkedIn",
      sourceUrl: "https://www.linkedin.com/jobs/view/seo-specialist-pubmatic-pune",
      applicationUrl: "https://www.linkedin.com/jobs/view/seo-specialist-pubmatic-pune",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25).toISOString(),
      skills: ["Technical SEO", "Schema Markup", "Core Web Vitals", "Google Search Console", "Screaming Frog", "HTML/CSS Basics", "Google Analytics 4 (GA4)"],
      fresherFriendly: false,
      consolidatedSources: [
        { source: "LinkedIn", url: "https://www.linkedin.com/jobs/view/seo-specialist-pubmatic-pune", lastChecked: "1 hour ago", isPrimary: true },
        { source: "Company Careers", url: "https://pubmatic.com/careers", lastChecked: "3 hours ago" }
      ],
      status: "active" as const,
      verified: true,
      lastVerifiedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "pune-seo-010",
      slug: "digital-marketing-trainee-dimakh-consultants-koregaon-park-pune",
      title: "Digital Marketing Trainee (SEO Specialization)",
      company: "Dimakh Consultants",
      companyId: "dimakh-consultants",
      companyLogo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=128&auto=format&fit=crop&q=80",
      companyWebsite: "https://www.dimakhconsultants.com",
      companyRating: 4.2,
      companyReviewsCount: 160,
      description: "Join Dimakh Consultants in Koregaon Park, Pune. We provide structured training in On-Page SEO, keyword research, Google Search Console, and backlink analysis for Pune freshers.",
      responsibilities: [
        "Assist senior marketers in updating metadata, header tags, and XML sitemaps",
        "Conduct competitive backlink gap research and compile prospect lists",
        "Track weekly keyword rankings and draft client progress reports"
      ],
      requirementsMandatory: [
        "Freshers welcome (2024 / 2025 / 2026 graduates)",
        "Good written English and analytical curiosity",
        "Basic knowledge of search engines and internet technologies"
      ],
      requirementsPreferred: [
        "Digital marketing course completion (SEMrush Academy, HubSpot, or local academy)"
      ],
      education: "Any Graduate",
      location: "Koregaon Park, Pune",
      city: "Pune" as const,
      locality: "Koregaon Park",
      experienceMin: 0,
      experienceMax: 1,
      experienceLabel: "Fresher (0-1 yrs)",
      salaryMin: 15000,
      salaryMax: 22000,
      salaryCurrency: "INR" as const,
      salaryPeriod: "month" as const,
      salaryDisclosed: true,
      employmentType: "Full-time" as const,
      workMode: "On-site" as const,
      source: "Internshala",
      sourceUrl: "https://internshala.com/job/detail/digital-marketing-trainee-dimakh-pune",
      applicationUrl: "https://internshala.com/job/detail/digital-marketing-trainee-dimakh-pune",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12).toISOString(),
      skills: ["Keyword Research", "On-Page SEO", "Local SEO", "Google Search Console", "Excel / Sheets Reporting"],
      fresherFriendly: true,
      consolidatedSources: [
        { source: "Internshala", url: "https://internshala.com/job/detail/digital-marketing-trainee-dimakh-pune", lastChecked: "1 hour ago", isPrimary: true },
        { source: "Naukri", url: "https://www.naukri.com/job-listings-dimakh-trainee-pune", lastChecked: "3 hours ago" }
      ],
      status: "active" as const,
      verified: true,
      lastVerifiedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "pune-seo-011",
      slug: "seo-trainee-tech-mahindra-hinjawadi-pune",
      title: "SEO Intern / Trainee",
      company: "Tech Mahindra",
      companyId: "tech-mahindra",
      companyLogo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=128&auto=format&fit=crop&q=80",
      companyWebsite: "https://careers.techmahindra.com",
      companyRating: 4.0,
      companyReviewsCount: 12000,
      description: "Tech Mahindra Hinjawadi Phase 3 campus is onboarding SEO Trainees for enterprise IT digital marketing. 6-month paid internship with fast-track conversion to Associate SEO Analyst.",
      responsibilities: [
        "Assist in keyword research for cloud computing, cybersecurity, and enterprise software services",
        "Update metadata, schema tags, and internal link structure across enterprise subsites",
        "Monitor Google Search Console impressions, CTR, and indexing issues"
      ],
      requirementsMandatory: [
        "2024 / 2025 / 2026 Batch Graduates (B.E / B.Tech / BCA / MCA / B.Sc)",
        "Basic coursework or certification in Search Engine Optimization",
        "Strong aptitude and enthusiasm for digital technologies"
      ],
      requirementsPreferred: [
        "Good Excel and data visualization skills"
      ],
      education: "B.E / B.Tech / BCA / MCA / B.Sc",
      location: "Hinjawadi Phase 3, Pune",
      city: "Pune" as const,
      locality: "Hinjawadi",
      experienceMin: 0,
      experienceMax: 0,
      experienceLabel: "Fresher / Intern (0 yrs)",
      salaryMin: 14000,
      salaryMax: 18000,
      salaryCurrency: "INR" as const,
      salaryPeriod: "month" as const,
      salaryDisclosed: true,
      employmentType: "Internship" as const,
      workMode: "Hybrid" as const,
      source: "Company Careers",
      sourceUrl: "https://careers.techmahindra.com/job/seo-trainee-hinjawadi-pune",
      applicationUrl: "https://careers.techmahindra.com/job/seo-trainee-hinjawadi-pune",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
      skills: ["Keyword Research", "On-Page SEO", "Google Search Console", "Excel / Sheets Reporting", "Technical SEO"],
      fresherFriendly: true,
      consolidatedSources: [
        { source: "Company Careers", url: "https://careers.techmahindra.com/job/seo-trainee-hinjawadi-pune", lastChecked: "40 mins ago", isPrimary: true },
        { source: "LinkedIn", url: "https://www.linkedin.com/jobs/view/tech-mahindra-seo-trainee-pune", lastChecked: "2 hours ago" }
      ],
      status: "active" as const,
      verified: true,
      lastVerifiedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "pune-seo-012",
      slug: "digital-marketing-seo-associate-talent-corner-pcmc-pune",
      title: "Digital Marketing & SEO Associate",
      company: "Talent Corner HR Services",
      companyId: "talent-corner",
      companyLogo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&auto=format&fit=crop&q=80",
      companyWebsite: "https://talentcorner.in",
      companyRating: 4.1,
      companyReviewsCount: 90,
      description: "Hiring for an established industrial IT firm in Pimpri-Chinchwad, Pune. The role entails on-page SEO, directory submissions, keyword tracking, and website traffic growth.",
      responsibilities: [
        "Optimize website landing pages for B2B engineering and manufacturing search queries",
        "Perform regular on-page SEO audits and meta tag optimizations",
        "Execute directory submissions, social bookmarking, and local business citations"
      ],
      requirementsMandatory: [
        "0–1 years experience or digital marketing diploma",
        "Familiarity with SEO principles and keyword research tools",
        "Candidates residing in PCMC / Nigdi / Bhosari / Chinchwad preferred"
      ],
      requirementsPreferred: [
        "Basic knowledge of Google Ads or SEM"
      ],
      education: "Graduate in any stream",
      location: "Pimpri-Chinchwad, Pune",
      city: "Pimpri-Chinchwad" as const,
      locality: "Pimpri-Chinchwad",
      experienceMin: 0,
      experienceMax: 1,
      experienceLabel: "Fresher & 0-1 yrs",
      salaryMin: 15000,
      salaryMax: 23000,
      salaryCurrency: "INR" as const,
      salaryPeriod: "month" as const,
      salaryDisclosed: true,
      employmentType: "Full-time" as const,
      workMode: "On-site" as const,
      source: "Foundit",
      sourceUrl: "https://www.foundit.in/job/talent-corner-seo-pcmc",
      applicationUrl: "https://www.foundit.in/job/talent-corner-seo-pcmc",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 19).toISOString(),
      skills: ["On-Page SEO", "Keyword Research", "Google Search Console", "Off-Page SEO", "Local SEO"],
      fresherFriendly: true,
      consolidatedSources: [
        { source: "Foundit", url: "https://www.foundit.in/job/talent-corner-seo-pcmc", lastChecked: "3 hours ago", isPrimary: true },
        { source: "Indeed", url: "https://in.indeed.com/viewjob?jk=talent-corner-pcmc", lastChecked: "7 hours ago" }
      ],
      status: "active" as const,
      verified: true,
      lastVerifiedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  // Process all jobs through score calculation engine
  return rawDefinitions.map((raw) => {
    const scores = calculateJobScores(raw as Partial<Job>);
    return {
      ...raw,
      seoRelevanceScore: scores.seoTitleScore * 4, // 0-100 normalized
      fresherScore: scores.fresherScore * 4,
      locationScore: scores.locationScore * (100 / 15),
      salaryScore: scores.salaryScore * 20,
      matchScore: scores.totalScore,
      canIApplyStatus: scores.canIApplyStatus,
      canIApplyExplanation: scores.canIApplyExplanation,
      whyYouMatch: scores.whyYouMatch,
      missingRequirements: scores.missingRequirements,
      viewsCount: Math.floor(Math.random() * 200) + 40,
      appliesCount: Math.floor(Math.random() * 45) + 5,
    } as Job;
  });
}

// In-Memory & Local-Persistent Store
class JobDataStore {
  private jobs: Job[] = [];
  private companies: Company[] = [];
  private sources: JobSourceStatus[] = [];
  private logs: IngestionLog[] = [];
  private savedJobs: SavedJob[] = [];
  private alerts: JobAlert[] = [];
  private initialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.initialized) return;
    this.jobs = buildInitialJobs();
    this.companies = INITIAL_COMPANIES;
    this.sources = INITIAL_SOURCES;
    this.logs = INITIAL_LOGS;
    this.initialized = true;
  }

  public getJobs(): Job[] {
    return this.jobs;
  }

  public getJobById(id: string): Job | undefined {
    return this.jobs.find((j) => j.id === id || j.slug === id);
  }

  public getCompanies(): Company[] {
    return this.companies;
  }

  public getCompanyBySlug(slug: string): Company | undefined {
    return this.companies.find((c) => c.slug === slug || c.id === slug);
  }

  public getSources(): JobSourceStatus[] {
    return this.sources;
  }

  public getLogs(): IngestionLog[] {
    return this.logs;
  }

  public addLog(log: Omit<IngestionLog, "id" | "timestamp">) {
    const newLog: IngestionLog = {
      ...log,
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };
    this.logs.unshift(newLog);
    if (this.logs.length > 50) this.logs.pop();
    return newLog;
  }

  public updateSource(id: string, updates: Partial<JobSourceStatus>) {
    const index = this.sources.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.sources[index] = { ...this.sources[index], ...updates };
    }
  }

  public addOrUpdateJob(newJobData: Partial<Job>): Job {
    const scores = calculateJobScores(newJobData);
    const existingIndex = this.jobs.findIndex(
      (j) =>
        j.id === newJobData.id ||
        (j.company.toLowerCase() === (newJobData.company || "").toLowerCase() &&
          j.title.toLowerCase() === (newJobData.title || "").toLowerCase())
    );

    const now = new Date().toISOString();

    if (existingIndex !== -1) {
      const existing = this.jobs[existingIndex];
      // Merge sources
      const existingSources = existing.consolidatedSources || [];
      if (newJobData.source && !existingSources.some((s) => s.source === newJobData.source)) {
        existingSources.push({
          source: newJobData.source,
          url: newJobData.applicationUrl || newJobData.sourceUrl || existing.applicationUrl,
          lastChecked: "Just now",
        });
      }

      const updated: Job = {
        ...existing,
        ...newJobData,
        consolidatedSources: existingSources,
        seoRelevanceScore: scores.seoTitleScore * 4,
        fresherScore: scores.fresherScore * 4,
        matchScore: scores.totalScore,
        canIApplyStatus: scores.canIApplyStatus,
        canIApplyExplanation: scores.canIApplyExplanation,
        whyYouMatch: scores.whyYouMatch,
        missingRequirements: scores.missingRequirements,
        updatedAt: now,
        lastVerifiedAt: now,
      } as Job;

      this.jobs[existingIndex] = updated;
      return updated;
    } else {
      const id = newJobData.id || `pune-seo-${Date.now()}`;
      const slug =
        newJobData.slug ||
        `${(newJobData.title || "seo-job").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${(
          newJobData.company || "company"
        )
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}-pune`;

      const created: Job = {
        id,
        slug,
        title: newJobData.title || "SEO Executive",
        company: newJobData.company || "Pune Digital Agency",
        companyId: newJobData.companyId || "general",
        companyLogo:
          newJobData.companyLogo ||
          "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&auto=format&fit=crop&q=80",
        description: newJobData.description || "SEO opportunity in Pune",
        responsibilities: newJobData.responsibilities || [
          "Perform keyword discovery and search intent mapping",
          "Optimize on-page title tags and metadata",
          "Track search performance in Search Console",
        ],
        requirementsMandatory: newJobData.requirementsMandatory || [
          "Fresher or 0-1 years in SEO",
          "Basic understanding of Search Console and Google Analytics",
        ],
        requirementsPreferred: newJobData.requirementsPreferred || ["Basic HTML knowledge"],
        education: newJobData.education || "Any Graduate",
        location: newJobData.location || "Pune, Maharashtra",
        city: newJobData.city || "Pune",
        locality: newJobData.locality || "Pune",
        experienceMin: newJobData.experienceMin ?? 0,
        experienceMax: newJobData.experienceMax ?? 1,
        experienceLabel: newJobData.experienceLabel || "Fresher (0-1 yrs)",
        salaryMin: newJobData.salaryMin || 18000,
        salaryMax: newJobData.salaryMax || 28000,
        salaryCurrency: "INR",
        salaryPeriod: "month",
        salaryDisclosed: newJobData.salaryDisclosed ?? true,
        employmentType: newJobData.employmentType || "Full-time",
        workMode: newJobData.workMode || "On-site",
        source: newJobData.source || "Naukri",
        sourceUrl: newJobData.sourceUrl || "https://www.naukri.com",
        applicationUrl: newJobData.applicationUrl || "https://www.naukri.com",
        postedAt: newJobData.postedAt || now,
        deadline: newJobData.deadline,
        skills: newJobData.skills || extractSeoSkills((newJobData.description || "") + " " + (newJobData.title || "")),
        fresherFriendly: (newJobData.experienceMin ?? 0) <= 1,
        seoRelevanceScore: scores.seoTitleScore * 4,
        fresherScore: scores.fresherScore * 4,
        locationScore: scores.locationScore * (100 / 15),
        salaryScore: scores.salaryScore * 20,
        matchScore: scores.totalScore,
        canIApplyStatus: scores.canIApplyStatus,
        canIApplyExplanation: scores.canIApplyExplanation,
        whyYouMatch: scores.whyYouMatch,
        missingRequirements: scores.missingRequirements,
        consolidatedSources: newJobData.consolidatedSources || [
          { source: newJobData.source || "Naukri", url: newJobData.applicationUrl || "https://www.naukri.com", lastChecked: "Just now", isPrimary: true },
        ],
        status: "active",
        verified: true,
        lastVerifiedAt: now,
        createdAt: now,
        updatedAt: now,
        viewsCount: 1,
        appliesCount: 0,
      };

      this.jobs.unshift(created);
      return created;
    }
  }

  public updateJobStatus(id: string, status: "active" | "expired" | "unverified" | "removed"): boolean {
    const job = this.jobs.find((j) => j.id === id);
    if (job) {
      job.status = status;
      job.updatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  public deleteJob(id: string): boolean {
    const initialLen = this.jobs.length;
    this.jobs = this.jobs.filter((j) => j.id !== id);
    return this.jobs.length < initialLen;
  }

  public searchJobs(filters: SearchFilters): SearchResult {
    let list = [...this.jobs];

    // Filter by Active Status (unless admin requests all)
    list = list.filter((j) => j.status === "active");

    // 1. Keyword search (title, description, company, skills)
    if (filters.keyword && filters.keyword.trim().length > 0) {
      const q = filters.keyword.toLowerCase().trim();
      list = list.filter((j) => {
        const inTitle = j.title.toLowerCase().includes(q);
        const inCompany = j.company.toLowerCase().includes(q);
        const inDesc = j.description.toLowerCase().includes(q);
        const inSkills = j.skills.some((s) => s.toLowerCase().includes(q));
        const inLocality = j.locality.toLowerCase().includes(q);
        return inTitle || inCompany || inDesc || inSkills || inLocality;
      });
    }

    // 2. Locality filter
    if (filters.locality && filters.locality !== "all") {
      const loc = filters.locality.toLowerCase();
      list = list.filter(
        (j) =>
          j.locality.toLowerCase().includes(loc) ||
          j.location.toLowerCase().includes(loc)
      );
    }

    // 3. Location / Work Mode (Pune, Pimpri-Chinchwad, Remote, Hybrid, On-site)
    if (filters.location && filters.location !== "all") {
      const target = filters.location.toLowerCase();
      if (target === "remote") {
        list = list.filter((j) => j.workMode === "Remote" || j.location.toLowerCase().includes("remote"));
      } else if (target === "hybrid") {
        list = list.filter((j) => j.workMode === "Hybrid");
      } else if (target === "on-site") {
        list = list.filter((j) => j.workMode === "On-site");
      } else if (target === "pimpri-chinchwad") {
        list = list.filter((j) => j.city === "Pimpri-Chinchwad" || j.location.toLowerCase().includes("pimpri"));
      } else if (target === "pune") {
        list = list.filter((j) => j.location.toLowerCase().includes("pune") || j.city === "Pune");
      }
    }

    // 4. Experience Level
    if (filters.experience && filters.experience !== "all") {
      const exp = filters.experience.toLowerCase();
      if (exp.includes("fresher") || exp === "0-1 years") {
        list = list.filter((j) => j.experienceMin === 0);
      } else if (exp === "1-2 years") {
        list = list.filter((j) => j.experienceMin <= 2 && j.experienceMax >= 1);
      } else if (exp === "2-3 years") {
        list = list.filter((j) => j.experienceMin >= 2 && j.experienceMin <= 3);
      } else if (exp === "3+ years") {
        list = list.filter((j) => j.experienceMin >= 3);
      }
    }

    // 5. Fresher Only toggle
    if (filters.fresherOnly) {
      list = list.filter((j) => j.fresherFriendly && j.experienceMin === 0);
    }

    // 6. Employment Type (Full-time, Internship, etc.)
    if (filters.employmentType && filters.employmentType !== "all") {
      list = list.filter((j) => j.employmentType.toLowerCase() === filters.employmentType!.toLowerCase());
    }

    // 7. Salary Min Filter
    if (filters.salaryMin && filters.salaryMin > 0) {
      list = list.filter((j) => j.salaryDisclosed && j.salaryMax >= filters.salaryMin!);
    }

    // 8. Source Filter
    if (filters.source && filters.source !== "all") {
      list = list.filter(
        (j) =>
          j.source.toLowerCase() === filters.source!.toLowerCase() ||
          j.consolidatedSources.some((cs) => cs.source.toLowerCase() === filters.source!.toLowerCase())
      );
    }

    // 9. Posted within days
    if (filters.postedWithinDays && filters.postedWithinDays > 0) {
      const cutoff = Date.now() - filters.postedWithinDays * 24 * 60 * 60 * 1000;
      list = list.filter((j) => new Date(j.postedAt).getTime() >= cutoff);
    }

    // Sorting
    const sortBy = filters.sortBy || "relevance";
    if (sortBy === "relevance" || sortBy === "match") {
      list.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    } else if (sortBy === "salary") {
      list.sort((a, b) => b.salaryMax - a.salaryMax);
    } else if (sortBy === "fresher") {
      list.sort((a, b) => b.fresherScore - a.fresherScore);
    }

    // Facet counts
    const allActive = this.jobs.filter((j) => j.status === "active");
    const newToday = allActive.filter(
      (j) => Date.now() - new Date(j.postedAt).getTime() <= 24 * 60 * 60 * 1000
    ).length;
    const fresherFriendly = allActive.filter((j) => j.fresherFriendly && j.experienceMin === 0).length;
    const fullTime = allActive.filter((j) => j.employmentType === "Full-time").length;
    const remote = allActive.filter((j) => j.workMode === "Remote").length;
    const salaryDisclosed = allActive.filter((j) => j.salaryDisclosed).length;

    // Localities count
    const locMap = new Map<string, number>();
    for (const j of allActive) {
      if (j.locality) {
        locMap.set(j.locality, (locMap.get(j.locality) || 0) + 1);
      }
    }
    const localities = Array.from(locMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Top skills count
    const skillMap = new Map<string, number>();
    for (const j of allActive) {
      for (const s of j.skills) {
        skillMap.set(s, (skillMap.get(s) || 0) + 1);
      }
    }
    const topSkills = Array.from(skillMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Sources count
    const srcMap = new Map<string, number>();
    for (const j of allActive) {
      srcMap.set(j.source, (srcMap.get(j.source) || 0) + 1);
    }
    const sources = Array.from(srcMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const total = list.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const paginated = list.slice((page - 1) * limit, page * limit);

    return {
      jobs: paginated,
      total,
      page,
      totalPages,
      filters: {
        totalActive: allActive.length,
        newToday,
        fresherFriendly,
        fullTime,
        remote,
        salaryDisclosed,
        localities,
        topSkills,
        sources,
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}

// Global Singleton
const globalStore = (global as any)._jobDataStore || new JobDataStore();
if (process.env.NODE_ENV !== "production") {
  (global as any)._jobDataStore = globalStore;
}

export const jobStore: JobDataStore = globalStore;
