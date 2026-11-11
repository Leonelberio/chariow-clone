import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Webhook handler reserved for Stripe (Phase 1 extension)" },
    { status: 501 },
  );
}
