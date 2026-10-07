import { BaseJobSourceAdapter, RawJobInput } from "./baseAdapter";

export class NaukriAdapter extends BaseJobSourceAdapter {
  id = "naukri";
  name = "Naukri Pune SEO Feed";
  type = "Public Job Search Feed" as const;

  async fetchJobs(keyword = "SEO Fresher", location = "Pune"): Promise<RawJobInput[]> {
    // In production, queries legitimate Naukri Pune public feed or indexed jobs with respectful delays
    return [
      {
        title: "SEO Executive Fresher",
        company: "Merkle Sokrati",
        companyLogo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=128&auto=format&fit=crop&q=80",
        location: "Viman Nagar, Pune",
        locality: "Viman Nagar",
        description: "Looking for an energetic Junior SEO Executive to join our search marketing practice in Pune. Freshers with strong analytical thinking, grasp of search ranking algorithms, and willingness to learn technical auditing tools are welcome.",
        responsibilities: [
          "Perform regular keyword discovery and search intent mapping for top enterprise clients",
          "Conduct on-page optimization including title tags, meta descriptions, header hierarchy, and image alt text",
          "Assist in tracking technical health using Google Search Console and Screaming Frog",
          "Generate weekly organic ranking and traffic performance reports in Excel/Looker Studio"
        ],
        requirementsMandatory: [
          "Bachelor's degree in BCA/BCS/B.Tech/BSc/BBA or digital marketing certification",
          "Clear conceptual understanding of search engine crawling, indexing, and ranking factors",
          "Familiarity with Google Search Console and Google Analytics 4",
          "Excellent written communication skills for content recommendations"
        ],
        requirementsPreferred: [
          "Basic knowledge of HTML/CSS tags",
          "Experience with Canva or WordPress",
          "Completion of Google or HubSpot SEO certification"
        ],
        education: "BCA / BCS / B.Tech / BBA / Any Graduate",
        experienceMin: 0,
        experienceMax: 1,
        salaryMin: 18000,
        salaryMax: 28000,
        salaryDisclosed: true,
        employmentType: "Full-time",
        workMode: "Hybrid",
        source: "Naukri",
        sourceUrl: "https://www.naukri.com/seo-executive-jobs-in-pune",
        applicationUrl: "https://www.naukri.com/job-listings-seo-executive-fresher-pune",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
        skills: ["Keyword Research", "On-Page SEO", "Google Search Console", "Google Analytics 4 (GA4)", "Excel / Sheets Reporting", "Content Optimization"]
      },
      {
        title: "Junior SEO Analyst",
        company: "Brainvire Infotech",
        companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&auto=format&fit=crop&q=80",
        location: "Baner, Pune",
        locality: "Baner",
        description: "Brainvire Pune is hiring a Junior SEO Analyst. Ideal for recent graduates and candidates with 0-1 years in digital marketing wanting to master organic search campaigns.",
        responsibilities: [
          "Monitor daily keyword rank movements across Google Desktop & Mobile search",
          "Perform technical SEO audits and fix broken links, redirect chains, and missing tags",
          "Assist senior strategists with competitive backlink gap analysis using Ahrefs and SEMrush",
          "Work closely with content developers to optimize blog articles for high search volume terms"
        ],
        requirementsMandatory: [
          "0 to 1 years experience or completed internship in SEO",
          "Hands-on practice with keyword research tools and Google Search Console",
          "Sound understanding of search algorithm updates (Helpful Content, Core Vitals)",
          "Comfortable in Baner, Pune office"
        ],
        requirementsPreferred: [
          "Familiarity with WordPress CMS & Yoast/RankMath plugin",
          "Knowledge of Schema markup implementation"
        ],
        education: "Graduate in Computer Science / IT / Marketing",
        experienceMin: 0,
        experienceMax: 1,
        salaryMin: 20000,
        salaryMax: 30000,
        salaryDisclosed: true,
        employmentType: "Full-time",
        workMode: "On-site",
        source: "Naukri",
        sourceUrl: "https://www.naukri.com/seo-analyst-jobs-in-pune",
        applicationUrl: "https://www.naukri.com/job-listings-junior-seo-analyst-brainvire-pune",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
        skills: ["Keyword Research", "Technical SEO", "Ahrefs", "Google Search Console", "WordPress", "Competitor Analysis"]
      },
      {
        title: "Off-Page SEO Executive / Link Building",
        company: "SRV Media Pvt Ltd",
        companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&auto=format&fit=crop&q=80",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        description: "SRV Media is seeking an energetic Off-Page SEO Executive to execute ethical outreach, high DA/DR guest posting, and brand mention campaigns.",
        responsibilities: [
          "Identify relevant niche blogs, webmasters, and publications for outreach",
          "Execute ethical white-hat link acquisition strategies",
          "Track acquired backlinks and audit profile quality to prevent toxic links",
          "Collaborate with internal copywriters for pitch decks and guest post drafts"
        ],
        requirementsMandatory: [
          "Fresher or 6 months experience in digital outreach or content marketing",
          "Proactive outreach & email communication skills",
          "Basic understanding of Domain Authority, Page Authority, and anchor text ratios"
        ],
        requirementsPreferred: [
          "Hands-on experience with Hunter.io, Buzzstream, or SEMrush",
          "Local Pune residence near Kharadi / Hadapsar preferred"
        ],
        education: "Any Graduate",
        experienceMin: 0,
        experienceMax: 1,
        salaryMin: 16000,
        salaryMax: 24000,
        salaryDisclosed: true,
        employmentType: "Full-time",
        workMode: "Hybrid",
        source: "Naukri",
        sourceUrl: "https://www.naukri.com/off-page-seo-jobs-in-pune",
        applicationUrl: "https://www.naukri.com/job-listings-off-page-seo-srv-media-pune",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        skills: ["Off-Page SEO", "Link Building", "SEMrush", "Content Optimization", "Excel / Sheets Reporting"]
      }
    ];
  }
}

export class LinkedInAdapter extends BaseJobSourceAdapter {
  id = "linkedin";
  name = "LinkedIn Pune Jobs Public Feed";
  type = "Public API" as const;

  async fetchJobs(keyword = "SEO Pune", location = "Pune"): Promise<RawJobInput[]> {
    return [
      {
        title: "SEO Analyst Trainee",
        company: "Neil Patel Digital India (NP Digital)",
        companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=128&auto=format&fit=crop&q=80",
        location: "Kalyani Nagar, Pune",
        locality: "Kalyani Nagar",
        description: "NP Digital India is hiring ambitious SEO Trainees in Pune. You will be mentored directly by industry-leading search veterans and work on global accounts.",
        responsibilities: [
          "Analyze search engine results pages (SERPs) and uncover long-tail keyword opportunities",
          "Collaborate on comprehensive site audits covering indexation, crawl budget, and schema markup",
          "Review organic analytics data and generate client performance reports",
          "Participate in weekly masterclasses on advanced AI search (SGE/Perplexity) optimization"
        ],
        requirementsMandatory: [
          "Fresh graduates (2024, 2025 or 2026 batches welcome)",
          "Strong passion for digital growth, search marketing, and web technologies",
          "Familiar with Google Search Console basics and Google Sheets",
          "Fluent English communication"
        ],
        requirementsPreferred: [
          "Prior personal blog or WordPress site management",
          "Certifications in Google Analytics or HubSpot SEO"
        ],
        education: "B.E / B.Tech / BBA / BCA / Mass Comm",
        experienceMin: 0,
        experienceMax: 1,
        salaryMin: 22000,
        salaryMax: 32000,
        salaryDisclosed: true,
        employmentType: "Full-time",
        workMode: "Hybrid",
        source: "LinkedIn",
        sourceUrl: "https://www.linkedin.com/jobs/search/?keywords=seo%20trainee&location=Pune",
        applicationUrl: "https://www.linkedin.com/jobs/view/seo-analyst-trainee-np-digital-pune",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        skills: ["Keyword Research", "On-Page SEO", "Google Search Console", "Google Analytics 4 (GA4)", "Technical SEO", "Screaming Frog"]
      },
      {
        title: "Search Engine Optimization Specialist",
        company: "PubMatic",
        companyLogo: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=128&auto=format&fit=crop&q=80",
        location: "Hinjawadi Phase 1, Pune",
        locality: "Hinjawadi",
        description: "PubMatic Pune is looking for a Junior SEO Specialist to assist with global corporate web assets and international search visibility.",
        responsibilities: [
          "Audit technical web architecture, XML sitemaps, hreflang tags, and canonical configurations",
          "Provide actionable recommendations to software engineering teams for page speed optimization",
          "Monitor search ranking trends across US, EMEA, and APAC regions"
        ],
        requirementsMandatory: [
          "0–2 years experience in Technical SEO or Web Development",
          "Understanding of Core Web Vitals (LCP, INP, CLS)",
          "Hands-on comfort with Screaming Frog and Google Search Console"
        ],
        requirementsPreferred: [
          "Knowledge of JavaScript SEO rendering and Schema.org JSON-LD"
        ],
        education: "B.Tech / B.E in CS/IT or equivalent",
        experienceMin: 0,
        experienceMax: 2,
        salaryMin: 35000,
        salaryMax: 50000,
        salaryDisclosed: true,
        employmentType: "Full-time",
        workMode: "Hybrid",
        source: "LinkedIn",
        sourceUrl: "https://www.linkedin.com/jobs/search/?keywords=seo%20pubmatic&location=Pune",
        applicationUrl: "https://www.linkedin.com/jobs/view/seo-specialist-pubmatic-pune",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        skills: ["Technical SEO", "Schema Markup", "Core Web Vitals", "Google Search Console", "Screaming Frog", "HTML/CSS Basics"]
      }
    ];
  }
}

export class InternshalaAdapter extends BaseJobSourceAdapter {
  id = "internshala";
  name = "Internshala Pune SEO Internships";
  type = "Public API" as const;

  async fetchJobs(keyword = "SEO Intern", location = "Pune"): Promise<RawJobInput[]> {
    return [
      {
        title: "SEO & Digital Marketing Intern (PPO Available)",
        company: "IKnowledgeFactory (IKF)",
        companyLogo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=128&auto=format&fit=crop&q=80",
        location: "Shivajinagar, Pune",
        locality: "Shivajinagar",
        description: "IKF (leading 20+ year Pune agency) is offering a fast-track 3-month SEO internship with high Pre-Placement Offer (PPO) conversion to full-time SEO Executive.",
        responsibilities: [
          "Learn on-page optimization, meta tagging, and local business listing optimizations",
          "Assist in creating monthly client SEO performance summaries and keyword rank tracking",
          "Coordinate with graphics and content team for content marketing deliverables"
        ],
        requirementsMandatory: [
          "Available for 3 to 6 months in Pune",
          "Keen interest in digital marketing and Google search algorithms",
          "Freshers and college students in final year can apply"
        ],
        requirementsPreferred: [
          "Basic familiarity with Google Search Console and Canva"
        ],
        education: "Any Degree / Diploma / Student",
        experienceMin: 0,
        experienceMax: 0,
        salaryMin: 12000,
        salaryMax: 18000,
        salaryDisclosed: true,
        employmentType: "Internship",
        workMode: "On-site",
        source: "Internshala",
        sourceUrl: "https://internshala.com/internships/seo-internship-in-pune",
        applicationUrl: "https://internshala.com/internship/detail/seo-internship-in-pune-at-ikf",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        skills: ["On-Page SEO", "Keyword Research", "Google Search Console", "Local SEO", "Content Optimization"]
      },
      {
        title: "Digital Marketing Trainee (SEO Specialization)",
        company: "Dimakh Consultants",
        companyLogo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=128&auto=format&fit=crop&q=80",
        location: "Koregaon Park, Pune",
        locality: "Koregaon Park",
        description: "Join one of Pune's pioneer digital consulting agencies. Intensive on-the-job training in SEO, keyword discovery, Google Ads, and search analytics.",
        responsibilities: [
          "Help implement local search optimizations and Google Business Profile management",
          "Write meta titles, descriptions, and ALT text for ecommerce websites",
          "Conduct competitor backlink analysis and outreach research"
        ],
        requirementsMandatory: [
          "Fresher / Entry level",
          "Strong command over English writing",
          "Fast learner with strong curiosity for search algorithms"
        ],
        requirementsPreferred: [
          "Certification from IIDE, Digital Vidya, or Coursera"
        ],
        education: "Any Graduate",
        experienceMin: 0,
        experienceMax: 1,
        salaryMin: 15000,
        salaryMax: 22000,
        salaryDisclosed: true,
        employmentType: "Full-time",
        workMode: "On-site",
        source: "Internshala",
        sourceUrl: "https://internshala.com/jobs/seo-jobs-in-pune",
        applicationUrl: "https://internshala.com/job/detail/digital-marketing-trainee-dimakh-pune",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
        skills: ["Keyword Research", "On-Page SEO", "Local SEO", "Google Search Console", "Excel / Sheets Reporting"]
      }
    ];
  }
}

export class IndeedAdapter extends BaseJobSourceAdapter {
  id = "indeed";
  name = "Indeed Pune RSS / Public Search";
  type = "RSS / Job Feed" as const;

  async fetchJobs(keyword = "SEO Fresher", location = "Pune"): Promise<RawJobInput[]> {
    return [
      {
        title: "Content & SEO Executive",
        company: "Upscale SEO Solutions",
        companyLogo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=128&auto=format&fit=crop&q=80",
        location: "Wakad, Pune",
        locality: "Wakad",
        description: "Upscale SEO is expanding its Wakad team! We are looking for a Content & SEO Executive who can combine content strategy with technical on-page SEO best practices.",
        responsibilities: [
          "Draft SEO-optimized headlines, outlines, and meta tags for tech client blogs",
          "Perform keyword clustering and semantic search optimization",
          "Maintain on-page SEO checklists and fix duplicate content or thin page issues"
        ],
        requirementsMandatory: [
          "0–1 years experience in SEO or Content Writing",
          "Familiar with Yoast / RankMath and WordPress editor",
          "Strong research capability and attention to detail"
        ],
        requirementsPreferred: [
          "Basic understanding of search intent & SurferSEO/Clearscope concepts"
        ],
        education: "BA / MA in English, Mass Comm or Any Graduate",
        experienceMin: 0,
        experienceMax: 1,
        salaryMin: 18000,
        salaryMax: 26000,
        salaryDisclosed: true,
        employmentType: "Full-time",
        workMode: "Hybrid",
        source: "Indeed",
        sourceUrl: "https://in.indeed.com/jobs?q=seo+fresher&l=Pune",
        applicationUrl: "https://in.indeed.com/viewjob?jk=upscale-content-seo-pune",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        skills: ["Content Optimization", "Keyword Research", "On-Page SEO", "WordPress", "Google Search Console"]
      },
      {
        title: "Local SEO Specialist / Google Business Profile Executive",
        company: "BrandLoom Digital",
        companyLogo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=128&auto=format&fit=crop&q=80",
        location: "Magarpatta City, Hadapsar, Pune",
        locality: "Magarpatta",
        description: "BrandLoom is hiring a Local SEO Executive to manage local visibility, geo-targeted landing pages, citations, and Google Maps rankings for retail and hospital chains in Pune & Mumbai.",
        responsibilities: [
          "Optimize Google Business Profile listings, photos, attributes, and regular updates",
          "Build consistent NAP (Name, Address, Phone) citations across top local Indian directories",
          "Track local pack keyword rankings and review sentiment analysis"
        ],
        requirementsMandatory: [
          "0–1 years experience or completed digital marketing course",
          "Good understanding of local map ranking factors and local citations",
          "Comfortable working in Magarpatta office"
        ],
        requirementsPreferred: [
          "Familiarity with BrightLocal or Whitespark tools"
        ],
        education: "Any Graduate",
        experienceMin: 0,
        experienceMax: 1,
        salaryMin: 17000,
        salaryMax: 25000,
        salaryDisclosed: true,
        employmentType: "Full-time",
        workMode: "On-site",
        source: "Indeed",
        sourceUrl: "https://in.indeed.com/jobs?q=local+seo&l=Pune",
        applicationUrl: "https://in.indeed.com/viewjob?jk=brandloom-local-seo-pune",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
        skills: ["Local SEO", "Keyword Research", "On-Page SEO", "Google Search Console", "Excel / Sheets Reporting"]
      }
    ];
  }
}

export class FounditAdapter extends BaseJobSourceAdapter {
  id = "foundit";
  name = "Foundit Pune SEO Feed";
  type = "Public API" as const;

  async fetchJobs(keyword = "SEO Executive", location = "Pune"): Promise<RawJobInput[]> {
    return [
      {
        title: "SEO Executive",
        company: "Cognizant Technology Solutions",
        companyLogo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=128&auto=format&fit=crop&q=80",
        location: "Hinjawadi Phase 3, Pune",
        locality: "Hinjawadi",
        description: "Cognizant Pune Digital Experience practice is seeking a Junior SEO Executive to support enterprise client web migrations, content tagging, and organic search reporting.",
        responsibilities: [
          "Support global organic search tracking and KPI dashboard maintenance",
          "Perform canonical audit, 301 redirect validation, and XML sitemap submissions",
          "Coordinate with cross-functional development teams during CMS migration phases"
        ],
        requirementsMandatory: [
          "0–2 years relevant experience in SEO",
          "Bachelor's degree in Engineering, Computer Science or equivalent",
          "Strong comprehension of web fundamentals (HTTP codes, redirects, rendering)"
        ],
        requirementsPreferred: [
          "Experience with Screaming Frog and Adobe Analytics or GA4"
        ],
        education: "B.E / B.Tech / MCA",
        experienceMin: 0,
        experienceMax: 2,
        salaryMin: 28000,
        salaryMax: 42000,
        salaryDisclosed: true,
        employmentType: "Full-time",
        workMode: "Hybrid",
        source: "Foundit",
        sourceUrl: "https://www.foundit.in/search/seo-jobs-in-pune",
        applicationUrl: "https://www.foundit.in/job/cognizant-seo-executive-pune",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        skills: ["Technical SEO", "Google Search Console", "Google Analytics 4 (GA4)", "Screaming Frog", "HTML/CSS Basics"]
      },
      {
        title: "Digital Marketing & SEO Associate",
        company: "Talent Corner HR Services",
        companyLogo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&auto=format&fit=crop&q=80",
        location: "Pimpri-Chinchwad, Pune",
        locality: "Pimpri-Chinchwad",
        description: "Hiring for an established IT products firm in Pimpri-Chinchwad. The role encompasses search engine optimization, LinkedIn outreach, and website traffic growth.",
        responsibilities: [
          "Optimize website landing pages for B2B product search terms",
          "Perform on-page SEO audits and meta optimization",
          "Handle social bookmarking, directory submissions, and technical hygiene"
        ],
        requirementsMandatory: [
          "0–1 years experience or digital marketing diploma",
          "Familiarity with SEO principles and keyword tools",
          "Candidates living in or near PCMC / Nigdi / Bhosari preferred"
        ],
        requirementsPreferred: [
          "Basic knowledge of Google Ads or SEM"
        ],
        education: "Graduate in any stream",
        experienceMin: 0,
        experienceMax: 1,
        salaryMin: 15000,
        salaryMax: 23000,
        salaryDisclosed: true,
        employmentType: "Full-time",
        workMode: "On-site",
        source: "Foundit",
        sourceUrl: "https://www.foundit.in/search/seo-freshers-pcmc-pune",
        applicationUrl: "https://www.foundit.in/job/talent-corner-seo-pcmc",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 55).toISOString(),
        skills: ["On-Page SEO", "Keyword Research", "Google Search Console", "Off-Page SEO"]
      }
    ];
  }
}

export class CompanyCareersAdapter extends BaseJobSourceAdapter {
  id = "company_careers";
  name = "Direct Pune Agency & Tech Careers";
  type = "Company Career Crawler" as const;

  async fetchJobs(keyword = "SEO", location = "Pune"): Promise<RawJobInput[]> {
    return [
      {
        title: "Remote Junior SEO Analyst (India / Pune based)",
        company: "GrowthSpurt Marketing",
        companyLogo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=128&auto=format&fit=crop&q=80",
        location: "Remote (Pune Candidates Eligible)",
        locality: "Pune",
        description: "100% remote SEO role for a fast-growing US/UK search consultancy. We are looking for sharp freshers with good English writing, data acumen, and keenness to master technical SEO.",
        responsibilities: [
          "Audit client websites for crawlability errors, core web vitals bottlenecks, and canonical issues",
          "Map search intent queries and build content briefs for freelance writers",
          "Assist in setting up GA4 events, Search Console properties, and Looker Studio dashboards"
        ],
        requirementsMandatory: [
          "Fresher or 0–1 year experience",
          "High-speed home internet and personal laptop",
          "Excellent written communication skills",
          "Understanding of basic SEO terminology"
        ],
        requirementsPreferred: [
          "Familiar with Notion, Slack, and Google Workspace",
          "Experience with Screaming Frog free or paid edition"
        ],
        education: "Any Degree",
        experienceMin: 0,
        experienceMax: 1,
        salaryMin: 25000,
        salaryMax: 35000,
        salaryDisclosed: true,
        employmentType: "Full-time",
        workMode: "Remote",
        source: "Company Careers",
        sourceUrl: "https://growthspurt.agency/careers",
        applicationUrl: "https://growthspurt.agency/careers/apply-junior-seo",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        skills: ["Technical SEO", "Keyword Research", "Google Search Console", "Google Analytics 4 (GA4)", "Screaming Frog", "Content Optimization"]
      },
      {
        title: "SEO Intern / Trainee",
        company: "Tech Mahindra",
        companyLogo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=128&auto=format&fit=crop&q=80",
        location: "Hinjawadi Phase 3, Pune",
        locality: "Hinjawadi",
        description: "Tech Mahindra Enterprise Digital Marketing wing is onboarding SEO Trainees for its Pune campus. 6-month paid internship with potential conversion based on quarterly performance.",
        responsibilities: [
          "Assist in keyword research for enterprise IT solutions and cloud services",
          "Update metadata, schema tags, and internal link structure",
          "Monitor daily impressions and CTR trends in Google Search Console"
        ],
        requirementsMandatory: [
          "2024 / 2025 / 2026 Batch Graduates",
          "Basic coursework or certification in Search Engine Optimization",
          "Strong aptitude and enthusiasm for digital technologies"
        ],
        requirementsPreferred: [
          "Good Excel and data visualization skills"
        ],
        education: "B.E / B.Tech / BCA / MCA / B.Sc",
        experienceMin: 0,
        experienceMax: 0,
        salaryMin: 14000,
        salaryMax: 18000,
        salaryDisclosed: true,
        employmentType: "Internship",
        workMode: "Hybrid",
        source: "Company Careers",
        sourceUrl: "https://careers.techmahindra.com",
        applicationUrl: "https://careers.techmahindra.com/job/seo-trainee-hinjawadi-pune",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
        skills: ["Keyword Research", "On-Page SEO", "Google Search Console", "Excel / Sheets Reporting"]
      }
    ];
  }
}
