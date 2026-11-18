import type { LocationId } from "./location";
import type { TrailSlug } from "./trail";

export type StopKind = "attraction" | "transfer" | "stay" | "meal" | "custom";

export interface ItineraryStop {
  id: string;
  kind: StopKind;
  title: string;
  /** "14:00", optional */
  time?: string;
  note?: string;
  /** Set when the stop is a listed attraction. */
  attractionSlug?: string;
}

export interface ItineraryDay {
  id: string;
  location: LocationId;
  stops: ItineraryStop[];
}

export interface Itinerary {
  id: string;
  name: string;
  /** ISO date of day 1 */
  startDate: string;
  travellers: number;
  days: ItineraryDay[];
  /** Trail the itinerary was started from, if any. */
  trail?: TrailSlug;
  /** Emails of collaborators the trip is shared with. */
  sharedWith: string[];
  /** ISO timestamp */
  updatedAt: string;
}
