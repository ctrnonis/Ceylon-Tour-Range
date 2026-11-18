"use client";

import { useState } from "react";
import { CalendarDays, ListOrdered, Route } from "lucide-react";
import IslandMap from "@/components/map/IslandMap";
import { Button } from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Tabs from "@/components/ui/Tabs";
import { useToday } from "@/hooks/useToday";
import { getAttraction } from "@/lib/data/attractions";
import { getLocation } from "@/lib/data/locations";
import { roadKm } from "@/lib/geo";
import { createBlankItinerary, useActiveItinerary, useTrips } from "@/lib/store/trip-store";
import { addDays } from "@/lib/format";
import type { Trail } from "@/lib/types";
import DayPlan from "./DayPlan";
import DayTabs from "./DayTabs";
import PlannerHeader from "./PlannerHeader";
import PrintableItinerary from "./PrintableItinerary";
import StartFromTrail from "./StartFromTrail";
import Suggestions from "./Suggestions";
import TripCalendar from "./TripCalendar";

/**
 * Itinerary builder: day tabs or calendar, a drag-and-drop day plan, the
 * route map and nearby suggestions. State lives in trip-store.
 */
export default function Planner({ trail }: { trail?: Trail }) {
  const today = useToday();
  const { itineraries } = useTrips();
  const trip = useActiveItinerary();
  const [view, setView] = useState<"days" | "calendar">("days");
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  if (!trip) {
    return (
      <>
        {trail ? <StartFromTrail trail={trail} today={today} /> : null}
        <EmptyState
          icon={Route}
          title="No trips yet"
          description="Start from a themed trail or a blank trip."
          action={
            <Button onClick={() => createBlankItinerary(today ? addDays(today, 30) : "2027-01-01")}>
              Create a trip
            </Button>
          }
        />
      </>
    );
  }

  const dayIndex = Math.max(
    0,
    trip.days.findIndex((day) => day.id === selectedDayId),
  );
  const day = trip.days[dayIndex]!;

  const route = trip.days.map((d) => getLocation(d.location));
  const routeKm = route.slice(1).reduce((total, point, i) => total + roadKm(route[i]!, point), 0);
  const towns = new Set(trip.days.map((d) => d.location)).size;
  const usedSlugs = new Set(
    trip.days.flatMap((d) => d.stops.map((s) => s.attractionSlug).filter((s): s is string => Boolean(s))),
  );

  const dayMarkers = day.stops
    .map((stop) => (stop.attractionSlug ? getAttraction(stop.attractionSlug) : undefined))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .map((a) => ({ id: a.slug, coordinates: a.coordinates, label: a.name }));
  const townMarkers = [...new Map(route.map((town) => [town.id, town])).values()].map((town) => ({
    id: `town-${town.id}`,
    coordinates: town,
    label: town.name.split(" (")[0],
    tone: "teal" as const,
  }));

  function selectDay(id: string) {
    setSelectedDayId(id);
    setView("days");
  }

  return (
    <>
      {trail ? <StartFromTrail trail={trail} today={today} /> : null}
      <PlannerHeader trip={trip} trips={itineraries} today={today} />
      <PrintableItinerary trip={trip} />

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_320px] print:hidden">
        <div className="min-w-0">
          <Tabs
            label="Planner view"
            value={view}
            onChange={setView}
            className="mb-4"
            options={[
              {
                value: "days",
                label: (
                  <>
                    <ListOrdered aria-hidden /> Day planner
                  </>
                ),
              },
              {
                value: "calendar",
                label: (
                  <>
                    <CalendarDays aria-hidden /> Calendar
                  </>
                ),
              },
            ]}
          />
          {view === "days" ? (
            <>
              <DayTabs trip={trip} selectedId={day.id} onSelect={setSelectedDayId} />
              <DayPlan key={day.id} trip={trip} day={day} dayIndex={dayIndex} />
            </>
          ) : (
            <TripCalendar trip={trip} onSelect={selectDay} />
          )}
        </div>

        <IslandMap
          className="h-[460px] xl:sticky xl:top-24 xl:h-[640px]"
          markers={[...townMarkers, ...dayMarkers]}
          route={route}
          selectedId={`town-${day.location}`}
          showLabels
        >
          <div className="panel absolute bottom-4 left-4 z-10 !px-4 !py-3 text-sm">
            <strong>Route:</strong> ~{routeKm} km · {towns} {towns === 1 ? "town" : "towns"}
          </div>
        </IslandMap>

        <Suggestions tripId={trip.id} day={day} usedSlugs={usedSlugs} />
      </div>
    </>
  );
}
