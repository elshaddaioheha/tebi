export const siteMeta = {
  name: "Diamond Dreams Conglomerate",
  shortName: "Diamond Dreams",
  url: "https://theeventbusinessinstitute.com",
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
  ogImage: "/og-image.jpg",
  twitter: "@TEBIInstitute",
};

export function generatePageMeta(title: string, description?: string) {
  return {
    title: `${title} | ${siteMeta.shortName}`,
    description: description ?? siteMeta.description,
    openGraph: {
      title,
      description: description ?? siteMeta.description,
      url: siteMeta.url,
      siteName: siteMeta.name,
      images: [{ url: siteMeta.ogImage, width: 1200, height: 630 }],
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description: description ?? siteMeta.description,
      images: [siteMeta.ogImage],
    },
  };
}
