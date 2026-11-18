import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";

/**
 * Star rating. `compact` shows a single star with the score (for cards and
 * table rows); the full version shows five stars.
 */
export default function Rating({
  value,
  count,
  compact = false,
  hideValue = false,
  className,
}: {
  value: number;
  count?: number;
  compact?: boolean;
  /** Stars only, no numeric score. */
  hideValue?: boolean;
  className?: string;
}) {
  const label = `Rated ${value.toFixed(1)} out of 5${count ? ` from ${formatNumber(count)} reviews` : ""}`;

  return (
    <span className={cn("inline-flex items-center gap-0.5 text-sun-500", className)} aria-label={label}>
      {compact ? (
        <Star className="h-[15px] w-[15px] fill-current" strokeWidth={0} aria-hidden />
      ) : (
        Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            aria-hidden
            strokeWidth={0}
            className={cn("h-[15px] w-[15px]", i < Math.round(value) ? "fill-current" : "fill-[#ddd8cc]")}
          />
        ))
      )}
      {hideValue ? null : <span className="ml-1.5 text-sm font-bold text-ink-900">{value.toFixed(1)}</span>}
      {count !== undefined ? <span className="ml-1 text-sm text-ink-400">({formatNumber(count)})</span> : null}
    </span>
  );
}
