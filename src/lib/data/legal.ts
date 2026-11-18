/**
 * Legal page copy. DRAFT: written as a readable starting point and must be
 * reviewed and replaced by the client's legal counsel before launch.
 */
export interface LegalDocument {
  id: "terms" | "privacy" | "cookies";
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

export const legalDocuments: LegalDocument[] = [
  {
    id: "terms",
    title: "Terms of Service",
    updated: "2026-11-18",
    sections: [
      {
        heading: "Using the platform",
        body: "These terms cover your use of Ceylon Tour Range by Nonis, including taxi bookings, hotel reservations, itinerary tools and guide services. By creating an account or making a booking you agree to them.",
      },
      {
        heading: "Bookings",
        body: "A confirmed booking is a contract between you and the service provider (the hotel, driver or guide). We arrange the booking and take payment on the provider's behalf.",
      },
      {
        heading: "Cancellations and refunds",
        body: "Cancellation policies differ by listing and are shown before you pay. Refunds for eligible cancellations are returned to the original payment method.",
      },
      {
        heading: "Guide content",
        body: "Places, hotels and events submitted by guides are reviewed before publishing, but are provided as-is. Always check opening times and safety conditions locally.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    updated: "2026-11-18",
    sections: [
      {
        heading: "What we collect",
        body: "The minimum needed to run your bookings: contact details, trip details and payment references. Card numbers are handled by our payment provider and never stored by us.",
      },
      {
        heading: "Location",
        body: "Your location is used only during an active taxi ride, to show your driver where to meet you.",
      },
      {
        heading: "Sharing",
        body: "We share booking details only with the provider you booked. We never sell your personal data.",
      },
      {
        heading: "Your rights",
        body: "You can ask to see, correct or delete your data at any time by contacting us.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    updated: "2026-11-18",
    sections: [
      {
        heading: "Essential storage",
        body: "We use essential cookies and browser storage to keep you signed in and remember your trips, currency and language.",
      },
      {
        heading: "Analytics",
        body: "Optional analytics cookies help us improve the site. They are off unless you agree to them.",
      },
    ],
  },
];
