import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** White rounded surface used for forms, sidebars and grouped content. */
export default function Panel({
  as: Tag = "div",
  children,
  className,
  id,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("panel", className)}>
      {children}
    </Tag>
  );
}
