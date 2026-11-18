"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, CreditCard, Lock, Wallet, Building2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Checkbox, Field, Input, Textarea } from "@/components/ui/Field";
import Money from "@/components/ui/Money";
import Panel from "@/components/ui/Panel";
import Photo from "@/components/ui/Photo";
import Rating from "@/components/ui/Rating";
import Steps from "@/components/ui/Steps";
import Tabs from "@/components/ui/Tabs";
import { notify } from "@/components/ui/Toaster";
import { createHotelBooking, setBookingStatus } from "@/lib/store/booking-store";
import { useSession } from "@/lib/store/session-store";
import { priceStay } from "@/lib/data/hotels";
import { formatDate, nightsBetween } from "@/lib/format";
import { photos } from "@/lib/images";
import type { GuestDetails, Hotel, HotelBooking, Room } from "@/lib/types";

type PaymentMethod = HotelBooking["paymentMethod"];
type Errors = Partial<Record<keyof GuestDetails | "terms", string>>;

const STEPS = ["Room", "Guest details", "Payment", "Confirmation"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Hotel checkout: guest details → payment → confirmation.
 *
 * No payment is taken: card fields are display-only and never stored.
 * The payment provider (e.g. Stripe or PayHere) replaces them in the
 * backend phase.
 */
export default function HotelCheckout({
  hotel,
  room,
  checkIn,
  checkOut,
  guests,
}: {
  hotel: Hotel;
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
}) {
  const session = useSession();
  const [step, setStep] = useState(1);
  const [guest, setGuest] = useState<GuestDetails>({ firstName: "", lastName: "", email: "", phone: "", requests: "" });
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [booking, setBooking] = useState<HotelBooking | null>(null);

  const nights = nightsBetween(checkIn, checkOut);
  const price = priceStay(room.priceUsdPerNight, nights);

  // Prefill from the signed-in account without overwriting what was typed.
  const [firstName = "", ...rest] = session?.name.split(" ") ?? [];
  const value = (key: keyof GuestDetails) =>
    guest[key] ||
    (key === "firstName"
      ? firstName
      : key === "lastName"
        ? rest.join(" ")
        : key === "email"
          ? (session?.email ?? "")
          : "");
  const update = (key: keyof GuestDetails) => (event: { target: { value: string } }) =>
    setGuest((current) => ({ ...current, [key]: event.target.value }));

  function submitDetails(event: FormEvent) {
    event.preventDefault();
    const next: Errors = {};
    if (!value("firstName").trim()) next.firstName = "Enter a first name.";
    if (!value("lastName").trim()) next.lastName = "Enter a last name.";
    if (!EMAIL_PATTERN.test(value("email"))) next.email = "Enter a valid email address.";
    if (value("phone").replace(/\D/g, "").length < 9) next.phone = "Enter a phone number with country code.";
    setErrors(next);
    if (Object.keys(next).length === 0) setStep(2);
  }

  function submitPayment(event: FormEvent) {
    event.preventDefault();
    if (!agreed) {
      setErrors({ terms: "Please accept the terms to continue." });
      return;
    }
    const created = createHotelBooking({
      type: "hotel",
      hotelSlug: hotel.slug,
      roomId: room.id,
      checkIn,
      checkOut,
      guests,
      totalUsd: price.total,
      status: method === "pay-at-hotel" ? "payment-due" : "confirmed",
      guest: {
        firstName: value("firstName"),
        lastName: value("lastName"),
        email: value("email"),
        phone: value("phone"),
        requests: guest.requests,
      },
      paymentMethod: method,
    });
    setBooking(created);
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancel() {
    if (!booking) return;
    setBookingStatus(booking.id, "cancelled");
    setBooking({ ...booking, status: "cancelled" });
    notify("Booking cancelled");
  }

  return (
    <>
      <Steps steps={STEPS} current={step} />

      <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-6">
          {step === 1 ? (
            <form className="panel flex flex-col gap-4" onSubmit={submitDetails} noValidate>
              <h3>Guest details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" error={errors.firstName}>
                  {(p) => (
                    <Input {...p} autoComplete="given-name" value={value("firstName")} onChange={update("firstName")} />
                  )}
                </Field>
                <Field label="Last name" error={errors.lastName}>
                  {(p) => (
                    <Input {...p} autoComplete="family-name" value={value("lastName")} onChange={update("lastName")} />
                  )}
                </Field>
                <Field label="Email" error={errors.email}>
                  {(p) => (
                    <Input {...p} type="email" autoComplete="email" value={value("email")} onChange={update("email")} />
                  )}
                </Field>
                <Field label="Phone" error={errors.phone}>
                  {(p) => (
                    <Input
                      {...p}
                      type="tel"
                      autoComplete="tel"
                      placeholder="+94 77 123 4567"
                      value={value("phone")}
                      onChange={update("phone")}
                    />
                  )}
                </Field>
              </div>
              <Field label="Special requests (optional)">
                {(p) => (
                  <Textarea
                    {...p}
                    rows={3}
                    placeholder="Early check-in, honeymoon set-up…"
                    value={guest.requests}
                    onChange={update("requests")}
                  />
                )}
              </Field>
              <div className="flex justify-between gap-3">
                <ButtonLink href={`/hotels/${hotel.slug}?room=${room.id}`} variant="ghost">
                  Back
                </ButtonLink>
                <Button type="submit">Continue to payment</Button>
              </div>
            </form>
          ) : null}

          {step === 2 ? (
            <form className="panel flex flex-col gap-4" onSubmit={submitPayment} noValidate>
              <h3>Payment</h3>
              <Tabs
                label="Payment method"
                value={method}
                onChange={setMethod}
                options={[
                  {
                    value: "card",
                    label: (
                      <>
                        <CreditCard aria-hidden /> Card
                      </>
                    ),
                  },
                  {
                    value: "paypal",
                    label: (
                      <>
                        <Wallet aria-hidden /> PayPal
                      </>
                    ),
                  },
                  {
                    value: "pay-at-hotel",
                    label: (
                      <>
                        <Building2 aria-hidden /> Pay at hotel
                      </>
                    ),
                  },
                ]}
              />
              {method === "card" ? (
                <>
                  <p className="rounded-[var(--radius-md)] bg-sun-500/10 p-3 text-sm text-ink-600">
                    Preview only: no payment is taken and card details are not saved. Card payments will go through a
                    secure payment provider once the backend is live.
                  </p>
                  <Field label="Card number">
                    {(p) => <Input {...p} inputMode="numeric" autoComplete="off" placeholder="1234 5678 9012 3456" />}
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry">{(p) => <Input {...p} autoComplete="off" placeholder="MM / YY" />}</Field>
                    <Field label="CVC">
                      {(p) => <Input {...p} inputMode="numeric" autoComplete="off" placeholder="•••" />}
                    </Field>
                  </div>
                </>
              ) : method === "paypal" ? (
                <p className="text-sm text-ink-600">
                  You&apos;ll be redirected to PayPal to complete payment once the backend is live.
                </p>
              ) : (
                <p className="text-sm text-ink-600">
                  Your room is held now and you pay the hotel directly at check-in.
                </p>
              )}
              <Checkbox
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                label={
                  <>
                    I agree to the{" "}
                    <Link href="/legal#terms" className="underline">
                      Terms
                    </Link>{" "}
                    and the room&apos;s cancellation policy
                  </>
                }
              />
              {errors.terms ? <p className="field-error">{errors.terms}</p> : null}
              <div className="flex justify-between gap-3">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" variant="accent" size="lg">
                  <Lock aria-hidden />{" "}
                  {method === "pay-at-hotel" ? (
                    "Confirm booking"
                  ) : (
                    <>
                      Confirm &amp; pay <Money usd={price.total} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          ) : null}

          {step === 3 && booking ? (
            <Panel className="text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden />
              <h2 className="mt-3">{booking.status === "cancelled" ? "Booking cancelled" : "You're booked!"}</h2>
              <p className="mt-2 text-ink-600">
                Reference <strong>{booking.id.toUpperCase()}</strong>.{" "}
                {booking.status === "cancelled"
                  ? "No charges were made."
                  : `A confirmation has been sent to ${booking.guest.email}.`}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/dashboard?tab=bookings">View my bookings</ButtonLink>
                <ButtonLink href={`/taxi?to=${hotel.location}`} variant="ghost">
                  Book a transfer
                </ButtonLink>
                {booking.status !== "cancelled" ? (
                  <Button variant="ghost" onClick={cancel}>
                    Cancel booking
                  </Button>
                ) : null}
              </div>
            </Panel>
          ) : null}
        </div>

        <aside className="panel overflow-hidden !p-0 lg:sticky lg:top-24 lg:self-start">
          <div className="relative h-44 bg-ocean-100">
            <Photo src={photos[hotel.photo]} alt={hotel.name} sizes="380px" />
          </div>
          <div className="p-6">
            <strong>{hotel.name}</strong>
            <Rating value={hotel.rating} compact className="mt-1 flex" />
            <div className="divider" />
            <dl className="flex flex-col gap-1.5 text-sm">
              {[
                ["Room", room.name],
                ["Check-in", formatDate(checkIn, { weekday: "short" })],
                ["Check-out", formatDate(checkOut, { weekday: "short" })],
                ["Guests", String(guests)],
              ].map(([label, text]) => (
                <div key={label} className="flex justify-between gap-3">
                  <dt className="text-ink-400">{label}</dt>
                  <dd className="text-right">{text}</dd>
                </div>
              ))}
            </dl>
            <div className="divider" />
            <dl className="flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-400">
                  <Money usd={room.priceUsdPerNight} /> × {nights} nights
                </dt>
                <dd>
                  <Money usd={price.subtotal} />
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-400">Taxes &amp; fees</dt>
                <dd>
                  <Money usd={price.taxes} />
                </dd>
              </div>
              <div className="mt-2 flex justify-between text-base">
                <dt className="font-bold">Total</dt>
                <dd className="price">
                  <Money usd={price.total} />
                </dd>
              </div>
            </dl>
            {room.freeCancellationDays ? (
              <Badge tone="green" className="mt-3">
                Free cancellation up to {room.freeCancellationDays} days before
              </Badge>
            ) : null}
          </div>
        </aside>
      </div>
    </>
  );
}
