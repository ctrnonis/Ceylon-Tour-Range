import type { Metadata } from "next";
import { Suspense } from "react";
import AdminShell from "@/components/admin/AdminShell";
import AdminView from "@/components/admin/AdminView";

export const metadata: Metadata = { title: "Admin Dashboard", robots: { index: false } };

/**
 * Admin dashboard. Open to anyone in this preview; the backend phase puts it
 * behind admin-role authentication (middleware + server-side checks).
 */
export default function AdminPage() {
  return (
    <Suspense>
      <AdminShell>
        <AdminView />
      </AdminShell>
    </Suspense>
  );
}
