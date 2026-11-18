"use client";

import { createPersistentStore } from "./create-store";
import { demoBookings } from "@/lib/data/demo-account";
import { createId } from "@/lib/id";
import type { Booking, BookingStatus, HotelBooking, TaxiBooking } from "@/lib/types";

/**
 * Hotel and taxi bookings for the current visitor. Mutations are exposed
 * as functions so each maps to one API call in the backend phase.
 */
export const bookingStore = createPersistentStore<Booking[]>("bookings", demoBookings);

export function useBookings() {
  return bookingStore.useValue();
}

type NewBooking<T extends Booking> = Omit<T, "id" | "createdAt">;

export function createHotelBooking(input: NewBooking<HotelBooking>): HotelBooking {
  const booking: HotelBooking = { ...input, id: createId("bk"), createdAt: new Date().toISOString() };
  bookingStore.set((bookings) => [booking, ...bookings]);
  return booking;
}

export function createTaxiBooking(input: NewBooking<TaxiBooking>): TaxiBooking {
  const booking: TaxiBooking = { ...input, id: createId("bk"), createdAt: new Date().toISOString() };
  bookingStore.set((bookings) => [booking, ...bookings]);
  return booking;
}

export function setBookingStatus(id: string, status: BookingStatus) {
  bookingStore.set((bookings) => bookings.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
}

/** Groups used by the dashboard tabs. */
export function bookingGroup(booking: Booking): "upcoming" | "past" | "cancelled" {
  if (booking.status === "cancelled") return "cancelled";
  if (booking.status === "completed") return "past";
  return "upcoming";
}
