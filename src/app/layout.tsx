import type { Metadata } from "next";
import { Playfair_Display, Lato, Cormorant_Garamond } from "next/font/google";
import SiteChrome from "@/components/global/SiteChrome";
import "./globals.css";

// Diamond Dreams type system
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
}); // display

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
}); // body

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
}); // accent

export const metadata: Metadata = {
  metadataBase: new URL("https://theeventbusinessinstitute.com"),
  title: {
    default: "Diamond Dreams Conglomerate",
    template: "%s | Diamond Dreams Conglomerate",
  },
  description:
    "Online courses and coaching for event planners in Nigeria and Africa who want to build profitable, structured businesses. Learn pricing, systems, and CEO-level strategy.",
  keywords: [
    "event planning business Nigeria",
    "event planning courses Africa",
    "how to price event planning services",
    "event business coaching",
    "event planner training Jos Nigeria",
    "profitable event business",
    "event planning systems",
    "Dr Emma Collins TEBI",
  ],
  authors: [{ name: "Dr. Emma Collins" }],
  creator: "Diamond Dreams Conglomerate",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Diamond Dreams Conglomerate",
    description:
      "Online courses and coaching for event planners in Nigeria and Africa who want to build profitable, structured businesses.",
    url: "https://theeventbusinessinstitute.com",
    siteName: "Diamond Dreams Conglomerate",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diamond Dreams Conglomerate",
    description:
      "Online courses and coaching for event planners in Nigeria and Africa who want to build profitable, structured businesses.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/ddlogo-dark.JPG",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://theeventbusinessinstitute.com/#org",
      name: "The Event Business Institute",
      url: "https://theeventbusinessinstitute.com",
      logo: "https://theeventbusinessinstitute.com/tebi-logo.png",
      sameAs: [
        "https://instagram.com/theeventbusinessinstitute",
        "https://facebook.com/diamonddreamsevents",
      ],
    },
    {
      "@type": "EducationalOrganization",
      name: "The Event Business Institute",
      description:
        "Training and coaching for event planning entrepreneurs in Nigeria and Africa",
      offers: [
        {
          "@type": "Course",
          name: "Introduction to Event Planning Business",
          description: "Build your event business foundation from the ground up.",
          provider: { "@id": "https://theeventbusinessinstitute.com/#org" },
        },
        {
          "@type": "Course",
          name: "The Authority Event Planner™",
          description:
            "Systems and strategy for established planners ready to scale.",
          provider: { "@id": "https://theeventbusinessinstitute.com/#org" },
        },
      ],
    },
    {
      "@type": "Person",
      name: "Dr. Emma Collins",
      jobTitle: "Founder & CEO",
      worksFor: { "@id": "https://theeventbusinessinstitute.com/#org" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${lato.variable} ${cormorant.variable} font-body antialiased bg-cream text-navy`}
      >
        {/*
          Master layout for the umbrella brand. SiteChrome mounts the global
          Navbar/Footer across every pillar (and hides them on auth screens
          and the authenticated academy app, which carry their own chrome).
        */}
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
