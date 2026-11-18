"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ChevronDown, ChevronUp, GripVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { removeStop, updateStop } from "@/lib/store/trip-store";
import { cn } from "@/lib/cn";
import type { ItineraryStop } from "@/lib/types";
import { setDragPayload } from "./dnd";
import { stopKinds } from "./stop-kinds";

/**
 * One stop in a day's timeline. Draggable (mouse) with up/down buttons
 * as the keyboard-accessible alternative, plus inline editing.
 */
export default function StopItem({
  stop,
  tripId,
  dayId,
  index,
  isFirst,
  isLast,
  onMove,
  dropIndicator,
}: {
  stop: ItineraryStop;
  tripId: string;
  dayId: string;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onMove: (stopId: string, toIndex: number) => void;
  /** Highlights the drop position while dragging over this stop. */
  dropIndicator: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(stop.title);
  const [time, setTime] = useState(stop.time ?? "");
  const [note, setNote] = useState(stop.note ?? "");
  const { Icon, label } = stopKinds[stop.kind];

  function save(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    updateStop(tripId, dayId, stop.id, { title: title.trim(), time: time || undefined, note: note.trim() || undefined });
    setEditing(false);
  }

  return (
    <li
      className={cn("timeline-item pb-3", index % 2 === 1 && "timeline-item-amber")}
      draggable={!editing}
      onDragStart={(event) => setDragPayload(event, { type: "stop", dayId, stopId: stop.id })}
      data-index={index}
    >
      {dropIndicator ? <div className="mb-2 h-1 rounded-full bg-sun-500" aria-hidden /> : null}
      <div className="row-item group items-start !py-3">
        <span className="mt-1 hidden cursor-grab text-ink-400 sm:block" aria-hidden>
          <GripVertical className="h-4 w-4" />
        </span>

        {editing ? (
          <form onSubmit={save} className="flex flex-1 flex-col gap-2">
            <div className="flex gap-2">
              <Input aria-label="Time" type="time" className="input-sm w-32" value={time} onChange={(e) => setTime(e.target.value)} />
              <Input aria-label="Title" className="input-sm" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
            </div>
            <Input aria-label="Note" className="input-sm" placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
            <div className="flex gap-2">
              <Button type="submit" size="sm">
                Save
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-2">
                <Icon className="mt-1 h-4 w-4 shrink-0 text-ocean-500" aria-label={label} />
                <strong>
                  {stop.time ? `${stop.time} · ` : ""}
                  {stop.title}
                </strong>
              </div>
              {stop.note ? <p className="mt-0.5 text-sm text-ink-400">{stop.note}</p> : null}
              <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                {stop.attractionSlug ? (
                  <Link href={`/attractions/${stop.attractionSlug}`} className="text-sm font-semibold text-ocean-700 hover:underline">
                    View place →
                  </Link>
                ) : (
                  <span />
                )}
                <div className="-mr-2 flex items-center gap-0.5 text-ink-400">
                  <IconButton label="Move up" disabled={isFirst} onClick={() => onMove(stop.id, index - 1)}>
                    <ChevronUp />
                  </IconButton>
                  <IconButton label="Move down" disabled={isLast} onClick={() => onMove(stop.id, index + 1)}>
                    <ChevronDown />
                  </IconButton>
                  <IconButton label="Edit stop" onClick={() => setEditing(true)}>
                    <Pencil />
                  </IconButton>
                  <IconButton label="Remove stop" onClick={() => removeStop(tripId, dayId, stop.id)}>
                    <Trash2 />
                  </IconButton>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </li>
  );
}

function IconButton({ label, children, ...props }: { label: string; children: React.ReactNode; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="rounded-full p-1.5 hover:bg-ocean-100 hover:text-ocean-700 disabled:opacity-30 disabled:hover:bg-transparent [&_svg]:h-4 [&_svg]:w-4"
      {...props}
    >
      {children}
    </button>
  );
}
