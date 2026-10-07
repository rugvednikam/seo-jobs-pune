import { NextRequest, NextResponse } from "next/server";
import { jobStore } from "@/lib/storage";
import { SearchFilters } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const keyword = searchParams.get("keyword") || undefined;
    const location = searchParams.get("location") || undefined;
    const locality = searchParams.get("locality") || undefined;
    const experience = searchParams.get("experience") || undefined;
    const workMode = searchParams.get("workMode") || undefined;
    const employmentType = searchParams.get("employmentType") || undefined;
    const source = searchParams.get("source") || undefined;
    const fresherOnly = searchParams.get("fresherOnly") === "true";
    const salaryMin = searchParams.get("salaryMin") ? parseInt(searchParams.get("salaryMin")!, 10) : undefined;
    const postedWithinDays = searchParams.get("postedWithinDays")
      ? parseInt(searchParams.get("postedWithinDays")!, 10)
      : undefined;
    const sortBy = (searchParams.get("sortBy") as any) || "relevance";
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 20;

    const filters: SearchFilters = {
      keyword,
      location,
      locality,
      experience,
      workMode,
      employmentType,
      source,
      fresherOnly,
      salaryMin,
      postedWithinDays,
      sortBy,
      page,
      limit,
    };

    const result = jobStore.searchJobs(filters);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to search jobs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = jobStore.searchJobs(body as SearchFilters);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to query jobs" }, { status: 500 });
  }
}
