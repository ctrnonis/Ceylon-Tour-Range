import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "teal" | "amber" | "green" | "red" | "light";

export default function Badge({
  tone = "teal",
  children,
  className,
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("badge", `badge-${tone}`, className)}>{children}</span>;
}
