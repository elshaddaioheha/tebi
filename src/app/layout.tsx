import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theeventbusinessinstitute.com"),
  title: {
    default: "TEBI — Event Business Training for Planners in Nigeria & Africa",
    template: "%s | TEBI",
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
  creator: "The Event Business Institute",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "TEBI — Event Business Training for Planners in Nigeria & Africa",
    description:
      "Online courses and coaching for event planners in Nigeria and Africa who want to build profitable, structured businesses.",
    url: "https://theeventbusinessinstitute.com",
    siteName: "The Event Business Institute",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEBI — Event Business Training for Planners in Nigeria & Africa",
    description:
      "Online courses and coaching for event planners in Nigeria and Africa who want to build profitable, structured businesses.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/tebi-logo.png",
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
        className={`${playfair.variable} ${plusJakarta.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
