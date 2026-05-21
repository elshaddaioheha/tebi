import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";

export default async function LmsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* LMS top bar */}
      <header className="bg-primary text-white px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image src="/tebi-logo.png" alt="TEBI" fill className="object-contain" />
          </div>
          <span className="font-serif font-bold text-lg">TEBI</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
            My Courses
          </Link>
          <span className="text-white/40">|</span>
          <span className="text-white/60">{session.user.name ?? session.user.email}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="text-white/60 hover:text-secondary transition-colors text-sm">
              Sign out
            </button>
          </form>
        </nav>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
