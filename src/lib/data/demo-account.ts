import type { Booking, Itinerary } from "@/lib/types";

/**
 * Demo account content. Until accounts exist, every visitor starts with
 * this sample traveller's trips and bookings so the dashboard, planner and
 * booking history can be reviewed end to end. "Reset demo data" on the
 * dashboard restores it.
 *
 * Dates are fixed (not relative to today) so server and browser render the
 * same thing.
 */
export const demoTraveller = {
  name: "Amaya Perera",
  email: "amaya.perera@example.com",
  memberSince: 2025,
};

export const demoItineraries: Itinerary[] = [
  {
    id: "trip_honeymoon",
    name: "Honeymoon Loop",
    startDate: "2027-01-12",
    travellers: 2,
    sharedWith: ["emma@example.com"],
    updatedAt: "2026-11-10T09:00:00.000Z",
    days: [
      {
        id: "day_h1",
        location: "colombo",
        stops: [
          { id: "stop_h1a", kind: "transfer", title: "Airport pickup", time: "09:00", note: "CMB → Colombo · Sedan" },
          { id: "stop_h1b", kind: "attraction", title: "Colombo Street Food Walk", time: "18:00", attractionSlug: "colombo-street-food" },
        ],
      },
      {
        id: "day_h2",
        location: "kandy",
        stops: [
          { id: "stop_h2a", kind: "transfer", title: "Drive to Kandy", time: "08:30", note: "About 3 hours" },
          { id: "stop_h2b", kind: "attraction", title: "Temple of the Sacred Tooth Relic", time: "18:00", attractionSlug: "temple-of-the-tooth" },
        ],
      },
      {
        id: "day_h3",
        location: "ella",
        stops: [
          { id: "stop_h3a", kind: "transfer", title: "Kandy to Ella scenic train", time: "08:45", note: "Reserve 2nd-class window seats" },
          { id: "stop_h3b", kind: "attraction", title: "Little Adam's Peak", time: "17:00", attractionSlug: "little-adams-peak" },
          { id: "stop_h3c", kind: "stay", title: "Ella Ridge Resort & Spa", note: "Deluxe Valley View · 3 nights" },
        ],
      },
      {
        id: "day_h4",
        location: "ella",
        stops: [
          { id: "stop_h4a", kind: "attraction", title: "Nine Arch Bridge", time: "09:00", attractionSlug: "nine-arch-bridge" },
          { id: "stop_h4b", kind: "attraction", title: "Halpewatte Tea Factory", time: "11:00", attractionSlug: "halpewatte-tea-factory" },
        ],
      },
      {
        id: "day_h5",
        location: "ella",
        stops: [{ id: "stop_h5a", kind: "attraction", title: "Ravana Falls", time: "10:00", attractionSlug: "ravana-falls" }],
      },
      {
        id: "day_h6",
        location: "koggala",
        stops: [
          { id: "stop_h6a", kind: "transfer", title: "Drive Ella → Koggala", time: "09:00", note: "Van · via Udawalawe" },
          { id: "stop_h6b", kind: "stay", title: "Koggala Lagoon Villa", note: "Beachfront Room · 2 nights" },
        ],
      },
      {
        id: "day_h7",
        location: "koggala",
        stops: [{ id: "stop_h7a", kind: "attraction", title: "Galle Fort", time: "16:00", attractionSlug: "galle-fort" }],
      },
      {
        id: "day_h8",
        location: "colombo",
        stops: [{ id: "stop_h8a", kind: "transfer", title: "Airport drop-off", time: "11:00" }],
      },
    ],
  },
  {
    id: "trip_wildlife",
    name: "Wildlife Weekend",
    startDate: "2027-03-05",
    travellers: 4,
    sharedWith: [],
    updatedAt: "2026-11-02T15:30:00.000Z",
    days: [
      { id: "day_w1", location: "udawalawe", stops: [{ id: "stop_w1a", kind: "attraction", title: "Udawalawe Jeep Safari", time: "06:00", attractionSlug: "udawalawe-safari" }] },
      { id: "day_w2", location: "yala", stops: [{ id: "stop_w2a", kind: "attraction", title: "Yala National Park Safari", time: "05:30", attractionSlug: "yala-safari" }] },
      { id: "day_w3", location: "yala", stops: [] },
    ],
  },
];

const guest = {
  firstName: "Amaya",
  lastName: "Perera",
  email: demoTraveller.email,
  phone: "+94 77 123 4567",
};

export const demoBookings: Booking[] = [
  {
    id: "bk_1001",
    type: "hotel",
    hotelSlug: "ella-ridge-resort",
    roomId: "deluxe-valley",
    checkIn: "2027-01-14",
    checkOut: "2027-01-17",
    guests: 2,
    totalUsd: 289,
    status: "confirmed",
    guest,
    paymentMethod: "card",
    createdAt: "2026-11-01T10:00:00.000Z",
  },
  {
    id: "bk_1002",
    type: "taxi",
    pickup: "cmb-airport",
    dropoff: "colombo",
    date: "2027-01-12",
    time: "09:00",
    vehicle: "sedan",
    distanceKm: 40,
    fareUsd: 18,
    status: "confirmed",
    driver: { name: "Kasun D.", car: "Toyota Prius", plate: "CAB-4471", rating: 4.9 },
    createdAt: "2026-11-01T10:05:00.000Z",
  },
  {
    id: "bk_1003",
    type: "hotel",
    hotelSlug: "koggala-lagoon-villa",
    roomId: "beachfront",
    checkIn: "2027-01-17",
    checkOut: "2027-01-19",
    guests: 2,
    totalUsd: 278,
    status: "payment-due",
    guest,
    paymentMethod: "pay-at-hotel",
    createdAt: "2026-11-02T08:00:00.000Z",
  },
  {
    id: "bk_1004",
    type: "taxi",
    pickup: "ella",
    dropoff: "koggala",
    date: "2027-01-17",
    time: "09:00",
    vehicle: "van",
    distanceKm: 236,
    fareUsd: 112,
    status: "scheduled",
    createdAt: "2026-11-02T08:10:00.000Z",
  },
  {
    id: "bk_0950",
    type: "taxi",
    pickup: "colombo",
    dropoff: "kandy",
    date: "2026-08-02",
    time: "08:00",
    vehicle: "sedan",
    distanceKm: 152,
    fareUsd: 54,
    status: "completed",
    driver: { name: "Kasun D.", car: "Toyota Prius", plate: "CAB-4471", rating: 4.9 },
    createdAt: "2026-07-20T08:10:00.000Z",
  },
  {
    id: "bk_0951",
    type: "hotel",
    hotelSlug: "kandy-lake-hotel",
    roomId: "standard-lake",
    checkIn: "2026-08-02",
    checkOut: "2026-08-04",
    guests: 2,
    totalUsd: 108,
    status: "completed",
    guest,
    paymentMethod: "card",
    createdAt: "2026-07-20T08:00:00.000Z",
  },
  {
    id: "bk_0940",
    type: "hotel",
    hotelSlug: "mirissa-bay-cabanas",
    roomId: "cabana",
    checkIn: "2026-06-10",
    checkOut: "2026-06-12",
    guests: 2,
    totalUsd: 85,
    status: "cancelled",
    guest,
    paymentMethod: "card",
    createdAt: "2026-05-28T08:00:00.000Z",
  },
];

export const demoSavedPlaces = ["sigiriya-rock-fortress", "nine-arch-bridge", "koggala-stilt-fishermen", "mirissa-whale-watching"];
