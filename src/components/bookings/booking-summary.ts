import { getHotel } from "@/lib/data/hotels";
import { getLocation } from "@/lib/data/locations";
import { getVehicle } from "@/lib/data/taxi";
import { formatDate, nightsBetween } from "@/lib/format";
import type { PhotoKey } from "@/lib/images";
import type { Booking } from "@/lib/types";

export interface BookingSummary {
  title: string;
  subtitle: string;
  when: string;
  /** Sort key (ISO date). */
  start: string;
  amountUsd: number;
  photo?: PhotoKey;
  href: string;
}

/** Display fields for a hotel or taxi booking, used by every bookings list. */
export function summariseBooking(booking: Booking): BookingSummary {
  if (booking.type === "hotel") {
    const hotel = getHotel(booking.hotelSlug);
    const room = hotel?.rooms.find((r) => r.id === booking.roomId);
    const nights = nightsBetween(booking.checkIn, booking.checkOut);
    return {
      title: hotel?.name ?? "Hotel stay",
      subtitle: `${room?.name ?? "Room"} · ${nights} ${nights === 1 ? "night" : "nights"}`,
      when: `${formatDate(booking.checkIn, { year: undefined })} – ${formatDate(booking.checkOut)}`,
      start: booking.checkIn,
      amountUsd: booking.totalUsd,
      photo: hotel?.photo,
      href: `/hotels/${booking.hotelSlug}`,
    };
  }

  return {
    title: `${getLocation(booking.pickup).name.split(" (")[0]} → ${getLocation(booking.dropoff).name}`,
    subtitle: `${getVehicle(booking.vehicle).name} · ${booking.driver ? booking.driver.name : "driver assigned 24 h before"} · ${booking.distanceKm} km`,
    when: `${formatDate(booking.date)}, ${booking.time}`,
    start: booking.date,
    amountUsd: booking.fareUsd,
    href: `/taxi?from=${booking.pickup}&to=${booking.dropoff}`,
  };
}
