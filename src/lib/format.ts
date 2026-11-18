/**
 * Display formatting helpers (dates, distances, durations). Currency lives
 * in lib/currency.ts because it depends on the visitor's chosen currency.
 */
const LOCALE = "en-GB";

/** "14 Aug 2026" from an ISO date string (YYYY-MM-DD). */
export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = {}): string {
  const date = parseIsoDate(iso);
  return date.toLocaleDateString(LOCALE, { day: "numeric", month: "short", year: "numeric", ...options });
}

/** "Thu, 14 Aug" */
export function formatShortDate(iso: string): string {
  return formatDate(iso, { weekday: "short", year: undefined });
}

/** Number of nights between two ISO dates (minimum 0). */
export function nightsBetween(checkIn: string, checkOut: string): number {
  const ms = parseIsoDate(checkOut).getTime() - parseIsoDate(checkIn).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

/** Adds days to an ISO date and returns a new ISO date. */
export function addDays(iso: string, days: number): string {
  const date = parseIsoDate(iso);
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Today's date as ISO, in the visitor's local time zone. */
export function todayIso(): string {
  return toIsoDate(new Date());
}

/** "5 h 40 m" from minutes. */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m} m`;
  return m === 0 ? `${h} h` : `${h} h ${m} m`;
}

/** "1,240" */
export function formatNumber(value: number): string {
  return value.toLocaleString(LOCALE);
}

/** "18.4k" for dashboard KPIs. */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat(LOCALE, { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

/** Two-letter initials for avatars: "Nuwan Gamage" -> "NG". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function parseIsoDate(iso: string): Date {
  // Parse as local midnight; `new Date("2026-08-14")` would be UTC and can
  // shift a day in negative-offset time zones.
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}
