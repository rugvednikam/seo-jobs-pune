import { NextRequest, NextResponse } from "next/server";
import { dailyScheduler } from "@/lib/scheduler";

export async function GET(request: NextRequest) {
  try {
    const result = await dailyScheduler.runDailyCycle();
    return NextResponse.json({
      success: true,
      message: "Daily update cycle executed successfully.",
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Daily update failed" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
