import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography is served from Unsplash until the client's
    // own licensed images are added under /public/images.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
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
