import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Money from "@/components/ui/Money";
import Photo from "@/components/ui/Photo";
import Rating from "@/components/ui/Rating";
import { attractionCategories } from "@/lib/data/attractions";
import { photos } from "@/lib/images";
import type { Attraction } from "@/lib/types";

/** Grid card used on the homepage and the attractions directory. */
export default function AttractionCard({ attraction, showCount = false }: { attraction: Attraction; showCount?: boolean }) {
  return (
    <Link href={`/attractions/${attraction.slug}`} className="card card-interactive">
      <div className="card-media">
        <Photo src={photos[attraction.photo]} alt={attraction.name} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
        <Badge tone="light" className="absolute top-3.5 left-3.5">
          {attractionCategories[attraction.category]}
        </Badge>
      </div>
      <div className="px-5 pt-5 pb-6">
        <h3 className="mb-1.5">{attraction.name}</h3>
        <p className="text-sm text-ink-400">{attraction.subtitle}</p>
        <div className="mt-3.5 flex items-center justify-between">
          <Rating value={attraction.rating} count={showCount ? attraction.reviewCount : undefined} compact />
          <AttractionPrice attraction={attraction} />
        </div>
      </div>
    </Link>
  );
}

export function AttractionPrice({ attraction }: { attraction: Attraction }) {
  if (attraction.priceUsd === 0) return <span className="price">Free</span>;
  return (
    <span className="price">
      <Money usd={attraction.priceUsd} /> {attraction.priceUnit ? <small>/ {attraction.priceUnit}</small> : null}
    </span>
  );
}
