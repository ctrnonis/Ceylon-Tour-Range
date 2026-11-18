import type { Coordinates } from "@/lib/types";

/**
 * Geography helpers for maps and taxi estimates.
 * Distances are straight-line (haversine) scaled by a road factor, which is
 * good enough for estimates until a routing API is integrated.
 */
const EARTH_RADIUS_KM = 6371;

/** Sri Lankan roads wind; this converts straight-line km to typical road km. */
export const ROAD_FACTOR = 1.6;

/** Average door-to-door speed including towns and hill roads. */
export const AVERAGE_SPEED_KMH = 40;

export function straightLineKm(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

export function roadKm(a: Coordinates, b: Coordinates): number {
  return Math.round(straightLineKm(a, b) * ROAD_FACTOR);
}

export function driveMinutes(km: number): number {
  return Math.round((km / AVERAGE_SPEED_KMH) * 60);
}

/** Bounding box of Sri Lanka used to project coordinates onto the map. */
export const ISLAND_BOUNDS = { north: 9.9, south: 5.85, west: 79.5, east: 82.0 } as const;

/** Projects coordinates to percentage offsets (0–100) inside the map box. */
export function projectToMap({ lat, lng }: Coordinates): { x: number; y: number } {
  const { north, south, west, east } = ISLAND_BOUNDS;
  return {
    x: ((lng - west) / (east - west)) * 100,
    y: ((north - lat) / (north - south)) * 100,
  };
}
