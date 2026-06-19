import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in to enroll." }, { status: 401 });
  }

  const { courseId } = await req.json();
  if (!courseId) {
    return NextResponse.json({ error: "courseId is required." }, { status: 400 });
  }

  const course = await db.course.findUnique({ where: { id: courseId } });
  if (!course || !course.published) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }

  const existing = await db.enrollment.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId } },
  });
  if (existing) {
    return NextResponse.json({ error: "Already enrolled." }, { status: 409 });
  }

  const reference = `tebi_${Date.now()}_${session.user.id.slice(-6)}`;
  const host = process.env.NEXTAUTH_URL || `${req.nextUrl.protocol}//${req.nextUrl.host}`;
  const callbackUrl = `${host.replace(/\/$/, "")}/api/payments/verify?reference=${reference}`;

  const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: session.user.email,
      amount: course.price, // already in kobo
      reference,
      callback_url: callbackUrl,
      metadata: { courseId, userId: session.user.id, courseName: course.title },
    }),
  });

  const data = await paystackRes.json();
  if (!data.status) {
    return NextResponse.json({ error: "Payment initialisation failed." }, { status: 502 });
  }

  return NextResponse.json({ 
    authorizationUrl: data.data.authorization_url,
    accessCode: data.data.access_code,
    reference
  });
}
