import { getLocation } from "@/lib/data/locations";
import type { Trail } from "@/lib/types";

/** Read-only day list on a trail's page. */
export default function DayByDayPreview({ trail }: { trail: Trail }) {
  return (
    <ol className="timeline">
      {trail.days.map((day, index) => (
        <li key={index} className={index % 2 ? "timeline-item timeline-item-amber pb-4" : "timeline-item pb-4"}>
          <div className="row-item block">
            <div className="flex items-center justify-between gap-3">
              <strong>Day {index + 1}</strong>
              <span className="text-sm text-ink-400">{getLocation(day.location).name}</span>
            </div>
            <p className="mt-1 text-sm text-ink-600">{day.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
