"use client";

import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Field";
import { addStop } from "@/lib/store/trip-store";
import type { StopKind } from "@/lib/types";
import { stopKinds } from "./stop-kinds";

/** "+ Add a stop" for things that aren't listed attractions (meals, transfers, notes). */
export default function AddStopForm({ tripId, dayId }: { tripId: string; dayId: string }) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<StopKind>("custom");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    addStop(tripId, dayId, { kind, title: title.trim(), time: time || undefined });
    setTitle("");
    setTime("");
    setOpen(false);
  }

  if (!open) {
    return (
      <Button variant="ghost" block className="mt-2" onClick={() => setOpen(true)}>
        <Plus aria-hidden /> Add a stop
      </Button>
    );
  }

  return (
    <form onSubmit={submit} className="mt-2 flex flex-col gap-2 rounded-[var(--radius-md)] bg-sand-100 p-3">
      <div className="flex gap-2">
        <Select aria-label="Stop type" className="input-sm w-36" value={kind} onChange={(e) => setKind(e.target.value as StopKind)}>
          {(Object.keys(stopKinds) as StopKind[])
            .filter((k) => k !== "attraction")
            .map((k) => (
              <option key={k} value={k}>
                {stopKinds[k].label}
              </option>
            ))}
        </Select>
        <Input aria-label="Time" type="time" className="input-sm w-32" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <Input aria-label="Stop title" className="input-sm" placeholder="e.g. Lunch at Café Chill" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={!title.trim()}>
          Add stop
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
