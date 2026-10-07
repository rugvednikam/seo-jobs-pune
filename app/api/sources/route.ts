import { NextRequest, NextResponse } from "next/server";
import { jobStore } from "@/lib/storage";

export async function GET(request: NextRequest) {
  try {
    const sources = jobStore.getSources();
    const logs = jobStore.getLogs();
    return NextResponse.json({ sources, logs });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to fetch sources" }, { status: 500 });
  }
}
