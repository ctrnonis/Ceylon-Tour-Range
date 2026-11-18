import localFont from "next/font/local";

/**
 * Brand fonts, self-hosted from the @fontsource-variable packages instead
 * of fetched from Google at build time. Builds work offline, and no
 * visitor data is sent to Google Fonts.
 *
 *   Fraunces           display headings
 *   Plus Jakarta Sans  UI and body text
 */
export const fraunces = localFont({
  variable: "--font-fraunces",
  display: "swap",
  src: [
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
});

export const jakarta = localFont({
  variable: "--font-jakarta",
  display: "swap",
  src: [
    {
      path: "../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2",
      style: "normal",
      weight: "200 800",
    },
  ],
});
