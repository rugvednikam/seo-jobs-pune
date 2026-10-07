import { NextRequest, NextResponse } from "next/server";
import { jobStore } from "@/lib/storage";

export async function GET(request: NextRequest) {
  try {
    const companies = jobStore.getCompanies();
    const jobs = jobStore.getJobs().filter((j) => j.status === "active");

    // Recalculate dynamic job count and average salary per company
    const enriched = companies.map((c) => {
      const companyJobs = jobs.filter((j) => j.companyId === c.id || j.company.toLowerCase() === c.name.toLowerCase());
      const disclosedSalaries = companyJobs.filter((j) => j.salaryDisclosed && j.salaryMin > 0);
      const avgMin = disclosedSalaries.length
        ? Math.round(disclosedSalaries.reduce((acc, curr) => acc + curr.salaryMin, 0) / disclosedSalaries.length)
        : c.avgSalaryMin;
      const avgMax = disclosedSalaries.length
        ? Math.round(disclosedSalaries.reduce((acc, curr) => acc + curr.salaryMax, 0) / disclosedSalaries.length)
        : c.avgSalaryMax;

      return {
        ...c,
        jobsCount: companyJobs.length,
        avgSalaryMin: avgMin,
        avgSalaryMax: avgMax,
        openPositions: companyJobs.map((j) => j.title),
      };
    });

    return NextResponse.json(enriched);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to fetch companies" }, { status: 500 });
  }
}
