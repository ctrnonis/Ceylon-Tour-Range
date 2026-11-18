"use client";

import { useState } from "react";
import { FileDown, Plus, Save, Share2, Trash2 } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Field";
import { notify } from "@/components/ui/Toaster";
import { getLocation } from "@/lib/data/locations";
import { addDays, formatDate } from "@/lib/format";
import { createBlankItinerary, deleteItinerary, setActiveItinerary, updateItinerary } from "@/lib/store/trip-store";
import { useSession } from "@/lib/store/session-store";
import type { Itinerary } from "@/lib/types";
import ShareDialog from "./ShareDialog";

/** Trip switcher, editable name/dates and the Share / Export / Save actions. */
export default function PlannerHeader({
  trip,
  trips,
  today,
}: {
  trip: Itinerary;
  trips: Itinerary[];
  today: string | null;
}) {
  const session = useSession();
  const [sharing, setSharing] = useState(false);

  const towns = trip.days
    .map((day) => getLocation(day.location).name.split(" (")[0])
    .filter((town, index, all) => town !== all[index - 1]);

  function save() {
    notify(session ? "Trip saved" : "Saved in this browser. Log in to keep it on your account.");
  }

  function remove() {
    if (window.confirm(`Delete "${trip.name}"? This can't be undone.`)) deleteItinerary(trip.id);
  }

  return (
    <div className="flex flex-col gap-5 print:hidden">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-ink-600">
          My trips
          <Select className="input-sm !w-auto" value={trip.id} onChange={(e) => setActiveItinerary(e.target.value)}>
            {trips.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Select>
        </label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => createBlankItinerary(today ? addDays(today, 30) : trip.startDate)}
        >
          <Plus aria-hidden /> New trip
        </Button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <label className="sr-only" htmlFor="trip-name">
            Trip name
          </label>
          <input
            id="trip-name"
            className="w-full rounded-lg bg-transparent font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold text-ocean-900 outline-none hover:bg-white/60 focus:bg-white"
            value={trip.name}
            onChange={(e) => updateItinerary(trip.id, { name: e.target.value })}
          />
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-400">
            <label className="flex items-center gap-2">
              <span className="sr-only">Start date</span>
              <Input
                type="date"
                className="input-sm !w-auto"
                value={trip.startDate}
                onChange={(e) => e.target.value && updateItinerary(trip.id, { startDate: e.target.value })}
              />
            </label>
            <span>
              to {formatDate(addDays(trip.startDate, trip.days.length - 1))} · {trip.days.length} days
            </span>
            <label className="flex items-center gap-1.5">
              <Input
                type="number"
                min={1}
                max={20}
                className="input-sm !w-16"
                value={trip.travellers}
                onChange={(e) => updateItinerary(trip.id, { travellers: Math.max(1, Number(e.target.value) || 1) })}
                aria-label="Travellers"
              />
              travellers
            </label>
            <span className="hidden md:inline">· {towns.join(" → ")}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="mr-2 flex -space-x-2" aria-label="People on this trip">
            <Avatar name={session?.name ?? "You"} size={34} className="ring-2 ring-sand-50" />
            {trip.sharedWith.slice(0, 2).map((email) => (
              <Avatar key={email} name={email} size={34} className="ring-2 ring-sand-50" />
            ))}
            {trip.sharedWith.length > 2 ? (
              <span className="avatar !h-[34px] !w-[34px] text-xs ring-2 ring-sand-50">
                +{trip.sharedWith.length - 2}
              </span>
            ) : null}
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSharing(true)}>
            <Share2 aria-hidden /> Share
          </Button>
          <Button variant="ghost" size="sm" onClick={() => window.print()}>
            <FileDown aria-hidden /> Export PDF
          </Button>
          <Button size="sm" onClick={save}>
            <Save aria-hidden /> Save
          </Button>
          {trips.length > 1 ? (
            <button
              type="button"
              onClick={remove}
              className="rounded-full p-2 text-ink-400 hover:bg-red-50 hover:text-danger"
              aria-label="Delete trip"
              title="Delete trip"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <ShareDialog trip={trip} open={sharing} onClose={() => setSharing(false)} />
    </div>
  );
}
