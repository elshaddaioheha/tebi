import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.redirect(new URL("/?payment=failed", req.url));
  }

  const verifyRes = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    }
  );

  const data = await verifyRes.json();
  if (!data.status || data.data?.status !== "success") {
    return NextResponse.redirect(new URL("/?payment=failed", req.url));
  }

  const { courseId, userId } = data.data.metadata as { courseId: string; userId: string };

  // Idempotent — ignore if already enrolled from webhook
  await db.enrollment.upsert({
    where: { userId_courseId: { userId, courseId } },
    create: { userId, courseId, paystackRef: reference },
    update: {},
  });

  const course = await db.course.findUnique({
    where: { id: courseId },
    select: { slug: true },
  });

  const destination = course
    ? `/academy/courses/${course.slug}`
    : "/academy/dashboard";

  return NextResponse.redirect(new URL(destination, req.url));
}
