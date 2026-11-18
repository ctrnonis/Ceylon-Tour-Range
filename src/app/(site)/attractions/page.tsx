import type { Metadata } from "next";
import AttractionsExplorer from "@/components/attractions/AttractionsExplorer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { attractions } from "@/lib/data/attractions";

export const metadata: Metadata = {
  title: "Attractions",
  description: "Heritage sites, beaches, hikes and wildlife across Sri Lanka, added and verified by local guides.",
};

export default async function AttractionsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Attractions directory"
        title="Find your next stop"
        description={`${attractions.length} places across the island, added and verified by local guides.`}
      />
      <Container className="py-10 sm:py-14">
        <AttractionsExplorer initialQuery={q ?? ""} />
      </Container>
    </>
  );
}
