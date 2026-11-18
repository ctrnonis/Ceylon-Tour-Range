"use client";

import { Globe } from "lucide-react";
import { CURRENCIES, type CurrencyCode } from "@/lib/currency";
import { LANGUAGES, setCurrency, setLanguage, usePreferences, type LanguageCode } from "@/lib/store/preferences-store";
import { cn } from "@/lib/cn";

/** Compact language + currency switchers (navbar and mobile menu). */
export default function PreferencesMenu({ className }: { className?: string }) {
  const { currency, language } = usePreferences();

  return (
    <div className={cn("flex items-center gap-1.5 text-sm", className)}>
      <Globe className="h-4 w-4 text-ink-400" aria-hidden />
      <select
        aria-label="Language"
        className="cursor-pointer rounded-lg bg-transparent py-1 font-semibold text-ink-600 hover:text-ocean-900"
        value={language}
        onChange={(event) => setLanguage(event.target.value as LanguageCode)}
      >
        {Object.entries(LANGUAGES).map(([code, { label, available }]) => (
          <option key={code} value={code} disabled={!available}>
            {label}
            {available ? "" : " (soon)"}
          </option>
        ))}
      </select>
      <span className="text-ink-400" aria-hidden>
        ·
      </span>
      <select
        aria-label="Currency"
        className="cursor-pointer rounded-lg bg-transparent py-1 font-semibold text-ink-600 hover:text-ocean-900"
        value={currency}
        onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
      >
        {Object.keys(CURRENCIES).map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </div>
  );
}
