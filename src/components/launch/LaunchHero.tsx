import { ArrowDown, Sparkles } from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";
import SocialLinks from "@/components/layout/SocialLinks";
import Container from "@/components/ui/Container";
import Photo from "@/components/ui/Photo";
import { photos } from "@/lib/images";

/** Full-height photo hero announcing the platform. */
export default function LaunchHero() {
  return (
    <header className="hero min-h-[100svh] !items-stretch">
      <div className="hero-media absolute inset-0">
        <Photo src={photos.ellaTrain} alt="Train crossing the jungle near Ella, Sri Lanka" sizes="100vw" priority />
      </div>
      <Container className="relative z-10 flex flex-col py-6">
        <div className="flex items-center justify-between">
          <BrandLogo inverted href="/" />
          <SocialLinks className="hidden sm:flex" />
        </div>

        <div className="my-auto max-w-3xl py-16">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            <Sparkles className="h-4 w-4 text-sun-500" aria-hidden /> Launching soon
          </span>
          <h1>
            Sri Lanka, planned by
            <br />
            <em>the people who know it best.</em>
          </h1>
          <p className="lede max-w-xl">
            Ceylon Tour Range is a new way to explore the island: themed trips, trusted taxis, hand-picked stays and
            local guides, all in one place.
          </p>
          <a href="#about" className="btn btn-accent btn-lg mt-9">
            Discover what&apos;s coming <ArrowDown aria-hidden />
          </a>
        </div>
      </Container>
    </header>
  );
}
