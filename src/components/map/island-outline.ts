import type { Coordinates } from "@/lib/types";

/**
 * Simplified coastline of Sri Lanka (clockwise from Point Pedro), used to
 * draw the island on the placeholder map. Not survey-accurate: it only
 * needs to place pins believably until a maps API replaces it.
 */
export const ISLAND_OUTLINE: Coordinates[] = [
  { lat: 9.82, lng: 80.24 },
  { lat: 9.55, lng: 80.55 },
  { lat: 9.27, lng: 80.82 },
  { lat: 8.95, lng: 81.0 },
  { lat: 8.6, lng: 81.22 },
  { lat: 8.3, lng: 81.38 },
  { lat: 7.95, lng: 81.55 },
  { lat: 7.72, lng: 81.7 },
  { lat: 7.3, lng: 81.85 },
  { lat: 6.85, lng: 81.84 },
  { lat: 6.5, lng: 81.72 },
  { lat: 6.3, lng: 81.5 },
  { lat: 6.12, lng: 81.13 },
  { lat: 6.02, lng: 80.8 },
  { lat: 5.92, lng: 80.59 },
  { lat: 5.95, lng: 80.45 },
  { lat: 6.02, lng: 80.22 },
  { lat: 6.14, lng: 80.1 },
  { lat: 6.42, lng: 80.0 },
  { lat: 6.6, lng: 79.96 },
  { lat: 6.93, lng: 79.84 },
  { lat: 7.2, lng: 79.83 },
  { lat: 7.6, lng: 79.8 },
  { lat: 8.0, lng: 79.82 },
  { lat: 8.25, lng: 79.72 },
  { lat: 8.6, lng: 79.93 },
  { lat: 8.9, lng: 79.92 },
  { lat: 9.1, lng: 80.0 },
  { lat: 9.4, lng: 80.12 },
  { lat: 9.55, lng: 80.03 },
  { lat: 9.66, lng: 79.95 },
  { lat: 9.8, lng: 80.05 },
];

/** Central highlands, shaded green. */
export const HIGHLANDS_CENTER: Coordinates = { lat: 7.0, lng: 80.75 };
