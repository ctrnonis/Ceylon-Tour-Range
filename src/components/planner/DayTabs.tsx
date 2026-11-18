"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { getLocation } from "@/lib/data/locations";
import { addDay, moveStop, addStop } from "@/lib/store/trip-store";
import { getAttraction } from "@/lib/data/attractions";
import { addDays, formatShortDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Itinerary } from "@/lib/types";
import { isPlannerDrag, readDragPayload } from "./dnd";

/**
 * Horizontal day selector. Each tab is also a drop target, so a stop or
 * suggestion can be dragged straight onto another day.
 */
export default function DayTabs({
  trip,
  selectedId,
  onSelect,
}: {
  trip: Itinerary;
  selectedId: string;
  onSelect: (dayId: string) => void;
}) {
  const [over, setOver] = useState<string | null>(null);

  function drop(event: React.DragEvent, dayId: string) {
    event.preventDefault();
    setOver(null);
    const payload = readDragPayload(event);
    const day = trip.days.find((d) => d.id === dayId);
    if (!payload || !day) return;
    if (payload.type === "stop") {
      moveStop(trip.id, { dayId: payload.dayId, stopId: payload.stopId }, { dayId, index: day.stops.length });
    } else {
      const attraction = getAttraction(payload.slug);
      if (attraction)
        addStop(trip.id, dayId, {
          kind: "attraction",
          title: attraction.name,
          time: attraction.bestStart,
          attractionSlug: attraction.slug,
        });
    }
  }

  function add() {
    const last = trip.days[trip.days.length - 1];
    addDay(trip.id, last?.location ?? "colombo");
  }

  return (
    <div className="tabs mb-5 !w-full" role="tablist" aria-label="Trip days">
      {trip.days.map((day, index) => (
        <button
          key={day.id}
          type="button"
          role="tab"
          aria-selected={day.id === selectedId}
          className={cn("tab flex-col !items-start !gap-0 !px-4 !py-2", over === day.id && "ring-2 ring-sun-500")}
          onClick={() => onSelect(day.id)}
          onDragOver={(event) => {
            if (!isPlannerDrag(event)) return;
            event.preventDefault();
            setOver(day.id);
          }}
          onDragLeave={() => setOver(null)}
          onDrop={(event) => drop(event, day.id)}
        >
          <span>Day {index + 1}</span>
          <span className="text-xs font-semibold text-ink-400">
            {formatShortDate(addDays(trip.startDate, index))} · {getLocation(day.location).name.split(" (")[0]}
          </span>
        </button>
      ))}
      <button type="button" className="tab shrink-0" onClick={add} aria-label="Add a day">
        <Plus aria-hidden /> Day
      </button>
    </div>
  );
}
