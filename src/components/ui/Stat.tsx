import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** KPI tile used on the dashboards. `trend` colours the note green/red. */
export default function Stat({
  label,
  value,
  note,
  trend,
}: {
  label: string;
  value: ReactNode;
  note?: string;
  trend?: "up" | "down";
}) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {note ? (
        <span
          className={cn(
            "text-xs font-bold",
            trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-ink-400",
          )}
        >
          {note}
        </span>
      ) : null}
    </div>
  );
}
