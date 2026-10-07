import { NextRequest, NextResponse } from "next/server";
import { analyzeResume } from "@/lib/resumeMatcher";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No resume file uploaded" }, { status: 400 });
    }

    const fileName = file.name || "resume";
    const fileSize = file.size;
    const fileType = file.type || "";
    const buffer = Buffer.from(await file.arrayBuffer());

    let extractedText = "";

    // 1. PDF File parsing
    if (fileName.toLowerCase().endsWith(".pdf") || fileType === "application/pdf") {
      try {
        // dynamic require for pdf-parse to avoid static build side-effects
        const pdfParse = require("pdf-parse");
        const pdfData = await pdfParse(buffer);
        extractedText = pdfData.text || "";
      } catch (pdfErr) {
        // Fallback ASCII / text stream extractor for raw PDF buffer
        const rawString = buffer.toString("utf-8");
        const cleanText = rawString.replace(/[^\x20-\x7E\n\r]/g, " ");
        extractedText = cleanText;
      }
    } else {
      // 2. Text or other files
      extractedText = buffer.toString("utf-8");
    }

    // Clean up excessive whitespace
    extractedText = extractedText.replace(/\s+/g, " ").trim();

    if (!extractedText || extractedText.length < 15) {
      return NextResponse.json(
        {
          error: "Could not extract readable text from the uploaded file. Please paste text or ensure PDF contains selectable text.",
        },
        { status: 400 }
      );
    }

    // Run resume matcher algorithm
    const analysis = analyzeResume(extractedText);

    return NextResponse.json({
      success: true,
      fileName,
      fileSize: `${(fileSize / 1024).toFixed(1)} KB`,
      extractedTextSnippet: extractedText.slice(0, 300) + (extractedText.length > 300 ? "..." : ""),
      ...analysis,
    });
  } catch (error: any) {
    console.error("Resume upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to parse and analyze uploaded resume" },
      { status: 500 }
    );
  }
}
