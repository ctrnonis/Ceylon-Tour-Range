"use client";

import { useState } from "react";
import { MapPin, Trash2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Select } from "@/components/ui/Field";
import { notify } from "@/components/ui/Toaster";
import { getAttraction } from "@/lib/data/attractions";
import { getLocation, locations } from "@/lib/data/locations";
import { addStop, moveStop, removeDay, setDayLocation } from "@/lib/store/trip-store";
import { addDays, formatShortDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Itinerary, ItineraryDay, LocationId } from "@/lib/types";
import AddStopForm from "./AddStopForm";
import StopItem from "./StopItem";
import { isPlannerDrag, readDragPayload } from "./dnd";

/** The selected day: its town, a drag-and-drop timeline of stops and an add-stop form. */
export default function DayPlan({ trip, day, dayIndex }: { trip: Itinerary; day: ItineraryDay; dayIndex: number }) {
  const [dropAt, setDropAt] = useState<number | null>(null);

  function handleDrop(event: React.DragEvent, index: number) {
    event.preventDefault();
    setDropAt(null);
    const payload = readDragPayload(event);
    if (!payload) return;

    if (payload.type === "stop") {
      // Dropping below its own position: account for the item being removed first.
      const sameDay = payload.dayId === day.id;
      const from = day.stops.findIndex((s) => s.id === payload.stopId);
      const target = sameDay && from !== -1 && from < index ? index - 1 : index;
      moveStop(trip.id, { dayId: payload.dayId, stopId: payload.stopId }, { dayId: day.id, index: target });
    } else {
      const attraction = getAttraction(payload.slug);
      if (!attraction) return;
      addStop(trip.id, day.id, {
        kind: "attraction",
        title: attraction.name,
        time: attraction.bestStart,
        attractionSlug: attraction.slug,
      });
      notify(`${attraction.name} added to day ${dayIndex + 1}`);
    }
  }

  /** Works out the insert index from the pointer's position over the list. */
  function handleDragOver(event: React.DragEvent<HTMLOListElement>) {
    if (!isPlannerDrag(event)) return;
    event.preventDefault();
    const items = [...event.currentTarget.querySelectorAll<HTMLElement>("[data-index]")];
    const index = items.findIndex((item) => {
      const rect = item.getBoundingClientRect();
      return event.clientY < rect.top + rect.height / 2;
    });
    setDropAt(index === -1 ? day.stops.length : index);
  }

  const move = (stopId: string, toIndex: number) =>
    moveStop(trip.id, { dayId: day.id, stopId }, { dayId: day.id, index: toIndex });

  return (
    <section className="panel" aria-label={`Day ${dayIndex + 1}`}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3>
            Day {dayIndex + 1} · {formatShortDate(addDays(trip.startDate, dayIndex))}
          </h3>
          <label className="mt-1 flex items-center gap-1.5 text-sm text-ink-400">
            <MapPin className="h-4 w-4" aria-hidden />
            <span className="sr-only">Overnight town</span>
            <Select
              className="!w-auto !border-0 !bg-transparent !p-0 text-sm font-semibold text-ocean-700 !shadow-none"
              value={day.location}
              onChange={(event) => setDayLocation(trip.id, day.id, event.target.value as LocationId)}
            >
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Badge>
            {day.stops.length} {day.stops.length === 1 ? "stop" : "stops"}
          </Badge>
          {trip.days.length > 1 ? (
            <button
              type="button"
              onClick={() => removeDay(trip.id, day.id)}
              className="rounded-full p-2 text-ink-400 hover:bg-red-50 hover:text-danger"
              aria-label={`Remove day ${dayIndex + 1}`}
              title="Remove day"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <ol
        className={cn("timeline min-h-16", day.stops.length === 0 && "pl-0 before:hidden")}
        onDragOver={handleDragOver}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) setDropAt(null);
        }}
        onDrop={(event) => handleDrop(event, dropAt ?? day.stops.length)}
      >
        {day.stops.map((stop, index) => (
          <StopItem
            key={stop.id}
            stop={stop}
            tripId={trip.id}
            dayId={day.id}
            index={index}
            isFirst={index === 0}
            isLast={index === day.stops.length - 1}
            onMove={move}
            dropIndicator={dropAt === index}
          />
        ))}
        <li className="list-none">
          {dropAt === day.stops.length && day.stops.length > 0 ? (
            <div className="mb-2 h-1 rounded-full bg-sun-500" aria-hidden />
          ) : null}
          <div
            className={cn(
              "rounded-[var(--radius-md)] border-2 border-dashed px-4 py-4 text-center text-sm text-ink-400 transition",
              dropAt !== null ? "border-sun-500 bg-sun-500/5" : "border-ocean-700/15",
            )}
          >
            Drag stops or suggestions here to add them to <strong>day {dayIndex + 1}</strong> in{" "}
            {getLocation(day.location).name}
          </div>
        </li>
      </ol>

      <AddStopForm tripId={trip.id} dayId={day.id} />
    </section>
  );
}
