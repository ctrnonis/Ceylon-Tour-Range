"use client";

import { useEffect, useState } from "react";
import type { Coordinates } from "@/lib/types";

export type RidePhase = "assigned" | "en-route" | "arriving" | "arrived";

const TICK_MS = 1000;
const TOTAL_TICKS = 24;

/**
 * Simulated live tracking: moves the driver from a nearby start point to
 * the pickup over ~24 seconds. In the backend phase this hook subscribes to
 * the dispatch service's location updates instead; its return shape stays
 * the same.
 */
export function useRideTracking(pickup: Coordinates | null) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!pickup) return;
    const timer = window.setInterval(() => {
      setTick((current) => {
        if (current >= TOTAL_TICKS) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [pickup]);

  if (!pickup) return null;

  const progress = tick / TOTAL_TICKS;
  // Driver starts ~8 km north-east of the pickup.
  const start = { lat: pickup.lat + 0.06, lng: pickup.lng + 0.05 };
  const position = {
    lat: start.lat + (pickup.lat - start.lat) * progress,
    lng: start.lng + (pickup.lng - start.lng) * progress,
  };
  const minutesAway = Math.max(0, Math.round((1 - progress) * 12));
  const phase: RidePhase = progress >= 1 ? "arrived" : progress > 0.75 ? "arriving" : tick > 2 ? "en-route" : "assigned";

  return { position, minutesAway, phase };
}
