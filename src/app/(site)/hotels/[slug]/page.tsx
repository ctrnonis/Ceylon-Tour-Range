import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { amenityIcons } from "@/components/hotels/amenity-icons";
import ReservePanel from "@/components/hotels/ReservePanel";
import RoomList from "@/components/hotels/RoomList";
import IslandMap from "@/components/map/IslandMap";
import ReviewList from "@/components/reviews/ReviewList";
import Badge from "@/components/ui/Badge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Container from "@/components/ui/Container";
import Gallery from "@/components/ui/Gallery";
import Rating from "@/components/ui/Rating";
import { amenityLabels, getHotel, hotels } from "@/lib/data/hotels";
import { getLocation } from "@/lib/data/locations";

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return hotels.map((hotel) => ({ slug: hotel.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const hotel = getHotel((await params).slug);
  return hotel ? { title: hotel.name, description: hotel.description } : { title: "Hotel not found" };
}

export default async function HotelPage({ params }: { params: PageParams }) {
  const hotel = getHotel((await params).slug);
  if (!hotel) notFound();
  const location = getLocation(hotel.location);

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs items={[{ label: "Hotels", href: "/hotels" }, { label: location.name, href: `/hotels?q=${location.name}` }, { label: hotel.name }]} />
        <Gallery images={hotel.gallery} alt={hotel.name} layout="trio" />
      </Container>

      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="!text-[clamp(2rem,4vw,3rem)]">{hotel.name}</h1>
              <p className="mt-2 flex flex-wrap items-center gap-2 text-ink-400">
                <Rating value={hotel.rating} count={hotel.reviewCount} />· {location.name}, {location.district} District
              </p>
            </div>
            {hotel.guidesPick ? <Badge>Guide&apos;s pick</Badge> : null}
          </div>
          <p className="mt-4 text-ink-600">{hotel.description}</p>

          <div className="divider" />
          <h3>Amenities</h3>
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {hotel.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity];
              return (
                <li key={amenity} className="flex items-center gap-2 text-sm">
                  <Icon className="h-5 w-5 text-ocean-500" aria-hidden /> {amenityLabels[amenity]}
                </li>
              );
            })}
          </ul>

          <div className="divider" />
          <h3 className="mb-3">Choose your room</h3>
          <RoomList hotel={hotel} />

          <div className="divider" />
          <h3 className="mb-3">Location</h3>
          <p className="mb-3 text-sm text-ink-400">{hotel.locationNote}</p>
          <IslandMap className="h-[300px]" markers={[{ id: hotel.slug, coordinates: hotel.coordinates, label: hotel.name, tone: "teal" }]} showLabels />

          <div className="divider" />
          <ReviewList reviews={hotel.reviews} subject={hotel.name} />
        </div>

        <div>
          <Suspense fallback={<div className="panel h-[520px]" aria-busy />}>
            <ReservePanel hotel={hotel} />
          </Suspense>
        </div>
      </Container>
    </>
  );
}
