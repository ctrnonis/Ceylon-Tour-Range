"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ISLAND_BOUNDS, projectToMap } from "@/lib/geo";
import type { Coordinates } from "@/lib/types";
import { HIGHLANDS_CENTER, ISLAND_OUTLINE } from "./island-outline";

export interface MapMarker {
  id: string;
  coordinates: Coordinates;
  label?: string;
  tone?: "amber" | "teal";
}

const toPoints = (coords: Coordinates[]) =>
  coords
    .map((c) => {
      const { x, y } = projectToMap(c);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

const islandPoints = toPoints(ISLAND_OUTLINE);
const highlands = projectToMap(HIGHLANDS_CENTER);

/** Width / height of the island bounding box, so pins line up with the outline. */
const ISLAND_ASPECT = (ISLAND_BOUNDS.east - ISLAND_BOUNDS.west) / (ISLAND_BOUNDS.north - ISLAND_BOUNDS.south);

/**
 * Stylised map of Sri Lanka with pins and an optional route line.
 *
 * Placeholder for an interactive maps API (Google Maps / Mapbox), which is
 * a backend-phase integration. The props (markers, route, selection) are
 * what a real map component would take, so swapping it is contained here.
 */
export default function IslandMap({
  markers = [],
  route,
  vehicle,
  selectedId,
  onSelect,
  showLabels = false,
  className,
  children,
}: {
  markers?: MapMarker[];
  /** Coordinates joined in order by a dashed line. */
  route?: Coordinates[];
  /** Live vehicle position (taxi tracking). */
  vehicle?: { coordinates: Coordinates; icon: ReactNode };
  selectedId?: string;
  onSelect?: (id: string) => void;
  showLabels?: boolean;
  className?: string;
  /** Overlay content (info cards), positioned by the caller. */
  children?: ReactNode;
}) {
  return (
    <div className={cn("map min-h-[320px]", className)}>
      <div
        className={cn("absolute top-4 left-1/2 -translate-x-1/2", children ? "bottom-[72px]" : "bottom-4")}
        style={{ aspectRatio: ISLAND_ASPECT }}
        role="img"
        aria-label={`Map of Sri Lanka${markers.length ? ` showing ${markers.map((m) => m.label).filter(Boolean).join(", ")}` : ""}`}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <polygon points={islandPoints} className="map-land" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          <ellipse cx={highlands.x} cy={highlands.y} rx={9} ry={6} className="map-highlands" />
          {route && route.length > 1 ? (
            <polyline points={toPoints(route)} className="map-route" vectorEffect="non-scaling-stroke" />
          ) : null}
        </svg>

        {markers.map((marker) => {
          const { x, y } = projectToMap(marker.coordinates);
          const style = { left: `${x}%`, top: `${y}%` };
          return (
            <div key={marker.id}>
              <button
                type="button"
                className={cn("map-pin", marker.tone === "teal" && "map-pin-teal")}
                style={style}
                aria-label={marker.label ?? "Map pin"}
                aria-pressed={selectedId === marker.id}
                onClick={onSelect ? () => onSelect(marker.id) : undefined}
                tabIndex={onSelect ? 0 : -1}
              />
              {showLabels && marker.label ? (
                <span className="map-pin-label" style={style}>
                  {marker.label}
                </span>
              ) : null}
            </div>
          );
        })}

        {vehicle ? (
          <span
            className="map-vehicle"
            style={{ left: `${projectToMap(vehicle.coordinates).x}%`, top: `${projectToMap(vehicle.coordinates).y}%` }}
            aria-label="Driver location"
          >
            {vehicle.icon}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
