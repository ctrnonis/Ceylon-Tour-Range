import type { Metadata } from "next";
import { Suspense } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import DashboardView from "@/components/dashboard/DashboardView";

export const metadata: Metadata = { title: "My Dashboard", robots: { index: false } };

export default function DashboardPage() {
  return (
    // The shell and view read ?tab= with useSearchParams, which needs a Suspense boundary.
    <Suspense>
      <DashboardShell>
        <DashboardView />
      </DashboardShell>
    </Suspense>
  );
}
