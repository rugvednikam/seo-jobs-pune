import { NextRequest, NextResponse } from "next/server";
import { dailyScheduler } from "@/lib/scheduler";

export async function GET() {
  try {
    const state = dailyScheduler.getState();
    return NextResponse.json(state);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to get scheduler state" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, frequency, enabled } = body;

    if (action === "trigger_now") {
      const result = await dailyScheduler.runDailyCycle();
      return NextResponse.json({
        success: true,
        message: "Manual daily update cycle executed.",
        result,
        state: dailyScheduler.getState(),
      });
    }

    if (frequency) {
      dailyScheduler.setFrequency(frequency);
    }

    if (typeof enabled === "boolean") {
      dailyScheduler.toggleEnabled(enabled);
    }

    return NextResponse.json({
      success: true,
      state: dailyScheduler.getState(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update scheduler" }, { status: 500 });
  }
}
