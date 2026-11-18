"use client";

import { BedDouble, CalendarDays, LayoutDashboard, MapPinned, MessageSquare, UserRound } from "lucide-react";
import AppShell, { type ShellNavGroup } from "@/components/app-shell/AppShell";
import SignOutButton from "@/components/app-shell/SignOutButton";
import { currentGuide } from "@/lib/data/guides";

const groups: ShellNavGroup[] = [
  {
    title: "Guide tools",
    items: [
      { tab: "overview", label: "Overview", Icon: LayoutDashboard },
      { tab: "places", label: "My places", Icon: MapPinned },
      { tab: "hotels", label: "My hotels", Icon: BedDouble },
      { tab: "events", label: "Events", Icon: CalendarDays },
      { tab: "reviews", label: "Reviews", Icon: MessageSquare },
    ],
  },
  { title: "Account", items: [{ tab: "profile", label: "Guide profile", Icon: UserRound }] },
];

export default function GuideShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      area="Guide Portal"
      areaTone="amber"
      groups={groups}
      user={{ name: currentGuide.name, subtitle: `Verified guide · ${currentGuide.region}` }}
      footer={<SignOutButton />}
    >
      {children}
    </AppShell>
  );
}
