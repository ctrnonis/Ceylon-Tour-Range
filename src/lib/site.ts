/**
 * Single source of truth for brand and company details. Every page title,
 * the navbar wordmark, the footer and the contact page read from here, so
 * a rename or a new phone number is a one-line edit.
 */
export const BRAND_NAME = "Ceylon Tour Range";
export const BRAND_SUFFIX = "by Nonis";
export const SITE_NAME = `${BRAND_NAME} ${BRAND_SUFFIX}`;

export const SITE_DESCRIPTION =
  "Book taxis, reserve hotels and build day-by-day itineraries with local guides. One platform for your whole Sri Lanka journey.";

/** Contact details shown on About/Contact and in the footer. Placeholder values until confirmed by the client. */
export const CONTACT = {
  email: "hello@ceylontourrange.lk",
  phone: "+94 11 234 5678",
  hours: "Mon–Sat, 8:00–20:00 (Sri Lanka time)",
  address: "42 Galle Road, Colombo 03",
} as const;
