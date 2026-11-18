import { bookingsByMonth } from "@/lib/data/platform";

const max = Math.max(...bookingsByMonth.flatMap((m) => [m.hotels, m.taxis]));
const series = [
  { key: "hotels", label: "Hotels", className: "bg-ocean-500" },
  { key: "taxis", label: "Taxis", className: "bg-sun-500" },
] as const;

/**
 * Grouped bar chart of monthly bookings by service. Plain CSS bars; a
 * charting library can replace this when the admin gets real reporting.
 * The visually hidden table gives screen readers the same numbers.
 */
export default function BookingsChart() {
  return (
    <figure>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3>Bookings by service</h3>
        <div className="flex gap-4 text-sm text-ink-600" aria-hidden>
          {series.map((s) => (
            <span key={s.key} className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-sm ${s.className}`} /> {s.label}
            </span>
          ))}
        </div>
      </div>
      <div className="flex h-56 items-end gap-3 border-b border-sand-100 sm:gap-6" aria-hidden>
        {bookingsByMonth.map((month) => (
          <div key={month.month} className="flex h-full flex-1 items-end justify-center gap-1.5">
            {series.map((s) => (
              <div
                key={s.key}
                className={`w-full max-w-7 rounded-t-md ${s.className} transition-all`}
                style={{ height: `${(month[s.key] / max) * 100}%` }}
                title={`${month.month} ${s.label}: ${month[s.key]}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-3 text-center text-xs text-ink-400 sm:gap-6" aria-hidden>
        {bookingsByMonth.map((month) => (
          <span key={month.month} className="flex-1">
            {month.month}
          </span>
        ))}
      </div>
      <table className="sr-only">
        <caption>Bookings by service per month</caption>
        <thead>
          <tr>
            <th>Month</th>
            <th>Hotels</th>
            <th>Taxis</th>
          </tr>
        </thead>
        <tbody>
          {bookingsByMonth.map((m) => (
            <tr key={m.month}>
              <td>{m.month}</td>
              <td>{m.hotels}</td>
              <td>{m.taxis}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
