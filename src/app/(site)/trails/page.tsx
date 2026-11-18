import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import TrailCard from "@/components/trails/TrailCard";
import { trails } from "@/lib/data/trails";

export const metadata: Metadata = {
  title: "Themed Trails",
  description: "Four ready-made Sri Lanka routes: coastal, cultural, wild and modern.",
};

export default function TrailsPage() {
  return (
    <>
      <PageHero
        eyebrow="Themed trails"
        title="Four trails, one island"
        description="Each trail is a themed route with its own pace and highlights. Open one to see the full day by day, then take it into the planner."
      />
      <Container className="grid gap-6 py-14 sm:grid-cols-2 sm:py-20 lg:grid-cols-4">
        {trails.map((trail) => (
          <TrailCard key={trail.slug} trail={trail} />
        ))}
      </Container>
    </>
  );
}
