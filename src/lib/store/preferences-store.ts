"use client";

import { createPersistentStore } from "./create-store";
import { DEFAULT_CURRENCY, formatMoney, type CurrencyCode } from "@/lib/currency";

/**
 * Visitor display preferences (currency and language).
 *
 * Language: only English copy exists so far. Sinhala and Tamil are listed
 * so the switcher and plumbing are in place; translations are a content
 * task for the client (see README "Open items").
 */
export const LANGUAGES = {
  en: { label: "English", available: true },
  si: { label: "සිංහල", available: false },
  ta: { label: "தமிழ்", available: false },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

interface Preferences {
  currency: CurrencyCode;
  language: LanguageCode;
}

export const preferencesStore = createPersistentStore<Preferences>("preferences", {
  currency: DEFAULT_CURRENCY,
  language: "en",
});

export function usePreferences() {
  return preferencesStore.useValue();
}

export function setCurrency(currency: CurrencyCode) {
  preferencesStore.set((prev) => ({ ...prev, currency }));
}

export function setLanguage(language: LanguageCode) {
  preferencesStore.set((prev) => ({ ...prev, language }));
}

/** Hook returning a formatter bound to the visitor's chosen currency. */
export function useMoney() {
  const { currency } = usePreferences();
  return (amountUsd: number) => formatMoney(amountUsd, currency);
}
