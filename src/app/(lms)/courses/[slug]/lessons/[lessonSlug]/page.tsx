import { auth } from "@/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoPlayer from "@/components/lms/VideoPlayer";
import MarkCompleteButton from "@/components/lms/MarkCompleteButton";
import { CheckCircle2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const session = await auth();
  const userId = session!.user!.id!;

  const lesson = await db.lesson.findFirst({
    where: { slug: lessonSlug, module: { course: { slug } } },
    include: {
      module: {
        include: {
          course: { select: { id: true, slug: true, title: true } },
          lessons: { orderBy: { order: "asc" }, select: { id: true, slug: true, title: true, order: true } },
        },
      },
    },
  });

  if (!lesson) notFound();

  const courseId = lesson.module.course.id;

  // Ensure enrolled
  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
  if (!enrollment) notFound();

  const progress = await db.progress.findUnique({
    where: { userId_lessonId: { userId, lessonId: lesson.id } },
  });

  const allLessons = lesson.module.lessons as { id: string; slug: string; title: string; order: number }[];
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar — lesson list */}
      <aside className="lg:w-72 border-r border-primary/10 bg-primary/[0.01] p-6 shrink-0">
        <h3 className="font-bold text-primary text-sm uppercase tracking-widest mb-4">
          {lesson.module.course.title}
        </h3>
        <ul className="space-y-1">
          {allLessons.map((l) => (
            <li key={l.id}>
              <Link
                href={`/courses/${slug}/lessons/${l.slug}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                  l.id === lesson.id
                    ? "bg-primary text-white font-semibold"
                    : "text-primary/60 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <CheckCircle2
                  size={16}
                  className={l.id === lesson.id ? "opacity-60" : "opacity-30"}
                />
                {l.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <div className="flex-1 px-6 lg:px-12 py-10 max-w-3xl">
        <h1 className="text-3xl font-serif text-primary mb-6">{lesson.title}</h1>

        {lesson.videoId && (
          <div className="mb-8">
            <VideoPlayer videoId={lesson.videoId} title={lesson.title} />
          </div>
        )}

        <div
          className="prose prose-primary max-w-none text-primary/80 leading-relaxed mb-10"
          dangerouslySetInnerHTML={{ __html: lesson.body }}
        />

        <div className="flex items-center justify-between border-t border-primary/10 pt-8">
          <div className="flex gap-4">
            {prevLesson && (
              <Link
                href={`/courses/${slug}/lessons/${prevLesson.slug}`}
                className="text-sm text-primary/60 hover:text-primary transition-colors"
              >
                ← {prevLesson.title}
              </Link>
            )}
          </div>

          <MarkCompleteButton
            lessonId={lesson.id}
            initialCompleted={progress?.completed ?? false}
          />

          <div className="flex gap-4">
            {nextLesson && (
              <Link
                href={`/courses/${slug}/lessons/${nextLesson.slug}`}
                className="text-sm text-primary/60 hover:text-primary transition-colors"
              >
                {nextLesson.title} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
