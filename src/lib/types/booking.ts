import type { LocationId } from "./location";
import type { VehicleId, Driver } from "./taxi";

export type BookingStatus = "confirmed" | "payment-due" | "scheduled" | "completed" | "cancelled";

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  requests?: string;
}

export interface HotelBooking {
  id: string;
  type: "hotel";
  hotelSlug: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalUsd: number;
  status: BookingStatus;
  guest: GuestDetails;
  paymentMethod: "card" | "paypal" | "pay-at-hotel";
  createdAt: string;
}

export interface TaxiBooking {
  id: string;
  type: "taxi";
  pickup: LocationId;
  dropoff: LocationId;
  date: string;
  time: string;
  vehicle: VehicleId;
  distanceKm: number;
  fareUsd: number;
  status: BookingStatus;
  driver?: Driver;
  createdAt: string;
}

export type Booking = HotelBooking | TaxiBooking;
