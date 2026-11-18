import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
