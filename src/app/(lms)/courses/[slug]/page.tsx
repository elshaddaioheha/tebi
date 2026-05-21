import { auth } from "@/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Lock } from "lucide-react";
import CourseProgress from "@/components/lms/CourseProgress";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const session = await auth();
  const userId = session!.user!.id!;

  const course = await db.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!course) notFound();

  const [enrollment, completedIds] = await Promise.all([
    db.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
    }),
    db.progress.findMany({
      where: { userId, completed: true, lesson: { module: { courseId: course.id } } },
      select: { lessonId: true },
    }),
  ]);

  const completedSet = new Set(completedIds.map((p) => p.lessonId));
  const totalLessons = course.modules.flatMap((m) => m.lessons).length;
  const completedCount = completedSet.size;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/dashboard" className="text-secondary text-sm font-medium mb-8 inline-block hover:underline">
        ← My Courses
      </Link>

      <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-3 block">
        {course.tier}
      </span>
      <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">{course.title}</h1>
      <p className="text-primary/60 text-lg mb-8">{course.description}</p>

      {enrollment && (
        <div className="mb-10">
          <CourseProgress completed={completedCount} total={totalLessons} />
        </div>
      )}

      <div className="space-y-6">
        {course.modules.map((mod) => (
          <div key={mod.id} className="border border-primary/10 rounded-2xl overflow-hidden">
            <div className="bg-primary/[0.02] px-6 py-4 border-b border-primary/10">
              <h2 className="font-bold text-primary">{mod.title}</h2>
              <p className="text-sm text-primary/50 mt-0.5">
                {mod.lessons.length} lesson{mod.lessons.length !== 1 ? "s" : ""}
              </p>
            </div>
            <ul className="divide-y divide-primary/5">
              {mod.lessons.map((lesson) => {
                const done = completedSet.has(lesson.id);
                const href = enrollment ? `/courses/${slug}/lessons/${lesson.slug}` : null;

                return (
                  <li key={lesson.id}>
                    {href ? (
                      <Link
                        href={href}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-primary/[0.02] transition-colors group"
                      >
                        <CheckCircle2
                          size={20}
                          className={done ? "text-green-500" : "text-primary/20 group-hover:text-primary/40 transition-colors"}
                        />
                        <span className={`flex-1 text-sm font-medium ${done ? "text-primary/50 line-through" : "text-primary"}`}>
                          {lesson.title}
                        </span>
                        {lesson.duration && (
                          <span className="text-xs text-primary/40">
                            {Math.round(lesson.duration / 60)} min
                          </span>
                        )}
                      </Link>
                    ) : (
                      <div className="flex items-center gap-4 px-6 py-4 opacity-50 cursor-not-allowed">
                        <Lock size={20} className="text-primary/40" />
                        <span className="flex-1 text-sm font-medium text-primary">{lesson.title}</span>
                        {lesson.duration && (
                          <span className="text-xs text-primary/40">
                            {Math.round(lesson.duration / 60)} min
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
