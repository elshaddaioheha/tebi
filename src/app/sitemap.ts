import { MetadataRoute } from "next";

const BASE = "https://theeventbusinessinstitute.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: BASE, lastModified, priority: 1.0 },
    { url: `${BASE}/decor`, lastModified, priority: 0.8 },
    { url: `${BASE}/bridal`, lastModified, priority: 0.8 },
    { url: `${BASE}/foundation`, lastModified, priority: 0.8 },
    { url: `${BASE}/resources`, lastModified, priority: 0.7 },
    { url: `${BASE}/about`, lastModified, priority: 0.7 },
  ];
}
