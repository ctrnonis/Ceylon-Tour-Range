"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Route } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { createItineraryFromTrail } from "@/lib/store/trip-store";
import { addDays } from "@/lib/format";
import type { Trail } from "@/lib/types";

/** Banner shown on /plan?trail=… asking when to start before building the trip from the trail. */
export default function StartFromTrail({ trail, today }: { trail: Trail; today: string | null }) {
  const router = useRouter();
  const [start, setStart] = useState<string | null>(null);
  const startDate = start ?? (today ? addDays(today, 30) : "");

  function create() {
    if (!startDate) return;
    createItineraryFromTrail(trail, startDate);
    router.replace("/plan");
  }

  return (
    <div className="photo-banner mb-8 bg-ocean-900 print:hidden">
      <div className="photo-banner-body flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow !text-sun-500">Start from a trail</span>
          <h2 className="!text-2xl">{trail.name}</h2>
          <p className="text-sm text-white/80">
            {trail.days.length} days, pre-filled with the trail&apos;s route and highlights. Rearrange anything
            afterwards.
          </p>
        </div>
        <div className="flex items-end gap-3">
          <label className="flex flex-col gap-1 text-sm font-bold">
            First day
            <Input
              type="date"
              min={today ?? undefined}
              value={startDate}
              onChange={(e) => setStart(e.target.value)}
              className="input-sm"
            />
          </label>
          <Button variant="accent" onClick={create} disabled={!startDate}>
            <Route aria-hidden /> Build my trip
          </Button>
        </div>
      </div>
    </div>
  );
}
