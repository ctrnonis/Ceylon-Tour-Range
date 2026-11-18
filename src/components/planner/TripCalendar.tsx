"use client";

import { getLocation } from "@/lib/data/locations";
import { addDays, toIsoDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Itinerary } from "@/lib/types";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Month calendar(s) covering the trip; trip days are highlighted and selectable. */
export default function TripCalendar({ trip, onSelect }: { trip: Itinerary; onSelect: (dayId: string) => void }) {
  const tripDates = new Map(trip.days.map((day, index) => [addDays(trip.startDate, index), { day, index }]));
  const first = new Date(`${trip.startDate}T00:00:00`);
  const last = new Date(`${addDays(trip.startDate, Math.max(0, trip.days.length - 1))}T00:00:00`);

  const months: Date[] = [];
  for (
    let m = new Date(first.getFullYear(), first.getMonth(), 1);
    m <= last;
    m = new Date(m.getFullYear(), m.getMonth() + 1, 1)
  ) {
    months.push(m);
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {months.map((month) => {
        const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
        const offset = (month.getDay() + 6) % 7; // Monday-first grid
        return (
          <section key={month.toISOString()} className="panel !p-5">
            <h3 className="mb-3">{month.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</h3>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {WEEKDAYS.map((weekday) => (
                <span key={weekday} className="py-1 font-bold text-ink-400">
                  {weekday}
                </span>
              ))}
              {Array.from({ length: offset }, (_, i) => (
                <span key={`pad-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const iso = toIsoDate(new Date(month.getFullYear(), month.getMonth(), i + 1));
                const entry = tripDates.get(iso);
                if (!entry) {
                  return (
                    <span key={iso} className="rounded-lg py-2 text-ink-400">
                      {i + 1}
                    </span>
                  );
                }
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => onSelect(entry.day.id)}
                    className={cn(
                      "flex flex-col items-center rounded-lg py-1.5 font-bold text-white",
                      entry.index % 2 ? "bg-sun-600" : "bg-ocean-700",
                    )}
                    title={`Day ${entry.index + 1}: ${getLocation(entry.day.location).name}`}
                  >
                    {i + 1}
                    <span className="max-w-full truncate px-0.5 text-[0.6rem] font-semibold opacity-85">
                      {getLocation(entry.day.location).name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
