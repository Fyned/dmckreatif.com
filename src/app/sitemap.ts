import type { MetadataRoute } from "next";

const baseUrl = "https://dmckreatif.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "fr", "tr", "de"];
  const pages = [
    "",
    "/services",
    "/portfolio",
    "/pricing",
    "/about",
    "/blog",
    "/contact",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
