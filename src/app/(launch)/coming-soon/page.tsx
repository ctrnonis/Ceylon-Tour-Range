import type { Metadata } from "next";
import AboutSection from "@/components/launch/AboutSection";
import ComingFeatures from "@/components/launch/ComingFeatures";
import LaunchFooter from "@/components/launch/LaunchFooter";
import LaunchHero from "@/components/launch/LaunchHero";
import PhotoStrip from "@/components/launch/PhotoStrip";
import StayInTouch from "@/components/launch/StayInTouch";
import VisionMission from "@/components/launch/VisionMission";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} | Launching soon` },
  description:
    "A new way to explore Sri Lanka: themed trips, trusted taxis, hand-picked stays and local guides, all in one place. Launching soon.",
  alternates: { canonical: "/" },
};

/**
 * Pre-launch landing page, served at "/" while PRE_LAUNCH is on
 * (see lib/launch.ts). Self-contained: its own hero header and footer.
 */
export default function ComingSoonPage() {
  return (
    <main className="flex-1">
      <LaunchHero />
      <AboutSection />
      <VisionMission />
      <ComingFeatures />
      <PhotoStrip />
      <StayInTouch />
      <LaunchFooter />
    </main>
  );
}
