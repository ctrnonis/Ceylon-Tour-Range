import type { NextConfig } from "next";
import { PRE_LAUNCH } from "./src/lib/launch";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography is served from Unsplash until the client's
    // own licensed images are added under /public/images.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async rewrites() {
    // Pre-launch: "/" serves the coming-soon page; the full homepage lives at /preview.
    return {
      beforeFiles: PRE_LAUNCH ? [{ source: "/", destination: "/coming-soon" }] : [],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // "My Trips" was folded into the user dashboard in Stage 2.
      { source: "/trips", destination: "/dashboard?tab=itineraries", permanent: false },
      { source: "/help", destination: "/faq", permanent: true },
    ];
  },
};

export default nextConfig;
