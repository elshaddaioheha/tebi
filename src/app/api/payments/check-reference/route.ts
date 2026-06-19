import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "Reference is required." }, { status: 400 });
  }

  try {
    // Development/inspect mode bypass
    if (reference.startsWith("dev-test-ref")) {
      return NextResponse.json({
        status: "success",
        metadata: {
          courseId: reference.split("_")[1] || "default-id",
          email: "inspector@example.com",
          firstName: "Dev",
          lastName: "Inspector"
        }
      });
    }

    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );

    const data = await verifyRes.json();
    if (!data.status || data.data?.status !== "success") {
      return NextResponse.json({ error: "Transaction invalid or not successful." }, { status: 400 });
    }

    return NextResponse.json({
      status: "success",
      metadata: data.data.metadata
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
