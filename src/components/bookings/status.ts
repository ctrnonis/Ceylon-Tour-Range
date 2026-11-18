import type { BadgeTone } from "@/components/ui/Badge";
import type { BookingStatus } from "@/lib/types";

/** Label and colour for each booking status, shared by every bookings table. */
export const bookingStatusBadge: Record<BookingStatus, { label: string; tone: BadgeTone }> = {
  confirmed: { label: "Confirmed", tone: "green" },
  "payment-due": { label: "Payment due", tone: "amber" },
  scheduled: { label: "Scheduled", tone: "teal" },
  completed: { label: "Completed", tone: "teal" },
  cancelled: { label: "Cancelled", tone: "red" },
};
