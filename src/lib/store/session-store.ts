"use client";

import { createPersistentStore } from "./create-store";

/**
 * Mock authentication. There is no real auth yet (backend phase), so
 * "logging in" just stores a session object locally. The shape matches what
 * a real auth provider would return, so the UI won't need to change.
 */
export type Role = "traveller" | "guide" | "admin";

export interface Session {
  name: string;
  email: string;
  role: Role;
}

export const sessionStore = createPersistentStore<Session | null>("session", null);

export function useSession() {
  return sessionStore.useValue();
}

export function signIn(session: Session) {
  sessionStore.set(session);
}

export function signOut() {
  sessionStore.set(null);
}

/** Display name from an email address, for mock sign-ups: "amaya.perera@..." -> "Amaya Perera". */
export function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "Traveller";
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join(" ");
}
