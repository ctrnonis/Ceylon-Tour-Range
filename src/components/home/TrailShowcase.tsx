import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TrailCard from "@/components/trails/TrailCard";
import { trails } from "@/lib/data/trails";

/** The four themed trails: ready-made routes that seed the trip planner. */
export default function TrailShowcase() {
  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <SectionHeading
          eyebrow="Four ways to see the island"
          title="Start from a themed trail"
          description="Every trail is a real, drivable route with its own pace and highlights. Pick one and the planner builds your days for you."
          className="mb-10"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trails.map((trail) => (
            <TrailCard key={trail.slug} trail={trail} />
          ))}
        </div>
      </Container>
    </section>
  );
}
