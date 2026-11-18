import Container from "@/components/ui/Container";
import Photo from "@/components/ui/Photo";
import { photos } from "@/lib/images";
import HeroSearch from "./HeroSearch";

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-media absolute inset-0">
        <Photo src={photos.ellaTrain} alt="Train crossing the jungle near Ella, Sri Lanka" sizes="100vw" priority />
      </div>
      <Container className="relative z-10 py-16 sm:py-24">
        <span className="eyebrow !text-sun-500">The island, all in one place</span>
        <h1>
          Explore Sri Lanka,
          <br />
          <em>your way.</em>
        </h1>
        <p className="lede max-w-xl">
          Book taxis, reserve hotels and build day-by-day itineraries with local guides. One platform for the whole
          journey.
        </p>
        <HeroSearch />
      </Container>
    </header>
  );
}
