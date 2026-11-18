import type { Coordinates, LocationId } from "./location";
import type { PhotoKey } from "@/lib/images";
import type { Review } from "./review";

export type Amenity =
  | "pool"
  | "spa"
  | "breakfast"
  | "wifi"
  | "parking"
  | "mountain-view"
  | "beachfront"
  | "air-conditioning"
  | "airport-pickup"
  | "garden"
  | "pet-friendly"
  | "restaurant"
  | "fireplace"
  | "eco";

export interface Room {
  id: string;
  name: string;
  bed: string;
  sizeM2: number;
  sleeps: number;
  features: string[];
  priceUsdPerNight: number;
  photo: PhotoKey;
  /** Free cancellation up to this many days before check-in. Omit if non-refundable. */
  freeCancellationDays?: number;
  /** Rooms left at this price, shown as scarcity when low. */
  remaining?: number;
}

export interface Hotel {
  slug: string;
  name: string;
  location: LocationId;
  /** e.g. "0.8 km from Nine Arch Bridge" */
  locationNote: string;
  description: string;
  photo: PhotoKey;
  gallery: PhotoKey[];
  rating: number;
  reviewCount: number;
  amenities: Amenity[];
  guidesPick?: boolean;
  coordinates: Coordinates;
  rooms: Room[];
  reviews: Review[];
}
