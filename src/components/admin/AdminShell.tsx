"use client";

import { BarChart3, CalendarCheck, LifeBuoy, Settings, ShieldCheck, Users } from "lucide-react";
import AppShell, { type ShellNavGroup } from "@/components/app-shell/AppShell";
import SignOutButton from "@/components/app-shell/SignOutButton";

const groups: ShellNavGroup[] = [
  {
    title: "Manage",
    items: [
      { tab: "analytics", label: "Analytics", Icon: BarChart3 },
      { tab: "users", label: "Users", Icon: Users },
      { tab: "bookings", label: "Bookings", Icon: CalendarCheck },
      { tab: "moderation", label: "Content moderation", Icon: ShieldCheck },
      { tab: "support", label: "Support centre", Icon: LifeBuoy },
    ],
  },
  { title: "System", items: [{ tab: "settings", label: "Settings", Icon: Settings }] },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell area="Admin" areaTone="red" groups={groups} user={{ name: "Admin", subtitle: "Platform administrator" }} footer={<SignOutButton />}>
      {children}
    </AppShell>
  );
}
