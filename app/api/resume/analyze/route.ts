import { NextRequest, NextResponse } from "next/server";
import { analyzeResume } from "@/lib/resumeMatcher";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const resumeText = body.resumeText || "";

    if (!resumeText || resumeText.trim().length < 15) {
      return NextResponse.json(
        { error: "Please provide valid resume text or paste your experience/skills summary." },
        { status: 400 }
      );
    }

    const result = analyzeResume(resumeText);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to analyze resume" }, { status: 500 });
  }
}
