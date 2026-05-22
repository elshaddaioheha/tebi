import { auth } from "@/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import CourseProgress from "@/components/lms/CourseProgress";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user!.id!;

  const enrollments = await db.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          modules: {
            include: {
              lessons: { select: { id: true } },
            },
          },
        },
      },
    },
    orderBy: { enrolledAt: "desc" },
  });

  const enrollmentsWithProgress = await Promise.all(
    enrollments.map(async (enrollment) => {
      const totalLessons = enrollment.course.modules.flatMap((m) => m.lessons).length;
      const completedLessons = await db.progress.count({
        where: {
          userId,
          completed: true,
          lesson: { module: { courseId: enrollment.courseId } },
        },
      });
      return { ...enrollment, totalLessons, completedLessons };
    })
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-serif text-primary mb-2">My Courses</h1>
      <p className="text-primary/60 mb-12">Pick up where you left off.</p>

      {enrollmentsWithProgress.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-primary/10 rounded-3xl">
          <p className="text-primary/50 mb-6">You haven&apos;t enrolled in any courses yet.</p>
          <Link
            href="/#courses"
            className="bg-brand text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-light transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {enrollmentsWithProgress.map(({ course, totalLessons, completedLessons }) => (
            <div
              key={course.id}
              className="border border-primary/10 rounded-3xl p-8 hover:shadow-lg transition-shadow"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-3 block">
                {course.tier}
              </span>
              <h2 className="text-2xl font-serif text-primary mb-4">{course.title}</h2>

              <CourseProgress completed={completedLessons} total={totalLessons} />

              <Link
                href={`/courses/${course.slug}`}
                className="mt-6 block text-center bg-brand text-white py-3 rounded-full font-semibold hover:bg-brand-light transition-colors"
              >
                {completedLessons === 0 ? "Start Learning" : "Continue"}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
