"use client";

import { createPersistentStore } from "./create-store";
import { demoItineraries, demoSavedPlaces } from "@/lib/data/demo-account";
import { getAttraction } from "@/lib/data/attractions";
import { createId } from "@/lib/id";
import type { Itinerary, ItineraryDay, ItineraryStop, LocationId, Trail } from "@/lib/types";

/**
 * Itineraries and saved places for the current visitor.
 *
 * All mutations go through the functions below (never `set` from a
 * component) so that when the backend arrives each one maps to a single
 * API call.
 */
interface TripState {
  itineraries: Itinerary[];
  /** The itinerary open in the planner. */
  activeId: string | null;
  savedPlaces: string[];
}

const initialState: TripState = {
  itineraries: demoItineraries,
  activeId: demoItineraries[0]?.id ?? null,
  savedPlaces: demoSavedPlaces,
};

export const tripStore = createPersistentStore<TripState>("trips", initialState);

export function useTrips() {
  return tripStore.useValue();
}

export function useActiveItinerary(): Itinerary | undefined {
  const { itineraries, activeId } = useTrips();
  return itineraries.find((trip) => trip.id === activeId) ?? itineraries[0];
}

// ----------------------------------------------------------------------
// Itinerary-level actions
// ----------------------------------------------------------------------

export function setActiveItinerary(id: string) {
  tripStore.set((state) => ({ ...state, activeId: id }));
}

export function createItinerary(input: { name: string; startDate: string; days: ItineraryDay[]; trail?: Trail["slug"] }): string {
  const itinerary: Itinerary = {
    id: createId("trip"),
    name: input.name,
    startDate: input.startDate,
    travellers: 2,
    days: input.days,
    trail: input.trail,
    sharedWith: [],
    updatedAt: new Date().toISOString(),
  };
  tripStore.set((state) => ({ ...state, itineraries: [itinerary, ...state.itineraries], activeId: itinerary.id }));
  return itinerary.id;
}

/** Builds a new itinerary pre-filled from a themed trail's day-by-day route. */
export function createItineraryFromTrail(trail: Trail, startDate: string): string {
  const days: ItineraryDay[] = trail.days.map((day) => ({
    id: createId("day"),
    location: day.location,
    stops: [
      { id: createId("stop"), kind: "custom", title: day.summary },
      ...(day.attractions ?? []).map((slug) => attractionStop(slug)).filter((stop): stop is ItineraryStop => Boolean(stop)),
    ],
  }));
  return createItinerary({ name: trail.name, startDate, days, trail: trail.slug });
}

export function createBlankItinerary(startDate: string): string {
  return createItinerary({
    name: "New trip",
    startDate,
    days: [{ id: createId("day"), location: "colombo", stops: [] }],
  });
}

export function deleteItinerary(id: string) {
  tripStore.set((state) => {
    const itineraries = state.itineraries.filter((trip) => trip.id !== id);
    return { ...state, itineraries, activeId: state.activeId === id ? (itineraries[0]?.id ?? null) : state.activeId };
  });
}

export function updateItinerary(id: string, changes: Partial<Pick<Itinerary, "name" | "startDate" | "travellers">>) {
  mapItinerary(id, (trip) => ({ ...trip, ...changes }));
}

export function shareItinerary(id: string, email: string) {
  mapItinerary(id, (trip) =>
    trip.sharedWith.includes(email) ? trip : { ...trip, sharedWith: [...trip.sharedWith, email] },
  );
}

// ----------------------------------------------------------------------
// Day and stop actions
// ----------------------------------------------------------------------

export function addDay(itineraryId: string, location: LocationId) {
  mapItinerary(itineraryId, (trip) => ({
    ...trip,
    days: [...trip.days, { id: createId("day"), location, stops: [] }],
  }));
}

export function removeDay(itineraryId: string, dayId: string) {
  mapItinerary(itineraryId, (trip) => ({ ...trip, days: trip.days.filter((day) => day.id !== dayId) }));
}

export function setDayLocation(itineraryId: string, dayId: string, location: LocationId) {
  mapDay(itineraryId, dayId, (day) => ({ ...day, location }));
}

export function addStop(itineraryId: string, dayId: string, stop: Omit<ItineraryStop, "id">) {
  mapDay(itineraryId, dayId, (day) => ({ ...day, stops: [...day.stops, { ...stop, id: createId("stop") }] }));
}

export function updateStop(itineraryId: string, dayId: string, stopId: string, changes: Partial<ItineraryStop>) {
  mapDay(itineraryId, dayId, (day) => ({
    ...day,
    stops: day.stops.map((stop) => (stop.id === stopId ? { ...stop, ...changes } : stop)),
  }));
}

export function removeStop(itineraryId: string, dayId: string, stopId: string) {
  mapDay(itineraryId, dayId, (day) => ({ ...day, stops: day.stops.filter((stop) => stop.id !== stopId) }));
}

/**
 * Moves a stop to a position in the same or another day (drag and drop).
 * `toIndex` is the index in the target day's list *after* removal.
 */
export function moveStop(itineraryId: string, from: { dayId: string; stopId: string }, to: { dayId: string; index: number }) {
  mapItinerary(itineraryId, (trip) => {
    const stop = trip.days.find((day) => day.id === from.dayId)?.stops.find((s) => s.id === from.stopId);
    if (!stop) return trip;

    const days = trip.days.map((day) => (day.id === from.dayId ? { ...day, stops: day.stops.filter((s) => s.id !== stop.id) } : day));
    return {
      ...trip,
      days: days.map((day) => {
        if (day.id !== to.dayId) return day;
        const stops = [...day.stops];
        stops.splice(Math.max(0, Math.min(to.index, stops.length)), 0, stop);
        return { ...day, stops };
      }),
    };
  });
}

/** Adds a listed attraction to a day of the active itinerary. Returns null if there is no itinerary. */
export function addAttractionToActiveTrip(slug: string, dayIndex?: number): { tripName: string; dayNumber: number } | null {
  const { itineraries, activeId } = tripStore.get();
  const trip = itineraries.find((t) => t.id === activeId) ?? itineraries[0];
  const stop = attractionStop(slug);
  if (!trip || !stop || trip.days.length === 0) return null;

  // Default: first day already in the attraction's town, else the last day.
  const attraction = getAttraction(slug);
  const sameTown = trip.days.findIndex((day) => day.location === attraction?.location);
  const index = dayIndex ?? (sameTown >= 0 ? sameTown : trip.days.length - 1);
  const day = trip.days[index] ?? trip.days[trip.days.length - 1]!;

  mapDay(trip.id, day.id, (d) => ({ ...d, stops: [...d.stops, stop] }));
  return { tripName: trip.name, dayNumber: trip.days.indexOf(day) + 1 };
}

// ----------------------------------------------------------------------
// Saved places
// ----------------------------------------------------------------------

export function toggleSavedPlace(slug: string): boolean {
  let saved = false;
  tripStore.set((state) => {
    saved = !state.savedPlaces.includes(slug);
    return {
      ...state,
      savedPlaces: saved ? [...state.savedPlaces, slug] : state.savedPlaces.filter((s) => s !== slug),
    };
  });
  return saved;
}

// ----------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------

function attractionStop(slug: string): ItineraryStop | null {
  const attraction = getAttraction(slug);
  if (!attraction) return null;
  return {
    id: createId("stop"),
    kind: "attraction",
    title: attraction.name,
    time: attraction.bestStart,
    attractionSlug: slug,
  };
}

function mapItinerary(id: string, update: (trip: Itinerary) => Itinerary) {
  tripStore.set((state) => ({
    ...state,
    itineraries: state.itineraries.map((trip) =>
      trip.id === id ? { ...update(trip), updatedAt: new Date().toISOString() } : trip,
    ),
  }));
}

function mapDay(itineraryId: string, dayId: string, update: (day: ItineraryDay) => ItineraryDay) {
  mapItinerary(itineraryId, (trip) => ({
    ...trip,
    days: trip.days.map((day) => (day.id === dayId ? update(day) : day)),
  }));
}
