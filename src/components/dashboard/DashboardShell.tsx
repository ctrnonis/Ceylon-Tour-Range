"use client";

import { Bell, CalendarCheck, CreditCard, Heart, LayoutDashboard, Route, UserRound } from "lucide-react";
import AppShell, { type ShellNavGroup } from "@/components/app-shell/AppShell";
import SignOutButton from "@/components/app-shell/SignOutButton";
import { demoTraveller } from "@/lib/data/demo-account";
import { photos } from "@/lib/images";
import { useSession } from "@/lib/store/session-store";

const groups: ShellNavGroup[] = [
  {
    title: "My account",
    items: [
      { tab: "overview", label: "Overview", Icon: LayoutDashboard },
      { tab: "bookings", label: "Bookings", Icon: CalendarCheck },
      { tab: "itineraries", label: "My itineraries", Icon: Route },
      { tab: "saved", label: "Saved places", Icon: Heart },
      { tab: "notifications", label: "Notifications", Icon: Bell },
    ],
  },
  {
    title: "Settings",
    items: [
      { tab: "profile", label: "Profile", Icon: UserRound },
      { tab: "payments", label: "Payment methods", Icon: CreditCard },
    ],
  },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const session = useSession();
  return (
    <AppShell
      area="My trips"
      areaTone="teal"
      groups={groups}
      user={{
        name: session?.name ?? demoTraveller.name,
        subtitle: `Explorer · Member since ${demoTraveller.memberSince}`,
        photo: session ? undefined : photos.memberPortrait,
      }}
      footer={<SignOutButton />}
    >
      {children}
    </AppShell>
  );
}
