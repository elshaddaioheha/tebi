import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-paystack-signature") ?? "";

  const expected = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (expected !== signature) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const event = JSON.parse(body) as {
    event: string;
    data: {
      status: string;
      reference: string;
      metadata: { courseId: string; userId: string };
    };
  };

  if (event.event === "charge.success" && event.data.status === "success") {
    const { courseId, userId } = event.data.metadata;
    const reference = event.data.reference;

    await db.enrollment.upsert({
      where: { userId_courseId: { userId, courseId } },
      create: { userId, courseId, paystackRef: reference },
      update: {},
    });
  }

  return NextResponse.json({ received: true });
}
