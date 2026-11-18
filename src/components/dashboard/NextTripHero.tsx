"use client";

import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { buttonClass } from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import { useNow } from "@/hooks/useNow";
import { getLocation } from "@/lib/data/locations";
import { addDays, formatDate } from "@/lib/format";
import { photos } from "@/lib/images";
import { setActiveItinerary } from "@/lib/store/trip-store";
import type { Itinerary } from "@/lib/types";

/** Photo banner for the next upcoming trip with a live countdown. */
export default function NextTripHero({ trip }: { trip: Itinerary }) {
  const now = useNow();
  const start = new Date(`${trip.startDate}T00:00:00`).getTime();
  const remaining = now === null ? null : Math.max(0, start - now);
  const parts =
    remaining === null
      ? null
      : {
          Days: Math.floor(remaining / 86_400_000),
          Hrs: Math.floor((remaining / 3_600_000) % 24),
          Min: Math.floor((remaining / 60_000) % 60),
        };

  const towns = trip.days
    .map((day) => getLocation(day.location).name.split(" (")[0])
    .filter((town, i, all) => town !== all[i - 1]);
  const stopCount = trip.days.reduce((total, day) => total + day.stops.length, 0);

  return (
    <section className="photo-banner min-h-[240px] shadow-[var(--shadow-md)]" aria-label="Next trip">
      <Photo src={photos.ellaTrain} alt="" sizes="(min-width: 1024px) 900px, 100vw" />
      <div className="photo-banner-body flex min-h-[240px] flex-col justify-end gap-5 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <Badge tone="amber">Next trip</Badge>
          <h2 className="mt-3">{trip.name}</h2>
          <p className="text-sm text-white/85">
            {formatDate(trip.startDate, { year: undefined })} – {formatDate(addDays(trip.startDate, trip.days.length - 1))} · {towns.join(" → ")} ·{" "}
            {stopCount} stops
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/plan" onClick={() => setActiveItinerary(trip.id)} className={buttonClass({ variant: "accent", size: "sm" })}>
              Open itinerary
            </Link>
            <Link href="/taxi" className={buttonClass({ variant: "ghost", size: "sm" })}>
              Book a transfer
            </Link>
          </div>
        </div>
        {parts ? (
          <dl className="hidden gap-2.5 sm:flex" aria-label="Countdown">
            {Object.entries(parts).map(([label, value]) => (
              <div key={label} className="min-w-[62px] rounded-[var(--radius-md)] border border-white/20 bg-white/15 px-3 py-2 text-center backdrop-blur">
                <dd className="font-display text-2xl leading-tight">{String(value).padStart(2, "0")}</dd>
                <dt className="text-[0.66rem] tracking-widest uppercase opacity-75">{label}</dt>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
