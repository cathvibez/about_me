import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllCaseStudies } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.meta.url;
  return [
    { url: base, priority: 1 },
    { url: `${base}/resume`, priority: 0.8 },
    ...getAllCaseStudies().map((s) => ({ url: `${base}/work/${s.slug}`, priority: 0.9 })),
  ];
}
