import { Route } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Photo from "@/components/ui/Photo";
import { photos } from "@/lib/images";
import { cn } from "@/lib/cn";
import type { Trail } from "@/lib/types";
import { trailColorClasses } from "./trail-colors";

export default function TrailHero({ trail }: { trail: Trail }) {
  return (
    <header className="page-hero">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className={cn("badge mb-4 text-white", trailColorClasses[trail.color].bg)}>{trail.givenName}</span>
          <h1>{trail.name}</h1>
          <p className="lede max-w-lg">{trail.description}</p>
          <p className="mt-4 text-sm font-semibold text-white/70">{trail.region}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <ButtonLink href={`/plan?trail=${trail.slug}`} variant="accent">
              <Route aria-hidden /> Plan this trail
            </ButtonLink>
            <Badge tone="light">{trail.days.length} days</Badge>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]">
          <Photo src={photos[trail.photo]} alt={trail.name} sizes="(min-width: 1024px) 560px, 100vw" priority />
        </div>
      </Container>
    </header>
  );
}
