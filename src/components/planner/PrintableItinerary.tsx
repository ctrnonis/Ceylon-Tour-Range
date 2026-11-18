import { getLocation } from "@/lib/data/locations";
import { addDays, formatDate } from "@/lib/format";
import { SITE_NAME } from "@/lib/site";
import type { Itinerary } from "@/lib/types";

/**
 * Print-only version of the whole trip. "Export PDF" opens the browser's
 * print dialog, where the visitor can save as PDF; everything else on the
 * page is hidden with `print:hidden`.
 */
export default function PrintableItinerary({ trip }: { trip: Itinerary }) {
  return (
    <section className="hidden print:block">
      <p className="text-sm">{SITE_NAME}</p>
      <h1 className="!text-3xl">{trip.name}</h1>
      <p className="mb-6">
        {formatDate(trip.startDate)} – {formatDate(addDays(trip.startDate, trip.days.length - 1))} · {trip.days.length} days ·{" "}
        {trip.travellers} travellers
      </p>
      {trip.days.map((day, index) => (
        <div key={day.id} className="mb-4 break-inside-avoid">
          <h3>
            Day {index + 1} · {formatDate(addDays(trip.startDate, index), { weekday: "long" })} · {getLocation(day.location).name}
          </h3>
          <ul className="mt-1 list-disc pl-5 text-sm">
            {day.stops.length === 0 ? <li>Free day</li> : null}
            {day.stops.map((stop) => (
              <li key={stop.id}>
                {stop.time ? `${stop.time} ` : ""}
                {stop.title}
                {stop.note ? ` (${stop.note})` : ""}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
