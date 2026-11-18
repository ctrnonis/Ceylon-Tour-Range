import { ArrowRight } from "lucide-react";
import AttractionCard from "@/components/attractions/AttractionCard";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { featuredAttractions } from "@/lib/data/attractions";

export default function FeaturedDestinations() {
  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <SectionHeading
          eyebrow="Featured destinations"
          title="Where the island calls"
          description="Hand-picked highlights from our community of local guides."
          className="mb-10"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredAttractions.map((attraction) => (
            <AttractionCard key={attraction.slug} attraction={attraction} showCount />
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/attractions" variant="ghost">
            Browse all attractions <ArrowRight aria-hidden />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
