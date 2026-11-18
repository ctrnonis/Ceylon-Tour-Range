"use client";

import { useSyncExternalStore } from "react";
import { todayIso } from "@/lib/format";

const noop = () => () => {};

/**
 * Today's date (ISO) on the client, `null` during server rendering.
 * Pages are pre-rendered at build time, so anything date-relative (default
 * check-in, countdowns) must be computed in the browser to avoid
 * hydration mismatches.
 */
export function useToday(): string | null {
  return useSyncExternalStore(noop, todayIso, () => null);
}
