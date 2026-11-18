import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { buttonClass } from "@/components/ui/Button";
import Money from "@/components/ui/Money";
import Photo from "@/components/ui/Photo";
import { photos } from "@/lib/images";
import type { Hotel } from "@/lib/types";

/** Room options. "Select" sets ?room= which the reservation card reads. */
export default function RoomList({ hotel }: { hotel: Hotel }) {
  return (
    <div className="flex flex-col gap-4">
      {hotel.rooms.map((room) => (
        <article key={room.id} className="row-item flex-col items-stretch overflow-hidden !p-0 sm:flex-row">
          <div className="relative h-44 shrink-0 bg-ocean-100 sm:h-auto sm:w-[180px]">
            <Photo src={photos[room.photo]} alt={room.name} sizes="(min-width: 640px) 180px, 100vw" />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3>{room.name}</h3>
              <span className="price">
                <Money usd={room.priceUsdPerNight} /> <small>/ night</small>
              </span>
            </div>
            <p className="text-sm text-ink-400">
              {[room.bed, `${room.sizeM2} m²`, ...room.features, `Sleeps ${room.sleeps}`].join(" · ")}
            </p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
              {room.remaining !== undefined && room.remaining <= 2 ? (
                <Badge tone="amber">Only {room.remaining} left at this price</Badge>
              ) : room.freeCancellationDays ? (
                <Badge tone="green">Free cancellation</Badge>
              ) : (
                <Badge tone="red">Non-refundable</Badge>
              )}
              <Link href={`?room=${room.id}#reserve`} scroll={false} className={buttonClass({ size: "sm" })}>
                Select
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
