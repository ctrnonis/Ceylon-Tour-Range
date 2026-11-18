import { Compass } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

/** Global 404. Rendered outside the route groups, so it adds the site chrome itself. */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
    <Container className="flex flex-col items-center py-24 text-center">
      <span className="feature-icon mb-5">
        <Compass aria-hidden />
      </span>
      <span className="eyebrow">Page not found</span>
      <h1 className="!text-4xl">This path isn&apos;t on the map</h1>
      <p className="lede max-w-md">The page may have moved. Try one of these instead.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/attractions" variant="ghost">
          Attractions
        </ButtonLink>
        <ButtonLink href="/plan" variant="ghost">
          Trip planner
        </ButtonLink>
      </div>
    </Container>
      </main>
      <Footer />
    </>
  );
}
