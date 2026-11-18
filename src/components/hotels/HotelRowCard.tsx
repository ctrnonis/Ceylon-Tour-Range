import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Chip from "@/components/ui/Chip";
import Money from "@/components/ui/Money";
import Photo from "@/components/ui/Photo";
import Rating from "@/components/ui/Rating";
import { amenityLabels, lowestRate } from "@/lib/data/hotels";
import { getLocation } from "@/lib/data/locations";
import { photos } from "@/lib/images";
import type { Hotel } from "@/lib/types";

/** Horizontal hotel result: photo, name, highlights, rating and nightly rate. */
export default function HotelRowCard({ hotel }: { hotel: Hotel }) {
  const scarce = hotel.rooms.some((room) => room.remaining !== undefined && room.remaining <= 2);
  const freeCancellation = hotel.rooms.some((room) => room.freeCancellationDays);

  return (
    <Link href={`/hotels/${hotel.slug}`} className="row-item flex-col items-stretch overflow-hidden !p-0 sm:flex-row">
      <div className="relative h-52 shrink-0 bg-ocean-100 sm:h-auto sm:w-[280px]">
        <Photo src={photos[hotel.photo]} alt={hotel.name} sizes="(min-width: 640px) 280px, 100vw" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3>{hotel.name}</h3>
            <p className="text-sm text-ink-400">
              {getLocation(hotel.location).name} · {hotel.locationNote}
            </p>
          </div>
          {hotel.guidesPick ? (
            <Badge>Guide&apos;s pick</Badge>
          ) : scarce ? (
            <Badge tone="amber">Only a few rooms left</Badge>
          ) : freeCancellation ? (
            <Badge tone="green">Free cancellation</Badge>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {hotel.amenities.slice(0, 4).map((amenity) => (
            <Chip key={amenity}>{amenityLabels[amenity]}</Chip>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <Rating value={hotel.rating} count={hotel.reviewCount} compact />
          <span className="price">
            <Money usd={lowestRate(hotel)} /> <small>/ night</small>
          </span>
        </div>
      </div>
    </Link>
  );
}
