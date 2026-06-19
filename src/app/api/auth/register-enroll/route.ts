import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName, password, reference } = await req.json();

    if (!email || !firstName || !lastName || !password || !reference) {
      return NextResponse.json({ error: "Missing required registration parameters." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    let courseId = "";
    
    // Verify reference with Paystack (or bypass in local dev with "dev-test-ref" prefix)
    if (reference.startsWith("dev-test-ref")) {
      // Offline/local testing shortcut: parse courseId from reference or pick first published course
      const queryParams = new URL(req.url).searchParams;
      const paramCourseId = reference.split("_")[1];
      if (paramCourseId) {
        courseId = paramCourseId;
      } else {
        const firstCourse = await db.course.findFirst({ where: { published: true } });
        if (!firstCourse) {
          return NextResponse.json({ error: "No published courses found to enroll in." }, { status: 404 });
        }
        courseId = firstCourse.id;
      }
    } else {
      const verifyRes = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
        }
      );

      const paystackData = await verifyRes.json();
      if (!paystackData.status || paystackData.data?.status !== "success") {
        return NextResponse.json({ error: "Payment verification failed. Unsuccessful transaction." }, { status: 400 });
      }

      const metadata = paystackData.data.metadata;
      courseId = metadata.courseId;
    }

    if (!courseId) {
      return NextResponse.json({ error: "No course ID found associated with this payment." }, { status: 400 });
    }

    // Check if user already exists
    let user = await db.user.findUnique({ where: { email } });
    
    if (!user) {
      // Hash password and create User
      const passwordHash = await bcrypt.hash(password, 12);
      user = await db.user.create({
        data: {
          email,
          firstName,
          lastName,
          passwordHash,
          role: "STUDENT",
        },
      });
    }

    // Upsert Enrollment record
    await db.enrollment.upsert({
      where: { userId_courseId: { userId: user.id, courseId } },
      create: { userId: user.id, courseId, paystackRef: reference },
      update: {},
    });

    const course = await db.course.findUnique({ where: { id: courseId }, select: { slug: true } });

    return NextResponse.json({
      success: true,
      message: "Account created and enrollment succeeded!",
      slug: course?.slug || "dashboard"
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
