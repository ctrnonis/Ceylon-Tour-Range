"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LayoutGrid, Map as MapIcon, Plus, Search } from "lucide-react";
import AttractionCard, { AttractionPrice } from "./AttractionCard";
import IslandMap from "@/components/map/IslandMap";
import { ButtonLink } from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import EmptyState from "@/components/ui/EmptyState";
import Rating from "@/components/ui/Rating";
import Tabs from "@/components/ui/Tabs";
import { attractionCategories, attractions } from "@/lib/data/attractions";
import { getLocation } from "@/lib/data/locations";
import { cn } from "@/lib/cn";
import type { AttractionCategory } from "@/lib/types";

type View = "list" | "map";
type CategoryFilter = AttractionCategory | "all";

/** Searchable, filterable attractions directory with a list/map toggle. */
export default function AttractionsExplorer({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [view, setView] = useState<View>("list");
  const [selected, setSelected] = useState<string | undefined>();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return attractions.filter((attraction) => {
      if (category !== "all" && attraction.category !== category) return false;
      if (!q) return true;
      const haystack = [
        attraction.name,
        attraction.subtitle,
        getLocation(attraction.location).name,
        getLocation(attraction.location).district,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, category]);

  const selectedAttraction = results.find((a) => a.slug === selected) ?? results[0];

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block sm:w-72">
            <span className="sr-only">Search attractions</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-400"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or town"
              className="input input-sm pl-10"
            />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <Chip active={category === "all"} onClick={() => setCategory("all")}>
              All
            </Chip>
            {Object.entries(attractionCategories).map(([value, label]) => (
              <Chip key={value} active={category === value} onClick={() => setCategory(value as AttractionCategory)}>
                {label}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Tabs
            label="View"
            value={view}
            onChange={setView}
            options={[
              {
                value: "list",
                label: (
                  <>
                    <LayoutGrid aria-hidden /> List
                  </>
                ),
              },
              {
                value: "map",
                label: (
                  <>
                    <MapIcon aria-hidden /> Map
                  </>
                ),
              },
            ]}
          />
          <ButtonLink href="/guide#add-place" variant="accent" size="sm">
            <Plus aria-hidden /> Add new place
          </ButtonLink>
        </div>
      </div>

      <p className="mb-4 text-sm text-ink-400" aria-live="polite">
        {results.length} {results.length === 1 ? "place" : "places"}
      </p>

      {results.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No places match"
          description="Try another town or clear the category filter."
        />
      ) : (
        <div className={cn("grid gap-6", view === "list" && "lg:grid-cols-[1fr_380px]")}>
          <div className={cn("grid gap-6 sm:grid-cols-2", view === "map" && "hidden")}>
            {results.map((attraction) => (
              <AttractionCard key={attraction.slug} attraction={attraction} />
            ))}
          </div>

          <IslandMap
            className={cn(view === "list" ? "hidden h-[560px] lg:sticky lg:top-24 lg:block" : "h-[640px]")}
            markers={results.map((attraction, index) => ({
              id: attraction.slug,
              coordinates: attraction.coordinates,
              label: attraction.name,
              tone: index % 2 ? "amber" : "teal",
            }))}
            selectedId={selectedAttraction?.slug}
            onSelect={setSelected}
          >
            {selectedAttraction ? (
              <div className="panel absolute right-4 bottom-4 left-4 z-10 !p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <strong>{selectedAttraction.name}</strong>
                    <div className="flex items-center gap-2 text-sm text-ink-400">
                      <Rating value={selectedAttraction.rating} compact />·{" "}
                      {attractionCategories[selectedAttraction.category]} ·{" "}
                      <AttractionPrice attraction={selectedAttraction} />
                    </div>
                  </div>
                  <Link href={`/attractions/${selectedAttraction.slug}`} className="btn btn-primary btn-sm">
                    View
                  </Link>
                </div>
              </div>
            ) : null}
          </IslandMap>
        </div>
      )}
    </>
  );
}
