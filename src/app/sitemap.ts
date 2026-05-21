import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://theeventbusinessinstitute.com",
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: "https://theeventbusinessinstitute.com/courses",
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: "https://theeventbusinessinstitute.com/about",
      lastModified: new Date(),
      priority: 0.7,
    },
  ];
}
