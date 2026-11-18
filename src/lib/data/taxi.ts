import type { Driver, FareEstimate, LocationId, Vehicle, VehicleId } from "@/lib/types";
import { getLocation } from "./locations";
import { driveMinutes, roadKm } from "@/lib/geo";

/**
 * Taxi vehicles and fare rules. Fares are fixed at booking time
 * (distance × rate + flag fall). Placeholder rates; the client sets the
 * real ones before launch.
 */
export const vehicles: Vehicle[] = [
  {
    id: "tuk-tuk",
    name: "Tuk-tuk",
    passengers: 2,
    bags: 1,
    features: ["Short town trips"],
    baseFareUsd: 1,
    perKmUsd: 0.35,
    maxKm: 30,
  },
  {
    id: "sedan",
    name: "Sedan",
    passengers: 3,
    bags: 2,
    features: ["A/C"],
    baseFareUsd: 5,
    perKmUsd: 0.32,
  },
  {
    id: "suv",
    name: "SUV / 4x4",
    passengers: 4,
    bags: 4,
    features: ["A/C", "Off-road capable"],
    baseFareUsd: 8,
    perKmUsd: 0.4,
  },
  {
    id: "van",
    name: "Van",
    passengers: 6,
    bags: 6,
    features: ["A/C", "Extra luggage"],
    baseFareUsd: 8,
    perKmUsd: 0.44,
  },
];

export function getVehicle(id: VehicleId): Vehicle {
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) throw new Error(`Unknown vehicle: ${id}`);
  return vehicle;
}

/** Fare estimates for every vehicle between two locations. */
export function estimateFares(pickup: LocationId, dropoff: LocationId): FareEstimate[] {
  const distanceKm = Math.max(3, roadKm(getLocation(pickup), getLocation(dropoff)));
  const durationMin = driveMinutes(distanceKm);

  return vehicles.map((vehicle) => ({
    vehicle: vehicle.id,
    distanceKm,
    durationMin,
    fareUsd: Math.round(vehicle.baseFareUsd + vehicle.perKmUsd * distanceKm),
    available: vehicle.maxKm === undefined || distanceKm <= vehicle.maxKm,
  }));
}

/** Sample driver pool; a real driver is assigned by dispatch in the backend phase. */
export const drivers: Driver[] = [
  { name: "Kasun D.", car: "Toyota Prius", plate: "CAB-4471", rating: 4.9 },
  { name: "Ishara M.", car: "Toyota KDH van", plate: "PH-2290", rating: 4.8 },
  { name: "Roshan F.", car: "Suzuki Wagon R", plate: "CAR-8812", rating: 4.7 },
];

export function assignDriver(vehicle: VehicleId): Driver {
  if (vehicle === "van") return drivers[1]!;
  if (vehicle === "tuk-tuk") return drivers[2]!;
  return drivers[0]!;
}
