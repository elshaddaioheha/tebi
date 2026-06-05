import type { Metadata } from "next";
import Hero from "@/components/academy/Hero";
import Problem from "@/components/academy/Problem";
import Solution from "@/components/academy/Solution";
import Reset from "@/components/academy/Reset";
import Resources from "@/components/academy/Resources";
import About from "@/components/academy/About";

export const metadata: Metadata = {
  // Absolute title avoids the root "%s | TEBI" template producing "TEBI | TEBI".
  title: { absolute: "TEBI — The Event Business Institute" },
  description:
    "The Event Business Institute (TEBI) — courses and coaching for event planners ready to build profitable, structured businesses.",
};

// Public academy landing. The global Navbar/Footer are provided by the root
// layout (SiteChrome); the authenticated app lives under academy/(app).
export default function AcademyLandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <Reset />
      <Resources />
      <About />
    </main>
  );
}
