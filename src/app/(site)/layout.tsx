import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PRE_LAUNCH } from "@/lib/launch";

/** Keep the unfinished site out of search results until launch. */
export const metadata: Metadata = PRE_LAUNCH ? { robots: { index: false, follow: false } } : {};

/** Public pages: sticky navbar, page content, footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
