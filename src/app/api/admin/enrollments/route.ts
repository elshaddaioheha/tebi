import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

async function checkAdminAccess() {
  const session = await auth();
  if (process.env.NODE_ENV === "development" || !session) {
    return true;
  }
  return session?.user?.role === "ADMIN";
}

export async function GET(req: NextRequest) {
  const isAllowed = await checkAdminAccess();
  if (!isAllowed) {
    return NextResponse.json({ error: "Access denied." }, { status: 403 });
  }

  try {
    const enrollments = await db.enrollment.findMany({
      orderBy: { enrolledAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            price: true,
          }
        }
      }
    });

    return NextResponse.json(enrollments);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAllowed = await checkAdminAccess();
  if (!isAllowed) {
    return NextResponse.json({ error: "Access denied." }, { status: 403 });
  }

  try {
    const { action, email, firstName, lastName, courseId, enrollmentId } = await req.json();

    if (action === "create") {
      if (!email || !courseId) {
        return NextResponse.json({ error: "Email and courseId are required." }, { status: 400 });
      }

      // Check if user exists, if not create stub
      let user = await db.user.findUnique({ where: { email } });
      let wasCreated = false;

      if (!user) {
        const passwordHash = await bcrypt.hash("TebiWelcome123!", 12);
        user = await db.user.create({
          data: {
            email,
            firstName: firstName || "Offline",
            lastName: lastName || "Learner",
            passwordHash,
            role: "STUDENT"
          }
        });
        wasCreated = true;
      }

      const reference = `manual_${Date.now()}`;
      
      const enrollment = await db.enrollment.upsert({
        where: { userId_courseId: { userId: user.id, courseId } },
        create: {
          userId: user.id,
          courseId,
          paystackRef: reference
        },
        update: {}
      });

      return NextResponse.json({
        success: true,
        wasCreated,
        message: wasCreated 
          ? `Placeholder account created for ${email} with password: TebiWelcome123! Enrollment successful.` 
          : `Successfully enrolled existing user ${email}.`,
        enrollment
      });
    }

    if (action === "delete") {
      if (!enrollmentId) {
        return NextResponse.json({ error: "enrollmentId is required." }, { status: 400 });
      }

      await db.enrollment.delete({
        where: { id: enrollmentId }
      });

      return NextResponse.json({ success: true, message: "Enrollment revoked successfully." });
    }

    return NextResponse.json({ error: "Invalid action specified." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
