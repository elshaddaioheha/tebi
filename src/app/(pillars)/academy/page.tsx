import type { Metadata } from "next";
import Hero from "@/components/academy/Hero";
import Problem from "@/components/academy/Problem";
import Solution from "@/components/academy/Solution";
import Reset from "@/components/academy/Reset";
import Resources from "@/components/academy/Resources";

export const metadata: Metadata = {
  // Absolute title avoids the root "%s | TEBI" template producing "TEBI | TEBI".
  title: { absolute: "TEBI | The Event Business Institute — Profitable Event Business Coaching" },
  description:
    "The Event Business Institute (TEBI) provides premium courses, coaching, and structure for event planners ready to build highly profitable, stress-free businesses. Led by Dr. Emma Collins.",
  keywords: [
    "TEBI",
    "The Event Business Institute",
    "event planning courses Nigeria",
    "event business coaching Africa",
    "how to price event planning services",
    "event planning business systems",
    "event planner training Jos Nigeria",
    "Dr Emma Collins TEBI",
    "profitable event planner business",
  ],
  alternates: {
    canonical: "https://tebi.diamonddreamsgroup.com/",
  },
  openGraph: {
    title: "TEBI | The Event Business Institute — Profitable Event Business Coaching",
    description:
      "Build a structured, highly profitable, and respected event planning business with premium coaching and courses from TEBI.",
    url: "https://tebi.diamonddreamsgroup.com",
    siteName: "The Event Business Institute (TEBI)",
    images: [
      {
        url: "/tebi-logo.png",
        width: 800,
        height: 600,
        alt: "TEBI — The Event Business Institute",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEBI | The Event Business Institute — Profitable Event Business Coaching",
    description:
      "Build a structured, highly profitable, and respected event planning business with premium coaching and courses from TEBI.",
    images: ["/tebi-logo.png"],
  },
};

// Public academy landing. The global Navbar/Footer are provided by the root
// layout (SiteChrome); the authenticated app lives under academy/(app).
export default function AcademyLandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://tebi.diamonddreamsgroup.com/#organization",
    "name": "The Event Business Institute (TEBI)",
    "url": "https://tebi.diamonddreamsgroup.com",
    "logo": "https://diamonddreamsgroup.com/tebi-logo.png",
    "description": "Premium coaching and courses designed to help creative event professionals build structured, high-margin, scalable businesses.",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Diamond Dreams Conglomerate",
      "url": "https://diamonddreamsgroup.com"
    },
    "founder": {
      "@type": "Person",
      "name": "Dr. Emma Collins"
    }
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Problem />
      <Solution />
      <Reset />
      <Resources />
    </main>
  );
}
