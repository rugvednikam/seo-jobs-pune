import { NextRequest, NextResponse } from "next/server";
import { scraperManager } from "@/lib/scraper/scraperManager";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const sourceId = body.sourceId || undefined;
    const keyword = body.keyword || "SEO Fresher";
    const location = body.location || "Pune";

    const result = await scraperManager.runIngestion(sourceId, keyword, location);

    return NextResponse.json({
      success: true,
      message: `Ingestion completed successfully. Fetched ${result.totalFetched} listings, added ${result.newJobsAdded} new jobs, consolidated ${result.duplicatesConsolidated} duplicates across ${result.sourcesProcessed} sources.`,
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Job discovery run failed" },
      { status: 500 }
    );
  }
}
