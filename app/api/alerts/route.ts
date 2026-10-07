import { NextRequest, NextResponse } from "next/server";
import { JobAlert } from "@/lib/types";

let alertsStore: JobAlert[] = [
  {
    id: "alert-1",
    email: "fresher.seo.pune@gmail.com",
    keyword: "SEO Executive",
    location: "Pune",
    experience: "Fresher",
    frequency: "Daily",
    createdAt: new Date().toISOString(),
    active: true,
  }
];

export async function GET() {
  return NextResponse.json(alertsStore);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, keyword, location, experience, frequency } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const newAlert: JobAlert = {
      id: `alert-${Date.now()}`,
      email,
      keyword: keyword || "SEO Fresher",
      location: location || "Pune",
      experience: experience || "Fresher",
      frequency: frequency || "Daily",
      createdAt: new Date().toISOString(),
      active: true,
    };

    alertsStore.push(newAlert);

    return NextResponse.json({
      success: true,
      message: `Alert activated for "${newAlert.keyword}" in ${newAlert.location}. You will receive ${newAlert.frequency.toLowerCase()} updates at ${email}.`,
      alert: newAlert,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to create alert" }, { status: 500 });
  }
}
