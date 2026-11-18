import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Friendly placeholder for lists with nothing in them yet. */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-ocean-700/20 px-6 py-12 text-center">
      <span className="feature-icon">
        <Icon aria-hidden />
      </span>
      <h3>{title}</h3>
      {description ? <p className="max-w-sm text-sm text-ink-600">{description}</p> : null}
      {action}
    </div>
  );
}
