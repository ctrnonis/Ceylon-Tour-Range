import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ceylon-tour-range.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/guide", "/admin", "/hotels/*/book"] },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
