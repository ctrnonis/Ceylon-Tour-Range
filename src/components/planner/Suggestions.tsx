"use client";

import Link from "next/link";
import { Lightbulb, Plus } from "lucide-react";
import Panel from "@/components/ui/Panel";
import Photo from "@/components/ui/Photo";
import Rating from "@/components/ui/Rating";
import { notify } from "@/components/ui/Toaster";
import { attractions } from "@/lib/data/attractions";
import { getLocation } from "@/lib/data/locations";
import { straightLineKm } from "@/lib/geo";
import { photos } from "@/lib/images";
import { addStop } from "@/lib/store/trip-store";
import type { ItineraryDay } from "@/lib/types";
import { setDragPayload } from "./dnd";

const SUGGESTION_COUNT = 4;

/** Attractions closest to the selected day's town, not already in the trip. Drag or press + to add. */
export default function Suggestions({ tripId, day, usedSlugs }: { tripId: string; day: ItineraryDay; usedSlugs: Set<string> }) {
  const town = getLocation(day.location);
  const nearby = attractions
    .filter((attraction) => !usedSlugs.has(attraction.slug))
    .map((attraction) => ({ attraction, km: straightLineKm(town, attraction.coordinates) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, SUGGESTION_COUNT);

  return (
    <div className="flex flex-col gap-5">
      <section aria-labelledby="suggestions-heading">
        <h3 id="suggestions-heading" className="mb-3">
          Near {town.name.split(" (")[0]}
        </h3>
        <ul className="flex flex-col gap-3">
          {nearby.map(({ attraction, km }) => (
            <li
              key={attraction.slug}
              draggable
              onDragStart={(event) => setDragPayload(event, { type: "attraction", slug: attraction.slug })}
              className="row-item row-item-interactive cursor-grab !gap-3 !p-3"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-ocean-100">
                <Photo src={photos[attraction.photo]} alt="" sizes="56px" />
              </div>
              <div className="min-w-0 flex-1">
                <Link href={`/attractions/${attraction.slug}`} className="block truncate text-sm font-bold hover:text-ocean-700">
                  {attraction.name}
                </Link>
                <div className="flex items-center gap-1.5 text-xs text-ink-400">
                  <Rating value={attraction.rating} compact className="[&>span]:!text-xs" />· {attraction.durationHours} h ·{" "}
                  {km < 1 ? "in town" : `${Math.round(km)} km`}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-sm btn-icon"
                aria-label={`Add ${attraction.name} to this day`}
                onClick={() => {
                  addStop(tripId, day.id, { kind: "attraction", title: attraction.name, time: attraction.bestStart, attractionSlug: attraction.slug });
                  notify(`${attraction.name} added`);
                }}
              >
                <Plus aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <Panel>
        <strong className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-sun-500" aria-hidden /> Guide tip
        </strong>
        <p className="mt-2 text-sm">
          Trains from Kandy sell out in season. Reserve 2nd-class window seats at least three days ahead.
        </p>
        <p className="mt-2 text-sm text-ink-400">— Nuwan, verified guide</p>
      </Panel>
    </div>
  );
}
