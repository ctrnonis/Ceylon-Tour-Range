"use client";

import { Plus } from "lucide-react";
import { useActiveTab } from "@/components/app-shell/AppShell";
import SectionHeader from "@/components/app-shell/SectionHeader";
import ReviewList from "@/components/reviews/ReviewList";
import { Button } from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { Field, Input, Textarea } from "@/components/ui/Field";
import Rating from "@/components/ui/Rating";
import Stat from "@/components/ui/Stat";
import { notify } from "@/components/ui/Toaster";
import { attractions } from "@/lib/data/attractions";
import { currentGuide } from "@/lib/data/guides";
import { formatCompact } from "@/lib/format";
import { useSubmissions } from "@/lib/store/submission-store";
import type { Submission } from "@/lib/types";
import ListingForm from "./ListingForm";
import SubmissionsTable from "./SubmissionsTable";

export const GUIDE_TABS = ["overview", "places", "hotels", "events", "reviews", "profile"] as const;

const kindForTab: Partial<Record<(typeof GUIDE_TABS)[number], Submission["kind"]>> = {
  places: "place",
  hotels: "hotel",
  events: "event",
};

/** Tour Guide Portal: listing stats, submissions and the add-listing form. */
export default function GuideView() {
  const tab = useActiveTab(GUIDE_TABS);
  const mine = useSubmissions().filter((s) => s.submittedBy === currentGuide.id);

  if (tab === "reviews") return <ReviewsSection />;
  if (tab === "profile") return <ProfileSection />;

  const kind = kindForTab[tab];
  const listed = kind ? mine.filter((s) => s.kind === kind) : mine;
  const live = mine.filter((s) => s.status === "live");
  const pending = mine.filter((s) => s.status === "in-review" || s.status === "edits-requested");
  const visits = live.reduce((total, s) => total + (s.visits ?? 0), 0);
  const scrollToForm = () => document.getElementById("add-place")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <SectionHeader
        title={tab === "overview" ? "Guide overview" : `My ${tab}`}
        description={
          <span className="inline-flex items-center gap-2">
            {currentGuide.name} · Verified guide since {currentGuide.verifiedSince} ·{" "}
            <Rating value={currentGuide.rating} compact />
          </span>
        }
        actions={
          <Button variant="accent" onClick={scrollToForm}>
            <Plus aria-hidden /> Add new {kind ?? "place"}
          </Button>
        }
      />

      {tab === "overview" ? (
        <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <Stat label="Listings live" value={live.length} note={`${mine.length} submitted in total`} trend="up" />
          <Stat label="Total visits" value={formatCompact(visits)} note="12% vs last month" trend="up" />
          <Stat label="Avg. rating" value={currentGuide.rating.toFixed(1)} note="across all listings" />
          <Stat
            label="Pending approval"
            value={pending.length}
            note={`${pending.filter((s) => s.status === "edits-requested").length} need edits`}
            trend={pending.some((s) => s.status === "edits-requested") ? "down" : undefined}
          />
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {listed.length ? (
          <SubmissionsTable items={listed} />
        ) : (
          <EmptyState icon={Plus} title={`No ${tab} yet`} description="Use the form to submit your first one." />
        )}
        <ListingForm key={kind ?? "place"} kind={kind ?? "place"} />
      </div>
    </>
  );
}

function ReviewsSection() {
  const mine = attractions.filter((a) => a.addedBy === currentGuide.id);
  const reviews = mine.flatMap((a) => a.reviews);
  return (
    <>
      <SectionHeader title="Reviews" description={`Guest reviews on the ${mine.length} places you've added.`} />
      <div className="max-w-3xl">
        <ReviewList reviews={reviews} subject="your listings" />
      </div>
    </>
  );
}

function ProfileSection() {
  return (
    <>
      <SectionHeader title="Guide profile" description="Shown to travellers on every place you add." />
      <form
        className="panel flex max-w-2xl flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          notify("Profile saved");
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">{(p) => <Input {...p} defaultValue={currentGuide.name} />}</Field>
          <Field label="Region">{(p) => <Input {...p} defaultValue={currentGuide.region} />}</Field>
          <Field label="SLTDA licence number" hint="Required for verification">
            {(p) => <Input {...p} placeholder="e.g. SLTDA/G/1234" />}
          </Field>
          <Field label="Languages">{(p) => <Input {...p} defaultValue="English, Sinhala" />}</Field>
        </div>
        <Field label="About you">
          {(p) => (
            <Textarea
              {...p}
              rows={4}
              defaultValue="Born in Badulla, guiding hikers through the hill country since 2016."
            />
          )}
        </Field>
        <Button type="submit" className="self-start">
          Save profile
        </Button>
      </form>
    </>
  );
}
