"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabOption<T extends string> {
  value: T;
  label: ReactNode;
}

/** Segmented pill tabs (List / Map, Upcoming / Past, ...). Controlled. */
export default function Tabs<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the tab list. */
  label: string;
  className?: string;
}) {
  return (
    <div role="tablist" aria-label={label} className={cn("tabs", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={option.value === value}
          className="tab"
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
