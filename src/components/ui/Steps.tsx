import { Check } from "lucide-react";
import { Fragment } from "react";
import { cn } from "@/lib/cn";

/** Horizontal progress indicator for multi-step flows (checkout). */
export default function Steps({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-3" aria-label="Progress">
      {steps.map((step, index) => {
        const done = index < current;
        const active = index <= current;
        return (
          <Fragment key={step}>
            {index > 0 ? (
              <li
                aria-hidden
                className={cn(
                  "hidden h-0.5 flex-1 sm:block",
                  done || index === current ? "bg-ocean-500" : "bg-sand-100",
                )}
              />
            ) : null}
            <li
              className={cn(
                "flex items-center gap-2.5 text-sm font-bold",
                active ? "step-active text-ocean-900" : "text-ink-400",
              )}
              aria-current={index === current ? "step" : undefined}
            >
              <span className="step-dot">{done ? <Check aria-hidden /> : index + 1}</span>
              {step}
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}
