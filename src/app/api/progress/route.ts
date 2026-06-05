import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const { lessonId } = await req.json();
  if (!lessonId) {
    return NextResponse.json({ error: "lessonId is required." }, { status: 400 });
  }

  // Verify user is enrolled in the course that owns this lesson
  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { select: { courseId: true } } },
  });
  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found." }, { status: 404 });
  }

  const enrolled = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId: lesson.module.courseId,
      },
    },
  });
  if (!enrolled) {
    return NextResponse.json({ error: "Not enrolled in this course." }, { status: 403 });
  }

  const progress = await db.lessonProgress.upsert({
    where: { userId_lessonId: { userId: session.user.id, lessonId } },
    create: { userId: session.user.id, lessonId, completed: true, completedAt: new Date() },
    update: { completed: true, completedAt: new Date() },
  });

  return NextResponse.json({ progress });
}
