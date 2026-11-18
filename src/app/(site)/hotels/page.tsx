import type { Metadata } from "next";
import HotelsExplorer from "@/components/hotels/HotelsExplorer";
import StaySearchBar from "@/components/hotels/StaySearchBar";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Hotels",
  description: "Hand-picked hotels, villas and eco lodges across Sri Lanka.",
};

export default async function HotelsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;

  return (
    <>
      <PageHero eyebrow="Hotels directory" title="Stay somewhere worth writing home about">
        <StaySearchBar initialQuery={q} />
      </PageHero>
      <Container className="py-10 sm:py-14">
        {/* key resets local filter state when a new search is submitted */}
        <HotelsExplorer key={q} initialQuery={q} />
      </Container>
    </>
  );
}
