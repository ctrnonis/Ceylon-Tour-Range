"use client";

import { useSyncExternalStore } from "react";

const INTERVAL_MS = 60_000;
let now = Date.now();

function subscribe(listener: () => void) {
  now = Date.now();
  const timer = window.setInterval(() => {
    now = Date.now();
    listener();
  }, INTERVAL_MS);
  return () => window.clearInterval(timer);
}

/** Current time in ms, refreshed every minute; `null` while server rendering. */
export function useNow(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => now,
    () => null,
  );
}
