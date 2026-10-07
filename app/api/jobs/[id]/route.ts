import { NextRequest, NextResponse } from "next/server";
import { jobStore } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = jobStore.getJobById(id);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Increment view count
    job.viewsCount = (job.viewsCount || 0) + 1;

    return NextResponse.json(job);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to fetch job" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = jobStore.addOrUpdateJob({ ...body, id });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = jobStore.deleteJob(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to delete job" }, { status: 500 });
  }
}
