import type { Metadata } from "next";
import LeapPageContent from "@/components/foundation/LeapPageContent";

export const metadata: Metadata = {
  title: "LEAP | Emma Collins Center for Leadership & Entrepreneurship",
  description:
    "Empowering creative visionaries and entrepreneurs to scale their ventures, build structural foundations, and lead with purpose. Join the LEAP program by the Emma Collins Center.",
  keywords: [
    "LEAP foundation",
    "Emma Collins Center for LEAP",
    "leadership training Jos Nigeria",
    "creative entrepreneurship Africa",
    "business empowerment Jos",
    "women business program Nigeria",
    "Diamond Dreams Foundation",
    "Emma Collins Jos",
  ],
  alternates: {
    canonical: "https://leap.diamonddreamsgroup.com/",
  },
  openGraph: {
    title: "LEAP | Emma Collins Center for Leadership & Entrepreneurship",
    description:
      "Empowering creative visionaries and entrepreneurs to scale their ventures, build structural foundations, and lead with purpose.",
    url: "https://leap.diamonddreamsgroup.com",
    siteName: "Emma Collins Center for LEAP",
    images: [
      {
        url: "/leap-hero.jpg",
        width: 1200,
        height: 630,
        alt: "LEAP - Leadership, Empowerment, Entrepreneurship, Action & Purpose",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LEAP | Emma Collins Center for Leadership & Entrepreneurship",
    description:
      "Empowering creative visionaries and entrepreneurs to scale their ventures, build structural foundations, and lead with purpose.",
    images: ["/leap-hero.jpg"],
  },
};

export default function FoundationLeapPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://leap.diamonddreamsgroup.com/#organization",
    "name": "Emma Collins Center for LEAP",
    "url": "https://leap.diamonddreamsgroup.com",
    "logo": "https://diamonddreamsgroup.com/leap-logo.png",
    "description": "An initiative of Diamond Dreams Foundation empowering next-generation leaders and creative entrepreneurs.",
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
      <LeapPageContent />
    </main>
  );
}
