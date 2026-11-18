import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarClock, Clock, MapPin, Ticket } from "lucide-react";
import AttractionActions from "@/components/attractions/AttractionActions";
import AttractionCard from "@/components/attractions/AttractionCard";
import IslandMap from "@/components/map/IslandMap";
import ReviewList from "@/components/reviews/ReviewList";
import Badge from "@/components/ui/Badge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Container from "@/components/ui/Container";
import Gallery from "@/components/ui/Gallery";
import Money from "@/components/ui/Money";
import Rating from "@/components/ui/Rating";
import { attractionCategories, attractions, attractionsNear, getAttraction } from "@/lib/data/attractions";
import { getGuide } from "@/lib/data/guides";
import { getLocation } from "@/lib/data/locations";

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return attractions.map((attraction) => ({ slug: attraction.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const attraction = getAttraction((await params).slug);
  return attraction ? { title: attraction.name, description: attraction.description } : { title: "Place not found" };
}

export default async function AttractionPage({ params }: { params: PageParams }) {
  const attraction = getAttraction((await params).slug);
  if (!attraction) notFound();

  const location = getLocation(attraction.location);
  const guide = getGuide(attraction.addedBy);
  const nearby = attractionsNear(attraction.location, attraction.slug).slice(0, 3);

  const facts = [
    { Icon: Clock, label: "Duration", value: `${attraction.durationHours} hrs` },
    { Icon: CalendarClock, label: "Best start", value: attraction.bestStart },
    { Icon: Ticket, label: "Entry", value: attraction.priceUsd === 0 ? "Free" : <Money usd={attraction.priceUsd} /> },
    ...(attraction.facts ?? []).map((fact) => ({ Icon: MapPin, label: fact.label, value: fact.value })),
  ].slice(0, 4);

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs
          items={[
            { label: "Attractions", href: "/attractions" },
            { label: location.district },
            { label: attraction.name },
          ]}
        />
        <Gallery images={attraction.gallery} alt={attraction.name} />
      </Container>

      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge>{attractionCategories[attraction.category]}</Badge>
            {attraction.tags?.map((tag) => (
              <Badge key={tag} tone="amber">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="!text-[clamp(2rem,4vw,3rem)]">{attraction.name}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-ink-400">
            <Rating value={attraction.rating} count={attraction.reviewCount} />· {location.name}, {location.district}{" "}
            District
          </p>

          <div className="divider" />
          <h3>About this place</h3>
          <p className="mt-2 text-ink-600">{attraction.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map(({ Icon, label, value }) => (
              <div key={label} className="panel !p-4 text-center">
                <Icon className="mx-auto mb-1 h-5 w-5 text-ocean-500" aria-hidden />
                <dd className="font-bold">{value}</dd>
                <dt className="text-sm text-ink-400">{label}</dt>
              </div>
            ))}
          </dl>

          <div className="divider" />
          <h3 className="mb-3">Location</h3>
          <IslandMap
            className="h-[320px]"
            markers={[{ id: attraction.slug, coordinates: attraction.coordinates, label: attraction.name }]}
            showLabels
          />

          <div className="divider" />
          <ReviewList reviews={attraction.reviews} subject={attraction.name} />

          {guide ? (
            <p className="mt-6 text-sm text-ink-400">
              Added by <strong className="text-ink-900">{guide.name} · Verified guide</strong>
            </p>
          ) : null}
        </div>

        <div>
          <AttractionActions attraction={attraction} />
        </div>
      </Container>

      {nearby.length ? (
        <Container className="pb-16">
          <h2 className="mb-6">More in {location.name}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((item) => (
              <AttractionCard key={item.slug} attraction={item} />
            ))}
          </div>
        </Container>
      ) : null}
    </>
  );
}
