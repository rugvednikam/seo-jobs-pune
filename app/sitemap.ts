import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://seojobspune.in";

  const programmaticRoutes = [
    "",
    "/seo-jobs-pune",
    "/seo-jobs-pune-freshers",
    "/seo-executive-jobs-pune",
    "/seo-analyst-jobs-pune",
    "/digital-marketing-jobs-pune",
    "/seo-internships-pune",
    "/fresher-jobs-pune",
    "/remote-seo-jobs-india",
    "/companies",
    "/resume-match",
    "/tracker",
    "/alerts",
  ];

  return programmaticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : route.includes("fresher") ? 0.9 : 0.8,
  }));
}
