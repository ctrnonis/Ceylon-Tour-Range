import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Toggleable filter chip. Pass `onClick` + `active` for filters, omit both for a static tag. */
export default function Chip({
  children,
  active,
  onClick,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  if (!onClick) return <span className={cn("chip", className)}>{children}</span>;

  return (
    <button type="button" className={cn("chip", className)} aria-pressed={active ?? false} onClick={onClick}>
      {children}
    </button>
  );
}
