"use client";

import Badge from "@/components/ui/Badge";
import Money from "@/components/ui/Money";
import { bookingStatusBadge } from "@/components/bookings/status";
import { useBookings } from "@/lib/store/booking-store";
import { getLocation } from "@/lib/data/locations";
import { getVehicle } from "@/lib/data/taxi";
import { formatDate } from "@/lib/format";
import type { TaxiBooking } from "@/lib/types";

/** Recent rides table under the taxi booker. */
export default function RideHistory() {
  const rides = useBookings().filter((booking): booking is TaxiBooking => booking.type === "taxi");
  if (rides.length === 0) return null;

  return (
    <section className="mt-12">
      <h3 className="mb-4">Recent rides</h3>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Date</th>
              <th>Vehicle</th>
              <th>Fare</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => {
              const status = bookingStatusBadge[ride.status];
              return (
                <tr key={ride.id}>
                  <td>
                    {getLocation(ride.pickup).name} → {getLocation(ride.dropoff).name}
                  </td>
                  <td>
                    {formatDate(ride.date)}, {ride.time}
                  </td>
                  <td>{getVehicle(ride.vehicle).name}</td>
                  <td>
                    <Money usd={ride.fareUsd} />
                  </td>
                  <td>
                    <Badge tone={status.tone}>{status.label}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
