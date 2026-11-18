import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Shared max-width and horizontal padding. Wrap every page section in this
 * instead of repeating padding classes, so page width stays consistent.
 */
export default function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6", className)}>{children}</div>;
}
