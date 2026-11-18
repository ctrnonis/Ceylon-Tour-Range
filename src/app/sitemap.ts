import type { MetadataRoute } from "next";
import { attractions } from "@/lib/data/attractions";
import { hotels } from "@/lib/data/hotels";
import { trails } from "@/lib/data/trails";

/** Set NEXT_PUBLIC_SITE_URL in Vercel once the custom domain is live. */
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ceylon-tour-range.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/trails",
    "/attractions",
    "/hotels",
    "/taxi",
    "/plan",
    "/about",
    "/contact",
    "/faq",
    "/legal",
  ];
  return [
    ...staticPaths.map((path) => ({ url: `${BASE_URL}${path}` })),
    ...trails.map((trail) => ({ url: `${BASE_URL}/trails/${trail.slug}` })),
    ...attractions.map((attraction) => ({ url: `${BASE_URL}/attractions/${attraction.slug}` })),
    ...hotels.map((hotel) => ({ url: `${BASE_URL}/hotels/${hotel.slug}` })),
  ];
}
