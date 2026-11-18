import type { LocationId } from "./location";
import type { PhotoKey } from "@/lib/images";

export type TrailSlug = "coastal-ceylon" | "heritage-ceylon" | "wild-ceylon" | "modern-ceylon";

/** Tailwind colour token for a trail, defined in styles/theme.css. */
export type TrailColor = "coastal" | "heritage" | "wild" | "modern";

export interface TrailDay {
  /** Where the night is spent. Seeds the itinerary planner. */
  location: LocationId;
  summary: string;
  /** Attractions (by slug) the planner adds as stops for this day. */
  attractions?: string[];
}

export interface Trail {
  slug: TrailSlug;
  name: string;
  /** The client's original label, e.g. "Water theme". */
  givenName: string;
  tagline: string;
  description: string;
  region: string;
  color: TrailColor;
  photo: PhotoKey;
  days: TrailDay[];
  activities: string[];
  vehicleProfile: string;
  /** Flags an interpretation or assumption that needs confirming with the client. */
  note?: string;
}
