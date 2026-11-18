"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CalendarCheck, CreditCard, Info, Lightbulb, Plus, RotateCcw } from "lucide-react";
import { useActiveTab } from "@/components/app-shell/AppShell";
import SectionHeader from "@/components/app-shell/SectionHeader";
import BookingsTable from "@/components/bookings/BookingsTable";
import Badge from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { Field, Input, Select } from "@/components/ui/Field";
import Money from "@/components/ui/Money";
import Panel from "@/components/ui/Panel";
import Photo from "@/components/ui/Photo";
import Rating from "@/components/ui/Rating";
import Stat from "@/components/ui/Stat";
import Tabs from "@/components/ui/Tabs";
import { notify } from "@/components/ui/Toaster";
import { useToday } from "@/hooks/useToday";
import { CURRENCIES, type CurrencyCode } from "@/lib/currency";
import { getAttraction } from "@/lib/data/attractions";
import { demoNotifications, demoTraveller } from "@/lib/data/demo-account";
import { photos } from "@/lib/images";
import { bookingGroup, useBookings } from "@/lib/store/booking-store";
import { setCurrency, usePreferences } from "@/lib/store/preferences-store";
import { resetDemoData } from "@/lib/store/reset-demo";
import { signIn, useSession } from "@/lib/store/session-store";
import { useTrips } from "@/lib/store/trip-store";
import { summariseBooking } from "@/components/bookings/booking-summary";
import ItineraryList from "./ItineraryList";
import NextTripHero from "./NextTripHero";
import NotificationList from "./NotificationList";
import SavedPlacesGrid from "./SavedPlacesGrid";

export const DASHBOARD_TABS = ["overview", "bookings", "itineraries", "saved", "notifications", "profile", "payments"] as const;
type BookingFilter = "upcoming" | "past" | "cancelled";

/** Traveller dashboard. The section shown follows ?tab= (see DashboardShell). */
export default function DashboardView() {
  const tab = useActiveTab(DASHBOARD_TABS);
  return (
    <>
      <DemoNotice />
      {tab === "overview" && <Overview />}
      {tab === "bookings" && <BookingsSection />}
      {tab === "itineraries" && <ItinerariesSection />}
      {tab === "saved" && <SavedSection />}
      {tab === "notifications" && <NotificationsSection />}
      {tab === "profile" && <ProfileSection />}
      {tab === "payments" && <PaymentsSection />}
    </>
  );
}

function DemoNotice() {
  const session = useSession();
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-[var(--radius-md)] border border-sun-500/30 bg-sun-500/10 p-4 text-sm sm:flex-row sm:items-center sm:justify-between print:hidden">
      <p className="flex gap-2 text-ink-600">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-sun-600" aria-hidden />
        <span>
          Preview mode: trips and bookings are sample data saved in this browser.
          {session ? "" : " Log in to see your name here."}
        </span>
      </p>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          resetDemoData();
          notify("Demo data restored");
        }}
      >
        <RotateCcw aria-hidden /> Reset demo data
      </Button>
    </div>
  );
}

function Overview() {
  const session = useSession();
  const today = useToday();
  const bookings = useBookings();
  const { itineraries, savedPlaces } = useTrips();

  const firstName = (session?.name ?? demoTraveller.name).split(" ")[0];
  const upcomingTrips = [...itineraries].sort((a, b) => a.startDate.localeCompare(b.startDate)).filter((t) => !today || t.startDate >= today);
  const nextTrip = upcomingTrips[0] ?? itineraries[0];
  const upcoming = bookings.filter((b) => bookingGroup(b) === "upcoming").sort((a, b) => summariseBooking(a).start.localeCompare(summariseBooking(b).start));
  const spent = bookings.filter((b) => b.status !== "cancelled").reduce((total, b) => total + summariseBooking(b).amountUsd, 0);
  const daysToGo = nextTrip && today ? Math.round((new Date(`${nextTrip.startDate}T00:00:00`).getTime() - new Date(`${today}T00:00:00`).getTime()) / 86_400_000) : null;
  const recommendation = getAttraction("halpewatte-tea-factory");

  return (
    <>
      <SectionHeader
        title={`Ayubowan, ${firstName}`}
        description={daysToGo !== null && daysToGo >= 0 ? `Your next journey starts in ${daysToGo} ${daysToGo === 1 ? "day" : "days"}.` : "Plan your next journey."}
        actions={
          <>
            <ButtonLink href="/attractions" variant="ghost" size="sm">
              Explore
            </ButtonLink>
            <ButtonLink href="/plan" size="sm">
              <Plus aria-hidden /> New itinerary
            </ButtonLink>
          </>
        }
      />

      {nextTrip ? <NextTripHero trip={nextTrip} /> : null}

      <div className="my-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Stat
          label="Upcoming bookings"
          value={upcoming.length}
          note={`${upcoming.filter((b) => b.type === "hotel").length} hotels · ${upcoming.filter((b) => b.type === "taxi").length} taxis`}
          trend="up"
        />
        <Stat label="Trip length" value={nextTrip ? `${nextTrip.days.length} days` : "–"} note={nextTrip ? `${new Set(nextTrip.days.map((d) => d.location)).size} destinations` : undefined} />
        <Stat label="Saved places" value={savedPlaces.length} />
        <Stat label="Total spent" value={<Money usd={spent} />} note={`across ${bookings.filter((b) => b.status !== "cancelled").length} bookings`} />
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h3>Upcoming bookings</h3>
        <Link href="/dashboard?tab=bookings" className="text-sm font-semibold text-ocean-700">
          All bookings →
        </Link>
      </div>
      {upcoming.length ? <BookingsTable bookings={upcoming.slice(0, 4)} /> : <EmptyState icon={CalendarCheck} title="No upcoming bookings" />}

      <div className="mt-7 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <Panel>
            <div className="mb-4 flex items-center justify-between">
              <h3>Saved itineraries</h3>
              <Link href="/dashboard?tab=itineraries" className="text-sm font-semibold text-ocean-700">
                See all →
              </Link>
            </div>
            <ItineraryList trips={itineraries.slice(0, 3)} />
          </Panel>
          <Panel>
            <div className="mb-4 flex items-center justify-between">
              <h3>Saved places</h3>
              <Badge>{savedPlaces.length} saved</Badge>
            </div>
            <SavedPlacesGrid slugs={savedPlaces} limit={4} />
          </Panel>
        </div>

        <div className="flex flex-col gap-6">
          <Panel>
            <div className="mb-4 flex items-center justify-between">
              <h3>Notifications</h3>
              <Badge tone="red">{demoNotifications.length} new</Badge>
            </div>
            <NotificationList items={demoNotifications} />
          </Panel>
          {recommendation ? (
            <Panel className="!p-0 overflow-hidden">
              <div className="relative h-40 bg-ocean-100">
                <Photo src={photos[recommendation.photo]} alt={recommendation.name} sizes="400px" />
              </div>
              <div className="p-6">
                <span className="eyebrow">Recommended for you</span>
                <h3>{recommendation.name}</h3>
                <p className="mt-1 text-sm text-ink-400">A short detour from Ella. Morning tours show the full leaf-to-cup process.</p>
                <div className="mt-4 flex items-center justify-between">
                  <Rating value={recommendation.rating} compact />
                  <ButtonLink href={`/attractions/${recommendation.slug}`} variant="ghost" size="sm">
                    Add to trip
                  </ButtonLink>
                </div>
              </div>
            </Panel>
          ) : null}
          <Panel>
            <strong className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-sun-500" aria-hidden /> Travel tip
            </strong>
            <p className="mt-2 text-sm">Trains from Kandy to Ella sell out in season. Reserve 2nd-class window seats at least three days ahead.</p>
            <p className="mt-2 text-sm text-ink-400">— Nuwan, verified guide</p>
          </Panel>
        </div>
      </div>
    </>
  );
}

function BookingsSection() {
  const bookings = useBookings();
  const [filter, setFilter] = useState<BookingFilter>("upcoming");
  const shown = bookings.filter((b) => bookingGroup(b) === filter);

  return (
    <>
      <SectionHeader
        title="Bookings"
        description="Hotels and taxis across all your trips."
        actions={
          <>
            <ButtonLink href="/hotels" variant="ghost" size="sm">
              Book a stay
            </ButtonLink>
            <ButtonLink href="/taxi" size="sm">
              Book a taxi
            </ButtonLink>
          </>
        }
      />
      <Tabs
        label="Booking status"
        className="mb-5"
        value={filter}
        onChange={setFilter}
        options={(["upcoming", "past", "cancelled"] as const).map((value) => ({
          value,
          label: `${value[0]!.toUpperCase()}${value.slice(1)} (${bookings.filter((b) => bookingGroup(b) === value).length})`,
        }))}
      />
      {shown.length ? <BookingsTable bookings={shown} /> : <EmptyState icon={CalendarCheck} title={`No ${filter} bookings`} />}
    </>
  );
}

function ItinerariesSection() {
  const { itineraries } = useTrips();
  return (
    <>
      <SectionHeader
        title="My itineraries"
        description="Open a trip to edit it in the planner."
        actions={
          <ButtonLink href="/plan" size="sm">
            <Plus aria-hidden /> New itinerary
          </ButtonLink>
        }
      />
      {itineraries.length ? <ItineraryList trips={itineraries} allowDelete /> : <EmptyState icon={CalendarCheck} title="No trips yet" />}
    </>
  );
}

function SavedSection() {
  const { savedPlaces } = useTrips();
  return (
    <>
      <SectionHeader title="Saved places" description={`${savedPlaces.length} places saved for later.`} />
      <SavedPlacesGrid slugs={savedPlaces} removable />
    </>
  );
}

function NotificationsSection() {
  return (
    <>
      <SectionHeader title="Notifications" description="Booking updates, driver assignments and trip activity." />
      <div className="max-w-2xl">
        <NotificationList items={demoNotifications} />
      </div>
    </>
  );
}

function ProfileSection() {
  const session = useSession();
  const { currency } = usePreferences();
  const [name, setName] = useState(session?.name ?? demoTraveller.name);
  const [email, setEmail] = useState(session?.email ?? demoTraveller.email);

  function save(event: FormEvent) {
    event.preventDefault();
    signIn({ name: name.trim() || demoTraveller.name, email: email.trim(), role: session?.role ?? "traveller" });
    notify("Profile updated");
  }

  return (
    <>
      <SectionHeader title="Profile" description="Your details are used to pre-fill bookings." />
      <form onSubmit={save} className="panel flex max-w-2xl flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name">{(p) => <Input {...p} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />}</Field>
          <Field label="Email">{(p) => <Input {...p} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />}</Field>
          <Field label="Phone">{(p) => <Input {...p} type="tel" placeholder="+94 77 123 4567" autoComplete="tel" />}</Field>
          <Field label="Display currency">
            {(p) => (
              <Select {...p} value={currency} onChange={(e) => setCurrency(e.target.value as CurrencyCode)}>
                {Object.entries(CURRENCIES).map(([code, info]) => (
                  <option key={code} value={code}>
                    {code} · {info.label}
                  </option>
                ))}
              </Select>
            )}
          </Field>
        </div>
        <Button type="submit" className="self-start">
          Save changes
        </Button>
      </form>
    </>
  );
}

function PaymentsSection() {
  return (
    <>
      <SectionHeader title="Payment methods" />
      <div className="max-w-2xl">
        <EmptyState
          icon={CreditCard}
          title="No saved payment methods"
          description="Saved cards arrive with the payments integration. Card details will be stored by the payment provider, never on our servers."
        />
      </div>
    </>
  );
}
