import type { ReactNode } from "react";
import Container from "./Container";
import { cn } from "@/lib/cn";

/** Dark gradient header used at the top of interior pages. */
export default function PageHero({
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Extra content under the heading, e.g. a search bar. */
  children?: ReactNode;
}) {
  return (
    <header className="page-hero">
      <Container className={cn(align === "center" && "text-center")}>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {description ? (
          <p className={cn("lede max-w-2xl", align === "center" && "mx-auto")}>{description}</p>
        ) : null}
        {children}
      </Container>
    </header>
  );
}
