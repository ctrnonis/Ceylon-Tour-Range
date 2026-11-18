"use client";

import { bookingStore } from "./booking-store";
import { submissionStore } from "./submission-store";
import { tripStore } from "./trip-store";

/** Restores the sample trips, bookings and guide submissions ("Reset demo data"). */
export function resetDemoData() {
  tripStore.reset();
  bookingStore.reset();
  submissionStore.reset();
}
