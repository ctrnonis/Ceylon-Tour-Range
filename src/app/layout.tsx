import type { Metadata } from "next";
import Toaster from "@/components/ui/Toaster";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import { fraunces, jakarta } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Discover Sri Lanka`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en_GB" },
};

/**
 * Root layout: fonts, global styles and the toast outlet only. Page chrome
 * is added by the route-group layouts:
 *   (site)  public pages     navbar + footer
 *   (auth)  login / signup   full-screen split layout
 *   (app)   dashboards       app header + sidebar
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
