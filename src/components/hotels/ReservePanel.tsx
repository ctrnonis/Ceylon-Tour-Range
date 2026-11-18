"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import Money from "@/components/ui/Money";
import Rating from "@/components/ui/Rating";
import { useToday } from "@/hooks/useToday";
import { priceStay } from "@/lib/data/hotels";
import { addDays, nightsBetween } from "@/lib/format";
import type { Hotel } from "@/lib/types";

/**
 * Sticky reservation card on a hotel page. The selected room comes from
 * the `?room=` query (set by each room's Select button), so a chosen room
 * survives refresh and can be shared.
 */
export default function ReservePanel({ hotel }: { hotel: Hotel }) {
  const router = useRouter();
  const today = useToday();
  const params = useSearchParams();
  const room = hotel.rooms.find((r) => r.id === params.get("room")) ?? hotel.rooms[0]!;

  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [guests, setGuests] = useState(Math.min(2, room.sleeps));

  // Defaults are derived from today on the client (see useToday).
  const effectiveIn = checkIn ?? (today ? addDays(today, 14) : "");
  const effectiveOut = checkOut ?? (effectiveIn ? addDays(effectiveIn, 3) : "");
  const nights = effectiveIn && effectiveOut ? nightsBetween(effectiveIn, effectiveOut) : 0;
  const price = priceStay(room.priceUsdPerNight, nights);
  const error = effectiveIn && nights === 0 ? "Check-out must be after check-in." : undefined;

  function reserve() {
    const query = new URLSearchParams({ room: room.id, in: effectiveIn, out: effectiveOut, guests: String(guests) });
    router.push(`/hotels/${hotel.slug}/book?${query}`);
  }

  return (
    <aside id="reserve" className="panel scroll-mt-24 lg:sticky lg:top-24">
      <div className="mb-4 flex items-center justify-between">
        <span className="price text-2xl">
          <Money usd={room.priceUsdPerNight} /> <small>/ night</small>
        </span>
        <Rating value={hotel.rating} compact />
      </div>
      <p className="mb-4 text-sm">
        <strong>{room.name}</strong> <span className="text-ink-400">· sleeps {room.sleeps}</span>
      </p>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Check-in">
          {(props) => <Input {...props} type="date" min={today ?? undefined} value={effectiveIn} onChange={(e) => setCheckIn(e.target.value)} />}
        </Field>
        <Field label="Check-out">
          {(props) => <Input {...props} type="date" min={effectiveIn || undefined} value={effectiveOut} onChange={(e) => setCheckOut(e.target.value)} />}
        </Field>
      </div>
      <Field label="Guests" className="mt-3">
        {(props) => (
          <Select {...props} value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {Array.from({ length: room.sleeps }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </Select>
        )}
      </Field>
      {error ? <p className="field-error mt-2">{error}</p> : null}

      <div className="divider" />
      <dl className="flex flex-col gap-1.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-400">
            <Money usd={room.priceUsdPerNight} /> × {nights} {nights === 1 ? "night" : "nights"}
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

      <Button variant="accent" size="lg" block className="mt-5" onClick={reserve} disabled={!nights}>
        Reserve now
      </Button>
      <p className="mt-2 text-center text-sm text-ink-400">You won&apos;t be charged yet</p>
    </aside>
  );
}
