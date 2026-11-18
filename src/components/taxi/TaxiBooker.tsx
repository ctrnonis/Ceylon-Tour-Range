"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ArrowUpDown, Bus, CarFront, CarTaxiFront, Navigation, Truck } from "lucide-react";
import IslandMap from "@/components/map/IslandMap";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import Money from "@/components/ui/Money";
import Rating from "@/components/ui/Rating";
import { notify } from "@/components/ui/Toaster";
import { useToday } from "@/hooks/useToday";
import { createTaxiBooking } from "@/lib/store/booking-store";
import { getLocation, locations } from "@/lib/data/locations";
import { assignDriver, estimateFares, vehicles } from "@/lib/data/taxi";
import { addDays, formatDuration } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { LocationId, TaxiBooking, VehicleId } from "@/lib/types";
import { useRideTracking, type RidePhase } from "./useRideTracking";

const vehicleIcons: Record<VehicleId, typeof CarFront> = {
  "tuk-tuk": CarTaxiFront,
  sedan: CarFront,
  suv: Truck,
  van: Bus,
};

const phaseLabels: Record<RidePhase, { text: string; tone: "teal" | "green" | "amber" }> = {
  assigned: { text: "Driver assigned", tone: "teal" },
  "en-route": { text: "Driver en route", tone: "green" },
  arriving: { text: "Arriving now", tone: "amber" },
  arrived: { text: "Driver has arrived", tone: "green" },
};

/** Ride booking form, fare estimates and simulated live tracking. */
export default function TaxiBooker({
  initialPickup,
  initialDropoff,
}: {
  initialPickup: LocationId;
  initialDropoff: LocationId;
}) {
  const today = useToday();
  const [pickup, setPickup] = useState<LocationId>(initialPickup);
  const [dropoff, setDropoff] = useState<LocationId>(initialDropoff);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState("09:00");
  const [vehicle, setVehicle] = useState<VehicleId>("sedan");
  const [ride, setRide] = useState<TaxiBooking | null>(null);

  const fares = useMemo(() => estimateFares(pickup, dropoff), [pickup, dropoff]);
  const selected =
    fares.find((fare) => fare.vehicle === vehicle && fare.available) ?? fares.find((fare) => fare.available)!;
  const effectiveDate = date ?? (today ? addDays(today, 1) : "");
  const samePlace = pickup === dropoff;

  const pickupLocation = getLocation(ride?.pickup ?? pickup);
  const dropoffLocation = getLocation(ride?.dropoff ?? dropoff);
  const tracking = useRideTracking(ride ? pickupLocation : null);

  function swap() {
    setPickup(dropoff);
    setDropoff(pickup);
  }

  function confirm(event: FormEvent) {
    event.preventDefault();
    if (samePlace) return;
    const booking = createTaxiBooking({
      type: "taxi",
      pickup,
      dropoff,
      date: effectiveDate,
      time,
      vehicle: selected.vehicle,
      distanceKm: selected.distanceKm,
      fareUsd: selected.fareUsd,
      status: "confirmed",
      driver: assignDriver(selected.vehicle),
    });
    setRide(booking);
    notify("Ride booked. Your driver is on the way.");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      <form className="panel flex flex-col gap-4 self-start" onSubmit={confirm}>
        <div>
          <h2>Book a ride</h2>
          <p className="text-sm text-ink-400">Fixed fares · Licensed drivers · Live tracking</p>
        </div>

        <div className="relative flex flex-col gap-4">
          <Field label="Pickup">
            {(props) => (
              <Select {...props} value={pickup} onChange={(event) => setPickup(event.target.value as LocationId)}>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </Select>
            )}
          </Field>
          <Field label="Drop-off" error={samePlace ? "Choose a different drop-off." : undefined}>
            {(props) => (
              <Select {...props} value={dropoff} onChange={(event) => setDropoff(event.target.value as LocationId)}>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </Select>
            )}
          </Field>
          <button
            type="button"
            onClick={swap}
            className="absolute top-[42%] right-3 grid h-8 w-8 place-items-center rounded-full border border-ocean-700/20 bg-white text-ocean-700 shadow-sm hover:bg-ocean-100"
            aria-label="Swap pickup and drop-off"
          >
            <ArrowUpDown className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Date">
            {(props) => (
              <Input
                {...props}
                type="date"
                min={today ?? undefined}
                value={effectiveDate}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            )}
          </Field>
          <Field label="Time">
            {(props) => (
              <Input {...props} type="time" value={time} onChange={(event) => setTime(event.target.value)} required />
            )}
          </Field>
        </div>

        <fieldset>
          <legend className="field-label mb-2">Vehicle</legend>
          <div className="flex flex-col gap-2.5">
            {fares.map((fare) => {
              const info = vehicles.find((v) => v.id === fare.vehicle)!;
              const Icon = vehicleIcons[fare.vehicle];
              const checked = selected.vehicle === fare.vehicle;
              return (
                <label
                  key={fare.vehicle}
                  className={cn(
                    "row-item cursor-pointer !py-3 ring-2 ring-transparent transition",
                    checked && "ring-ocean-500",
                    !fare.available && "cursor-not-allowed opacity-50",
                  )}
                >
                  <input
                    type="radio"
                    name="vehicle"
                    className="sr-only"
                    value={fare.vehicle}
                    checked={checked}
                    disabled={!fare.available}
                    onChange={() => setVehicle(fare.vehicle)}
                  />
                  <span className="icon-tile">
                    <Icon aria-hidden />
                  </span>
                  <span className="flex-1">
                    <strong>{info.name}</strong>
                    <span className="block text-sm text-ink-400">
                      {info.passengers} passengers · {info.bags} bags · {info.features.join(" · ")}
                    </span>
                  </span>
                  <span className={cn("price", !fare.available && "text-sm !text-ink-400")}>
                    {fare.available ? <Money usd={fare.fareUsd} /> : `Up to ${info.maxKm} km`}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="rounded-[var(--radius-md)] bg-sand-100 p-4 text-sm">
          <div className="flex justify-between">
            <span>Estimated fare</span>
            <strong>
              <Money usd={selected.fareUsd} />
            </strong>
          </div>
          <div className="mt-1 flex justify-between text-ink-400">
            <span>Distance · Duration</span>
            <span>
              {selected.distanceKm} km · ~{formatDuration(selected.durationMin)}
            </span>
          </div>
        </div>

        <Button type="submit" variant="accent" size="lg" block disabled={samePlace}>
          Confirm booking
        </Button>
        <p className="text-center text-sm text-ink-400">Pay by card or cash after the ride</p>
      </form>

      <IslandMap
        className="h-[480px] lg:h-[640px]"
        markers={[
          { id: "pickup", coordinates: pickupLocation, label: pickupLocation.name, tone: "teal" },
          { id: "dropoff", coordinates: dropoffLocation, label: dropoffLocation.name },
        ]}
        route={[pickupLocation, dropoffLocation]}
        vehicle={tracking ? { coordinates: tracking.position, icon: <Navigation aria-hidden /> } : undefined}
        showLabels
      >
        <div className="absolute inset-x-4 bottom-4 z-10 flex flex-col gap-3">
          {ride?.driver && tracking ? (
            <div className="panel !p-4" aria-live="polite">
              <div className="flex items-center gap-3">
                <Avatar name={ride.driver.name} />
                <div className="flex-1">
                  <strong>{ride.driver.name}</strong>
                  <div className="text-sm text-ink-400">
                    {ride.driver.car} · {ride.driver.plate}
                  </div>
                </div>
                <Rating value={ride.driver.rating} compact />
              </div>
              <div className="divider !my-3" />
              <div className="flex items-center justify-between text-sm">
                <Badge tone={phaseLabels[tracking.phase].tone}>{phaseLabels[tracking.phase].text}</Badge>
                <strong>{tracking.phase === "arrived" ? "At pickup" : `Arrives in ${tracking.minutesAway} min`}</strong>
              </div>
            </div>
          ) : null}
          <div className="panel flex items-center justify-between gap-3 !p-3 text-sm">
            <span>
              <strong>{pickupLocation.name}</strong> → {dropoffLocation.name}
            </span>
            <span className="text-ink-400">{ride ? "Live tracking active" : "Preview"}</span>
          </div>
        </div>
      </IslandMap>
    </div>
  );
}
