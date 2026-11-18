import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Eyebrow / title / description block used at the top of page sections. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Heading>{title}</Heading>
      {description ? <p className="lede">{description}</p> : null}
    </div>
  );
}
