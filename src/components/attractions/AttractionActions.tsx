"use client";

import Link from "next/link";
import { useState } from "react";
import { CarFront, Heart, Plus } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Button, buttonClass } from "@/components/ui/Button";
import { Field, Select } from "@/components/ui/Field";
import Money from "@/components/ui/Money";
import { notify } from "@/components/ui/Toaster";
import {
  addAttractionToActiveTrip,
  setActiveItinerary,
  toggleSavedPlace,
  useActiveItinerary,
  useTrips,
} from "@/lib/store/trip-store";
import { getLocation } from "@/lib/data/locations";
import { addDays, formatShortDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Attraction } from "@/lib/types";

/** Sticky side card on an attraction page: add to itinerary, save, book a taxi. */
export default function AttractionActions({ attraction }: { attraction: Attraction }) {
  const { itineraries, savedPlaces } = useTrips();
  const trip = useActiveItinerary();
  const [dayIndex, setDayIndex] = useState<number | "auto">("auto");
  const saved = savedPlaces.includes(attraction.slug);

  function addToTrip() {
    const result = addAttractionToActiveTrip(attraction.slug, dayIndex === "auto" ? undefined : dayIndex);
    notify(result ? `Added to ${result.tripName}, day ${result.dayNumber}` : "Create a trip in the planner first");
  }

  function toggleSave() {
    notify(toggleSavedPlace(attraction.slug) ? "Saved to your places" : "Removed from saved places");
  }

  return (
    <aside className="panel lg:sticky lg:top-24">
      <div className="mb-5 flex items-center justify-between">
        <span className="price text-2xl">
          {attraction.priceUsd === 0 ? (
            "Free entry"
          ) : (
            <>
              <Money usd={attraction.priceUsd} /> <small>/ person</small>
            </>
          )}
        </span>
        <Badge tone="green">Open today</Badge>
      </div>

      {itineraries.length > 0 && trip ? (
        <div className="flex flex-col gap-4">
          <Field label="Trip">
            {(props) => (
              <Select {...props} value={trip.id} onChange={(event) => setActiveItinerary(event.target.value)}>
                {itineraries.map((itinerary) => (
                  <option key={itinerary.id} value={itinerary.id}>
                    {itinerary.name}
                  </option>
                ))}
              </Select>
            )}
          </Field>
          <Field label="Day">
            {(props) => (
              <Select
                {...props}
                value={dayIndex}
                onChange={(event) => setDayIndex(event.target.value === "auto" ? "auto" : Number(event.target.value))}
              >
                <option value="auto">Best match for {getLocation(attraction.location).name}</option>
                {trip.days.map((day, index) => (
                  <option key={day.id} value={index}>
                    Day {index + 1} · {formatShortDate(addDays(trip.startDate, index))} ·{" "}
                    {getLocation(day.location).name}
                  </option>
                ))}
              </Select>
            )}
          </Field>
        </div>
      ) : null}

      <Button variant="accent" size="lg" block className="mt-5" onClick={addToTrip}>
        <Plus aria-hidden /> Add to itinerary
      </Button>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Button variant="ghost" onClick={toggleSave} aria-pressed={saved}>
          <Heart className={cn(saved && "fill-sun-500 text-sun-500")} aria-hidden /> {saved ? "Saved" : "Save"}
        </Button>
        <Link href={`/taxi?to=${attraction.location}`} className={buttonClass({ variant: "ghost" })}>
          <CarFront aria-hidden /> Taxi
        </Link>
      </div>
    </aside>
  );
}
