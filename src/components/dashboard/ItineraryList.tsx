"use client";

import Link from "next/link";
import { ChevronRight, Trash2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Photo from "@/components/ui/Photo";
import { getTrailBySlug } from "@/lib/data/trails";
import { photos } from "@/lib/images";
import { deleteItinerary, setActiveItinerary } from "@/lib/store/trip-store";
import type { Itinerary } from "@/lib/types";

/** Saved itineraries as rows; opening one makes it the planner's active trip. */
export default function ItineraryList({ trips, allowDelete = false }: { trips: Itinerary[]; allowDelete?: boolean }) {
  return (
    <ul className="flex flex-col gap-3">
      {trips.map((trip) => {
        const stops = trip.days.reduce((total, day) => total + day.stops.length, 0);
        const empty = trip.days.filter((day) => day.stops.length === 0).length;
        const photo = trip.trail ? getTrailBySlug(trip.trail)?.photo : undefined;
        return (
          <li key={trip.id} className="row-item !p-3">
            <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[14px] bg-ocean-100">
              <Photo src={photos[photo ?? (trip.travellers > 2 ? "mountains" : "beachSunset")]} alt="" sizes="72px" />
            </div>
            <Link href="/plan" onClick={() => setActiveItinerary(trip.id)} className="min-w-0 flex-1">
              <strong className="block truncate">{trip.name}</strong>
              <span className="text-sm text-ink-400">
                {trip.days.length} days · {stops} stops
                {trip.sharedWith.length ? ` · shared with ${trip.sharedWith.length}` : ""}
              </span>
              <span className="mt-1 flex gap-2">
                {empty === 0 ? (
                  <Badge tone="green">Fully planned</Badge>
                ) : (
                  <Badge tone="amber">
                    {empty} free {empty === 1 ? "day" : "days"}
                  </Badge>
                )}
              </span>
            </Link>
            {allowDelete ? (
              <button
                type="button"
                className="rounded-full p-2 text-ink-400 hover:bg-red-50 hover:text-danger"
                aria-label={`Delete ${trip.name}`}
                onClick={() => window.confirm(`Delete "${trip.name}"?`) && deleteItinerary(trip.id)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            ) : (
              <ChevronRight className="h-5 w-5 text-ink-400" aria-hidden />
            )}
          </li>
        );
      })}
    </ul>
  );
}
