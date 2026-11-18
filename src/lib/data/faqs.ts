import type { Faq } from "@/lib/types";

export const faqCategories: Record<Faq["category"], string> = {
  taxi: "Taxi",
  hotels: "Hotels",
  itineraries: "Itineraries",
  guides: "Guides",
  payments: "Payments",
};

/** Help centre content. Policies below are placeholders until the client confirms them. */
export const faqs: Faq[] = [
  {
    category: "taxi",
    question: "How do fare estimates work for taxi bookings?",
    answer:
      "Fares are fixed when you book, based on distance and vehicle type. What you see at confirmation is what you pay, with tolls and A/C included. Waiting time beyond 30 minutes is charged at LKR 500 per hour.",
  },
  {
    category: "taxi",
    question: "Can I track my driver?",
    answer:
      "Yes. Once a driver is assigned you can follow the car on the map from the Taxi page or your dashboard, and you'll get a notification when they are 10 minutes away.",
  },
  {
    category: "taxi",
    question: "Which vehicle should I choose?",
    answer:
      "Tuk-tuks are for short town trips. A sedan suits up to three people with two bags. Choose a van for groups or lots of luggage, and an SUV for safari roads and the hill country.",
  },
  {
    category: "hotels",
    question: "Can I cancel or change a hotel booking?",
    answer:
      "Most rooms include free cancellation up to a set number of days before check-in. The exact policy is shown on the room card before you pay and in your dashboard under Bookings.",
  },
  {
    category: "hotels",
    question: "When am I charged for a hotel?",
    answer:
      "Card and PayPal bookings are charged when you confirm. If you choose Pay at hotel, you settle the bill at check-in and the booking is held for you.",
  },
  {
    category: "itineraries",
    question: "How do I share an itinerary with my travel group?",
    answer:
      "Open your itinerary, press Share and send the link. Anyone with the link can view it. People you invite by email can edit days, add stops and comment.",
  },
  {
    category: "itineraries",
    question: "Can I start from a ready-made trip?",
    answer:
      "Yes. Pick one of the four themed trails (Coastal, Heritage, Wild or Modern) and press Plan this trail. The planner fills in every day, which you can then rearrange.",
  },
  {
    category: "guides",
    question: "How do I become a verified tour guide?",
    answer:
      "Apply from the Guide Portal with your SLTDA licence number. Verification takes 2–3 working days, after which you can list places, hotels and events.",
  },
  {
    category: "guides",
    question: "How long does it take for a new place to go live?",
    answer:
      "Our team reviews every submission, usually within 24–48 hours. You'll be notified if we need more photos or details.",
  },
  {
    category: "payments",
    question: "Which currencies and payment methods are supported?",
    answer:
      "We accept Visa, Mastercard, Amex and PayPal, and show prices in USD, EUR, GBP and LKR. Taxi rides can also be paid in cash.",
  },
];
