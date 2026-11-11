import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const lastModified = "2026-01-01T00:00:00.000Z";

  return [
    { url: base, lastModified },
    { url: `${base}/features`, lastModified },
    { url: `${base}/pricing`, lastModified },
    { url: `${base}/login`, lastModified },
    { url: `${base}/register`, lastModified },
  ];
}
