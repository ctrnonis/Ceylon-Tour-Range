import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import HotelCheckout from "@/components/hotels/HotelCheckout";
import Container from "@/components/ui/Container";
import { getHotel } from "@/lib/data/hotels";
import { nightsBetween } from "@/lib/format";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export default async function HotelBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ room?: string; in?: string; out?: string; guests?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const hotel = getHotel(slug);
  if (!hotel) notFound();

  const room = hotel.rooms.find((r) => r.id === query.room);
  const validDates =
    ISO_DATE.test(query.in ?? "") && ISO_DATE.test(query.out ?? "") && nightsBetween(query.in!, query.out!) > 0;
  // Missing or bad parameters: send the visitor back to choose again.
  if (!room || !validDates) redirect(`/hotels/${hotel.slug}`);

  const guests = Math.min(room.sleeps, Math.max(1, Number(query.guests) || 1));

  return (
    <Container className="py-10 sm:py-14">
      <HotelCheckout hotel={hotel} room={room} checkIn={query.in!} checkOut={query.out!} guests={guests} />
    </Container>
  );
}
