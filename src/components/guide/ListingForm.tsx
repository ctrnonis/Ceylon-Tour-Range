"use client";

import { useState, type FormEvent } from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { notify } from "@/components/ui/Toaster";
import { attractionCategories } from "@/lib/data/attractions";
import { districts } from "@/lib/data/locations";
import { currentGuide } from "@/lib/data/guides";
import { submitListing } from "@/lib/store/submission-store";
import type { Submission } from "@/lib/types";

const MAX_PHOTOS = 10;

/**
 * Submit a new place, hotel or event for admin review. Photos are only
 * counted for now; uploads go to storage in the backend phase.
 */
export default function ListingForm({ kind = "place" }: { kind?: Submission["kind"] }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(kind === "place" ? "Hiking" : kind === "hotel" ? "Hotel" : "Event");
  const [district, setDistrict] = useState("Badulla");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  const noun = kind === "place" ? "place" : kind;

  function submit(event: FormEvent) {
    event.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 3) next.name = `Give the ${noun} a name.`;
    if (description.trim().length < 30) next.description = "Describe it in at least 30 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;

    submitListing({ name: name.trim(), kind, category, district, submittedBy: currentGuide.id, photos: photos.length });
    notify(`"${name.trim()}" sent for review`);
    setName("");
    setDescription("");
    setPhotos([]);
  }

  return (
    <form id="add-place" onSubmit={submit} noValidate className="panel flex scroll-mt-28 flex-col gap-4">
      <h3>Add a new {noun}</h3>
      <Field label={`${noun[0]!.toUpperCase()}${noun.slice(1)} name`} error={errors.name}>
        {(p) => (
          <Input
            {...p}
            placeholder="e.g. Diyaluma Falls upper pools"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Category">
          {(p) => (
            <Select {...p} value={category} onChange={(e) => setCategory(e.target.value)} disabled={kind !== "place"}>
              {kind === "place" ? (
                [...Object.values(attractionCategories), "Adventure"].map((c) => <option key={c}>{c}</option>)
              ) : (
                <option>{category}</option>
              )}
            </Select>
          )}
        </Field>
        <Field label="District">
          {(p) => (
            <Select {...p} value={district} onChange={(e) => setDistrict(e.target.value)}>
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </Select>
          )}
        </Field>
      </div>
      <Field label="Description" error={errors.description}>
        {(p) => (
          <Textarea
            {...p}
            rows={3}
            placeholder="What makes this special? Best time to visit, access, tips."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
      </Field>
      <div className="field">
        <span className="field-label">Photos</span>
        <label className="flex cursor-pointer flex-col items-center gap-1 rounded-[var(--radius-md)] border-2 border-dashed border-ocean-700/20 p-5 text-center text-sm text-ink-400 hover:border-ocean-500">
          <ImagePlus className="h-6 w-6 text-ocean-500" aria-hidden />
          {photos.length ? (
            `${photos.length} photo${photos.length === 1 ? "" : "s"} selected`
          ) : (
            <>
              Drop images or <strong className="text-ocean-700">browse</strong>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => setPhotos(Array.from(e.target.files ?? []).slice(0, MAX_PHOTOS))}
          />
        </label>
      </div>
      <Button type="submit" block>
        Submit for review
      </Button>
      <p className="text-center text-sm text-ink-400">Admin review usually takes 24–48 h</p>
    </form>
  );
}
