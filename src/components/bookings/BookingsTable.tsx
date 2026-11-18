"use client";

import Link from "next/link";
import { CarFront } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Button, buttonClass } from "@/components/ui/Button";
import Money from "@/components/ui/Money";
import Photo from "@/components/ui/Photo";
import { notify } from "@/components/ui/Toaster";
import { photos } from "@/lib/images";
import { setBookingStatus } from "@/lib/store/booking-store";
import type { Booking } from "@/lib/types";
import { summariseBooking } from "./booking-summary";
import { bookingStatusBadge } from "./status";

/** Bookings table with per-row actions (view, pay, cancel). */
export default function BookingsTable({ bookings, actions = true }: { bookings: Booking[]; actions?: boolean }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th colSpan={2}>Booking</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            {actions ? <th aria-label="Actions" /> : null}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const summary = summariseBooking(booking);
            const status = bookingStatusBadge[booking.status];
            const active = booking.status !== "cancelled" && booking.status !== "completed";
            return (
              <tr key={booking.id}>
                <td className="w-16">
                  <div className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-ocean-100 text-ocean-700">
                    {summary.photo ? <Photo src={photos[summary.photo]} alt="" sizes="48px" /> : <CarFront className="h-5 w-5" aria-hidden />}
                  </div>
                </td>
                <td className="min-w-[220px]">
                  <strong>{summary.title}</strong>
                  <div className="text-sm text-ink-400">{summary.subtitle}</div>
                </td>
                <td className="whitespace-nowrap">{summary.when}</td>
                <td>
                  <strong>
                    <Money usd={summary.amountUsd} />
                  </strong>
                </td>
                <td>
                  <Badge tone={status.tone}>{status.label}</Badge>
                </td>
                {actions ? (
                  <td>
                    <div className="flex justify-end gap-2">
                      {booking.status === "payment-due" ? (
                        <Button
                          size="sm"
                          onClick={() => {
                            setBookingStatus(booking.id, "confirmed");
                            notify("Payment recorded (demo)");
                          }}
                        >
                          Pay now
                        </Button>
                      ) : (
                        <Link href={summary.href} className={buttonClass({ variant: "ghost", size: "sm" })}>
                          {booking.type === "taxi" && active ? "Track" : "View"}
                        </Link>
                      )}
                      {active ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (window.confirm("Cancel this booking?")) {
                              setBookingStatus(booking.id, "cancelled");
                              notify("Booking cancelled");
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      ) : null}
                    </div>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
