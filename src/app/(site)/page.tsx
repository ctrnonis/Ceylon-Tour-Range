import Hero from "@/components/home/Hero";
import QuickServices from "@/components/home/QuickServices";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import TrailShowcase from "@/components/home/TrailShowcase";
import HowItWorks from "@/components/home/HowItWorks";
import GuideBanner from "@/components/home/GuideBanner";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickServices />
      <FeaturedDestinations />
      <TrailShowcase />
      <HowItWorks />
      <GuideBanner />
      <Testimonials />
    </>
  );
}
