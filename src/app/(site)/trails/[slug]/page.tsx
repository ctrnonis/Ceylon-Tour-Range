import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarFront, Info, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Panel from "@/components/ui/Panel";
import TrailHero from "@/components/trails/TrailHero";
import DayByDayPreview from "@/components/trails/DayByDayPreview";
import IslandMap from "@/components/map/IslandMap";
import { trails, getTrailBySlug } from "@/lib/data/trails";
import { getLocation } from "@/lib/data/locations";

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return trails.map((trail) => ({ slug: trail.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const trail = getTrailBySlug((await params).slug);
  return trail ? { title: trail.name, description: trail.description } : { title: "Trail not found" };
}

export default async function TrailDetailPage({ params }: { params: PageParams }) {
  const trail = getTrailBySlug((await params).slug);
  if (!trail) notFound();

  const stops = trail.days.map((day) => getLocation(day.location));
  const uniqueStops = stops.filter((stop, index) => stops.findIndex((s) => s.id === stop.id) === index);

  return (
    <>
      <TrailHero trail={trail} />

      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_380px]">
        <div>
          <span className="eyebrow">Sample route</span>
          <h2 className="mb-6">Day by day</h2>
          <DayByDayPreview trail={trail} />
          {trail.note ? (
            <p className="mt-4 flex gap-2 rounded-[var(--radius-md)] border-l-4 border-sun-500 bg-sun-500/10 p-4 text-sm text-ink-600">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-sun-600" aria-hidden /> {trail.note}
            </p>
          ) : null}
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <IslandMap
            className="h-[360px]"
            markers={uniqueStops.map((stop, index) => ({
              id: stop.id,
              coordinates: stop,
              label: stop.name,
              tone: index % 2 ? "amber" : "teal",
            }))}
            route={stops}
            showLabels
          />
          <Panel>
            <h3 className="mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-sun-500" aria-hidden /> Signature activities
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-ink-600">
              {trail.activities.map((activity) => (
                <li key={activity} className="border-b border-sand-100 pb-2 last:border-0">
                  {activity}
                </li>
              ))}
            </ul>
            <div className="divider" />
            <h3 className="mb-2 flex items-center gap-2">
              <CarFront className="h-5 w-5 text-ocean-500" aria-hidden /> Getting around
            </h3>
            <p className="text-sm text-ink-600">{trail.vehicleProfile}</p>
            <ButtonLink href={`/plan?trail=${trail.slug}`} variant="accent" block className="mt-6">
              Plan this trail
            </ButtonLink>
          </Panel>
        </aside>
      </Container>
    </>
  );
}
