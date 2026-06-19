import type { Metadata } from "next";
import LeapPageContent from "@/components/foundation/LeapPageContent";

export const metadata: Metadata = {
  title: "LEAP — Leadership, Empowerment, Entrepreneurship, Action & Purpose",
  description:
    "The Emma Collins Center for LEAP (a Diamond Dreams Foundation initiative) — empowering next-generation leaders and creative entrepreneurs to scale their ventures and make a meaningful impact.",
};

export default function FoundationLeapPage() {
  return (
    <main className="min-h-screen">
      <LeapPageContent />
    </main>
  );
}
