"use client";

import { useMemo, useState } from "react";
import { BedDouble, LayoutList, Map as MapIcon } from "lucide-react";
import HotelRowCard from "./HotelRowCard";
import IslandMap from "@/components/map/IslandMap";
import Chip from "@/components/ui/Chip";
import EmptyState from "@/components/ui/EmptyState";
import Tabs from "@/components/ui/Tabs";
import { hotels, lowestRate } from "@/lib/data/hotels";
import { getLocation } from "@/lib/data/locations";
import { useMoney } from "@/lib/store/preferences-store";
import type { Hotel } from "@/lib/types";

const filters = {
  budget: { label: (money: (usd: number) => string) => `Under ${money(50)}`, test: (h: Hotel) => lowestRate(h) < 50 },
  rated: { label: () => "Rated 4.5+", test: (h: Hotel) => h.rating >= 4.5 },
  pool: { label: () => "Pool", test: (h: Hotel) => h.amenities.includes("pool") },
  breakfast: { label: () => "Breakfast included", test: (h: Hotel) => h.amenities.includes("breakfast") },
  beach: { label: () => "Beachfront", test: (h: Hotel) => h.amenities.includes("beachfront") },
  eco: { label: () => "Eco lodge", test: (h: Hotel) => h.amenities.includes("eco") },
} as const;

type FilterKey = keyof typeof filters;
type Sort = "recommended" | "price" | "rating";

const sorters: Record<Sort, (a: Hotel, b: Hotel) => number> = {
  recommended: (a, b) => Number(b.guidesPick ?? false) - Number(a.guidesPick ?? false) || b.rating - a.rating,
  price: (a, b) => lowestRate(a) - lowestRate(b),
  rating: (a, b) => b.rating - a.rating,
};

/** Hotel search results: text search, amenity filters, sort, list/map view. */
export default function HotelsExplorer({ initialQuery = "" }: { initialQuery?: string }) {
  const money = useMoney();
  const [query, setQuery] = useState(initialQuery);
  const [active, setActive] = useState<FilterKey[]>([]);
  const [sort, setSort] = useState<Sort>("recommended");
  const [view, setView] = useState<"list" | "map">("list");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hotels
      .filter((hotel) => active.every((key) => filters[key].test(hotel)))
      .filter((hotel) => {
        if (!q) return true;
        const location = getLocation(hotel.location);
        return [hotel.name, location.name, location.district].join(" ").toLowerCase().includes(q);
      })
      .sort(sorters[sort]);
  }, [query, active, sort]);

  const toggle = (key: FilterKey) =>
    setActive((current) => (current.includes(key) ? current.filter((k) => k !== key) : [...current, key]));

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filters">
          <label className="mr-2 block w-full sm:w-60">
            <span className="sr-only">Search hotels by town</span>
            <input
              type="search"
              className="input input-sm"
              placeholder="Town or hotel name"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <Chip active={active.length === 0} onClick={() => setActive([])}>
            All
          </Chip>
          {(Object.keys(filters) as FilterKey[]).map((key) => (
            <Chip key={key} active={active.includes(key)} onClick={() => toggle(key)}>
              {filters[key].label(money)}
            </Chip>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label>
            <span className="sr-only">Sort</span>
            <select className="input input-sm" value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
              <option value="recommended">Sort: Recommended</option>
              <option value="price">Price: low to high</option>
              <option value="rating">Rating</option>
            </select>
          </label>
          <Tabs
            label="View"
            value={view}
            onChange={setView}
            options={[
              {
                value: "list",
                label: (
                  <>
                    <LayoutList aria-hidden /> List
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
        </div>
      </div>

      <p className="mb-4 text-sm text-ink-400" aria-live="polite">
        {results.length} {results.length === 1 ? "stay" : "stays"}
      </p>

      {results.length === 0 ? (
        <EmptyState
          icon={BedDouble}
          title="No stays match"
          description="Try removing a filter or searching another town."
        />
      ) : view === "list" ? (
        <div className="flex flex-col gap-4">
          {results.map((hotel) => (
            <HotelRowCard key={hotel.slug} hotel={hotel} />
          ))}
        </div>
      ) : (
        <IslandMap
          className="h-[640px]"
          showLabels
          markers={results.map((hotel) => ({
            id: hotel.slug,
            coordinates: hotel.coordinates,
            label: `${hotel.name} · ${money(lowestRate(hotel))}`,
          }))}
          onSelect={(slug) => window.location.assign(`/hotels/${slug}`)}
        />
      )}
    </>
  );
}
