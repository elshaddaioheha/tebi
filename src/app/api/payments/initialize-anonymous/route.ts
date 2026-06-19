import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[PAYMENTS] Initialize Anonymous requested with body:", body);
    const { courseId, email, firstName, lastName } = body;

    if (!courseId || !email || !firstName || !lastName) {
      console.warn("[PAYMENTS] Missing required fields in payload.");
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const course = await db.course.findUnique({ where: { id: courseId } });
    if (!course || !course.published) {
      console.warn(`[PAYMENTS] Course not found or not published: ${courseId}`);
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    const reference = `tebi_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    
    // Redirect to the visual confirmation page instead of direct GET API callback
    const host = process.env.NEXTAUTH_URL || `${req.nextUrl.protocol}//${req.nextUrl.host}`;
    const callbackUrl = `${host.replace(/\/$/, "")}/academy/confirm-payment`;
    console.log(`[PAYMENTS] Initializing Paystack transaction. Reference: ${reference}, Callback URL: ${callbackUrl}`);

    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: course.price, // already in kobo
        reference,
        callback_url: callbackUrl,
        metadata: {
          courseId,
          email,
          firstName,
          lastName,
          isAnonymous: true
        },
      }),
    });

    const data = await paystackRes.json();
    console.log("[PAYMENTS] Paystack initialization response status:", paystackRes.status, data);

    if (!data.status) {
      console.error("[PAYMENTS] Paystack initialization failed:", data);
      return NextResponse.json({ error: data.message || "Payment initialisation failed." }, { status: 502 });
    }

    return NextResponse.json({ 
      authorizationUrl: data.data.authorization_url,
      accessCode: data.data.access_code,
      reference
    });
  } catch (err: any) {
    console.error("[PAYMENTS] Uncaught error during initialization:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
