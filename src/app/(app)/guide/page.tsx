import type { Metadata } from "next";
import { Suspense } from "react";
import GuideShell from "@/components/guide/GuideShell";
import GuideView from "@/components/guide/GuideView";

export const metadata: Metadata = { title: "Tour Guide Portal", robots: { index: false } };

export default function GuidePortalPage() {
  return (
    <Suspense>
      <GuideShell>
        <GuideView />
      </GuideShell>
    </Suspense>
  );
}
