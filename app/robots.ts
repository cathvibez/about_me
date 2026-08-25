import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * The site stays out of search until the content is real. `meta.url` is the
 * switch: while it is still the placeholder, every crawler is turned away, so
 * a page titled "Your Name" can never get indexed. Set the real domain in
 * content/site.ts and indexing turns itself on.
 */
const READY = !site.meta.url.includes("example.com");

export default function robots(): MetadataRoute.Robots {
  return READY
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.meta.url}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
