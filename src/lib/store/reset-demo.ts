"use client";

import { bookingStore } from "./booking-store";
import { tripStore } from "./trip-store";

/** Restores the sample trips and bookings (dashboard "Reset demo data"). */
export function resetDemoData() {
  tripStore.reset();
  bookingStore.reset();
}
