import { NextRequest, NextResponse } from "next/server";
import { jobStore } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const company = jobStore.getCompanyBySlug(slug);

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const companyJobs = jobStore
      .getJobs()
      .filter((j) => j.status === "active" && (j.companyId === company.id || j.company.toLowerCase() === company.name.toLowerCase()));

    return NextResponse.json({
      company,
      jobs: companyJobs,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to fetch company profile" }, { status: 500 });
  }
}
