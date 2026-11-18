import type { Metadata } from "next";
import RideHistory from "@/components/taxi/RideHistory";
import TaxiBooker from "@/components/taxi/TaxiBooker";
import Container from "@/components/ui/Container";
import { locations } from "@/lib/data/locations";
import type { LocationId } from "@/lib/types";

export const metadata: Metadata = {
  title: "Taxi Booking",
  description: "Fixed-fare taxis, vans and tuk-tuks anywhere in Sri Lanka, with live driver tracking.",
};

const isLocation = (value?: string): value is LocationId => locations.some((location) => location.id === value);

export default async function TaxiPage({ searchParams }: { searchParams: Promise<{ from?: string; to?: string }> }) {
  const { from, to } = await searchParams;
  const pickup = isLocation(from) ? from : "cmb-airport";
  const dropoff = isLocation(to) && to !== pickup ? to : pickup === "ella" ? "colombo" : "ella";

  return (
    <Container className="py-10 sm:py-14">
      <TaxiBooker key={`${pickup}-${dropoff}`} initialPickup={pickup} initialDropoff={dropoff} />
      <RideHistory />
    </Container>
  );
}
