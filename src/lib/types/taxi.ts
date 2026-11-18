import type { LocationId } from "./location";

export type VehicleId = "tuk-tuk" | "sedan" | "van" | "suv";

export interface Vehicle {
  id: VehicleId;
  name: string;
  passengers: number;
  bags: number;
  features: string[];
  /** Flag fall in USD. */
  baseFareUsd: number;
  perKmUsd: number;
  /** Longest trip this vehicle accepts, in road km. */
  maxKm?: number;
}

export interface Driver {
  name: string;
  car: string;
  plate: string;
  rating: number;
}

export interface FareEstimate {
  vehicle: VehicleId;
  distanceKm: number;
  durationMin: number;
  fareUsd: number;
  available: boolean;
}

export interface RideRequest {
  pickup: LocationId;
  dropoff: LocationId;
  /** ISO date */
  date: string;
  /** "06:00" */
  time: string;
  vehicle: VehicleId;
}
