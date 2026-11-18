import type { Metadata } from "next";
import Planner from "@/components/planner/Planner";
import Container from "@/components/ui/Container";
import { getTrailBySlug } from "@/lib/data/trails";

export const metadata: Metadata = {
  title: "Trip Planner",
  description: "Build a day-by-day Sri Lanka itinerary: drag in attractions, map your route and share it with your group.",
};

export default async function PlanPage({ searchParams }: { searchParams: Promise<{ trail?: string }> }) {
  const { trail: slug } = await searchParams;
  const trail = slug ? getTrailBySlug(slug) : undefined;

  return (
    <Container className="py-10 sm:py-12">
      <Planner trail={trail} />
    </Container>
  );
}
