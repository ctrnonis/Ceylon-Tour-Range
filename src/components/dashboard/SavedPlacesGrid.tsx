"use client";

import Link from "next/link";
import { Heart, X } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import { getAttraction } from "@/lib/data/attractions";
import { photos } from "@/lib/images";
import { toggleSavedPlace } from "@/lib/store/trip-store";
import type { Attraction } from "@/lib/types";

/** Image tiles for saved attractions. `limit` for the overview preview. */
export default function SavedPlacesGrid({
  slugs,
  limit,
  removable = false,
}: {
  slugs: string[];
  limit?: number;
  removable?: boolean;
}) {
  const places = slugs
    .map(getAttraction)
    .filter((a): a is Attraction => Boolean(a))
    .slice(0, limit);

  if (places.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="No saved places"
        description="Tap Save on any attraction to keep it here."
        action={
          <ButtonLink href="/attractions" size="sm">
            Browse attractions
          </ButtonLink>
        }
      />
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {places.map((place) => (
        <li key={place.slug} className="relative">
          <Link href={`/attractions/${place.slug}`} className="tile bg-ocean-100">
            <Photo src={photos[place.photo]} alt="" sizes="200px" />
            <span>{place.name}</span>
          </Link>
          {removable ? (
            <button
              type="button"
              onClick={() => toggleSavedPlace(place.slug)}
              className="absolute top-2 right-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-ink-600 shadow hover:text-danger"
              aria-label={`Remove ${place.name}`}
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
