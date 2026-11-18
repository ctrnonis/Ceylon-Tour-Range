import type { Coordinates, LocationId } from "./location";
import type { PhotoKey } from "@/lib/images";
import type { Review } from "./review";

export type AttractionCategory = "heritage" | "beaches" | "hiking" | "wildlife" | "culture" | "food";

export interface Attraction {
  slug: string;
  name: string;
  category: AttractionCategory;
  location: LocationId;
  /** Short line under the name on cards, e.g. "Matale District · UNESCO site". */
  subtitle: string;
  description: string;
  photo: PhotoKey;
  gallery: PhotoKey[];
  rating: number;
  reviewCount: number;
  /** Entry or tour price per person in USD. 0 means free. */
  priceUsd: number;
  priceUnit?: "entry" | "tour";
  durationHours: number;
  /** Suggested start time, e.g. "06:30". */
  bestStart: string;
  /** Extra facts shown as tiles on the details page. */
  facts?: { label: string; value: string }[];
  tags?: string[];
  /** Id of the guide who added the listing (see data/guides.ts). */
  addedBy: string;
  coordinates: Coordinates;
  reviews: Review[];
}
