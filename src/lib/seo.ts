export const siteMeta = {
  name: "Diamond Dreams Conglomerate",
  shortName: "Diamond Dreams",
  url: "https://diamonddreamsgroup.com",
  description:
    "Diamond Dreams Conglomerate is a luxury event, lifestyle, and educational brand incorporating Diamond Dreams Events, Diamond Dreams Decor, Diamond Dreams Bridal and Flower, Diamond Dreams Foundation (LEAP), and The Event Business Institute (TEBI).",
  keywords: [
    "diamond dreams events",
    "diamond dreams decor",
    "diamond dreams bridal and flower",
    "diamond dreams foundation",
    "the event business institute",
    "TEBI",
    "LEAP",
    "event planning business Nigeria",
    "event planning courses Africa",
    "how to price event planning services",
    "event business coaching",
    "event planner training Jos Nigeria",
    "profitable event business",
    "event planning systems",
    "Dr Emma Collins TEBI",
    "Diamond Dreams Conglomerate",
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
