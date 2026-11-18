"use client";

import { useSyncExternalStore } from "react";

/**
 * Minimal client-side store persisted to localStorage.
 *
 * Until the backend exists, this is where a visitor's itinerary, bookings,
 * saved places and preferences live. Each store exposes the same small
 * API (get / set / subscribe + a React hook), so replacing one with API
 * calls later only touches its own file.
 *
 * The server always renders with `initial`; the persisted value is picked
 * up on the client after hydration (via useSyncExternalStore), which avoids
 * hydration mismatches.
 */
export interface PersistentStore<T> {
  get: () => T;
  set: (next: T | ((prev: T) => T)) => void;
  reset: () => void;
  subscribe: (listener: () => void) => () => void;
  useValue: () => T;
}

const STORAGE_PREFIX = "ctr:";

export function createPersistentStore<T>(key: string, initial: T): PersistentStore<T> {
  const storageKey = STORAGE_PREFIX + key;
  const listeners = new Set<() => void>();
  let value: T = initial;
  let loaded = false;

  function load() {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw !== null) value = JSON.parse(raw) as T;
    } catch {
      // Corrupt or unavailable storage: fall back to the initial value.
    }
  }

  function persist() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // Storage full or blocked (e.g. private mode): keep in memory only.
    }
  }

  function emit() {
    listeners.forEach((listener) => listener());
  }

  const store: PersistentStore<T> = {
    get() {
      load();
      return value;
    },
    set(next) {
      load();
      value = typeof next === "function" ? (next as (prev: T) => T)(value) : next;
      persist();
      emit();
    },
    reset() {
      store.set(initial);
    },
    subscribe(listener) {
      listeners.add(listener);
      // Keep multiple tabs in sync.
      const onStorage = (event: StorageEvent) => {
        if (event.key !== storageKey) return;
        loaded = false;
        load();
        listener();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },
    useValue() {
      return useSyncExternalStore(store.subscribe, store.get, () => initial);
    },
  };

  return store;
}
