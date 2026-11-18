"use client";

import { useState, type FormEvent } from "react";
import { Copy, Mail } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import { Field, Input } from "@/components/ui/Field";
import { notify } from "@/components/ui/Toaster";
import { shareItinerary } from "@/lib/store/trip-store";
import type { Itinerary } from "@/lib/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Invite collaborators by email or copy a view link. */
export default function ShareDialog({ trip, open, onClose }: { trip: Itinerary; open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();

  function invite(event: FormEvent) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    shareItinerary(trip.id, email.trim().toLowerCase());
    setEmail("");
    setError(undefined);
    notify(`${email} can now edit this trip`);
  }

  async function copyLink() {
    const url = `${window.location.origin}/plan?trip=${trip.id}`;
    try {
      await navigator.clipboard.writeText(url);
      notify("Link copied");
    } catch {
      notify("Couldn't copy. Select the link and copy it manually.");
    }
  }

  return (
    <Dialog open={open} onClose={onClose} title={`Share "${trip.name}"`}>
      <form onSubmit={invite} className="flex items-end gap-2">
        <Field label="Invite by email" error={error} className="flex-1">
          {(props) => (
            <Input
              {...props}
              type="email"
              placeholder="friend@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </Field>
        <Button type="submit" className="mb-[1px]">
          <Mail aria-hidden /> Invite
        </Button>
      </form>

      {trip.sharedWith.length ? (
        <ul className="mt-5 flex flex-col gap-2">
          {trip.sharedWith.map((person) => (
            <li key={person} className="flex items-center gap-3 text-sm">
              <Avatar name={person} size={32} />
              <span className="flex-1">{person}</span>
              <span className="text-ink-400">Can edit</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="divider" />
      <Button variant="ghost" block onClick={copyLink}>
        <Copy aria-hidden /> Copy view link
      </Button>
      <p className="mt-3 text-xs text-ink-400">
        Shared links and live collaboration switch on with user accounts in the backend phase. Until then, trips are
        saved in this browser.
      </p>
    </Dialog>
  );
}
