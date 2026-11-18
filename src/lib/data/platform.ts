import type { PlatformUser, Submission } from "@/lib/types";

/**
 * Sample data for the Tour Guide Portal and Admin Dashboard.
 * These panels will read from the backend's reporting endpoints.
 */
export const submissions: Submission[] = [
  {
    id: "sub-1",
    name: "Secret Ella Viewpoint",
    kind: "place",
    category: "Hiking",
    district: "Badulla",
    visits: 3120,
    rating: 4.9,
    status: "live",
    submittedBy: "nuwan",
    photos: 8,
  },
  {
    id: "sub-2",
    name: "Halpewatte Tea Factory",
    kind: "place",
    category: "Culture",
    district: "Badulla",
    visits: 2860,
    rating: 4.7,
    status: "live",
    submittedBy: "nuwan",
    photos: 12,
  },
  {
    id: "sub-3",
    name: "Idalgashinna Rail Walk",
    kind: "place",
    category: "Hiking",
    district: "Badulla",
    visits: null,
    rating: null,
    status: "in-review",
    submittedBy: "nuwan",
    photos: 2,
  },
  {
    id: "sub-4",
    name: "Nil Diya Pokuna Cave",
    kind: "place",
    category: "Adventure",
    district: "Badulla",
    visits: null,
    rating: null,
    status: "edits-requested",
    submittedBy: "nuwan",
    photos: 1,
    note: "Please add at least three photos and safety notes for the cave entrance.",
  },
  {
    id: "sub-5",
    name: "Mirissa Bay Cabanas",
    kind: "hotel",
    category: "Hotel",
    district: "Matara",
    visits: null,
    rating: null,
    status: "in-review",
    submittedBy: "sithara",
    photos: 6,
  },
  {
    id: "sub-6",
    name: "Ella Poya Lantern Walk",
    kind: "event",
    category: "Event",
    district: "Badulla",
    visits: null,
    rating: null,
    status: "in-review",
    submittedBy: "nuwan",
    photos: 3,
  },
];

export const platformUsers: PlatformUser[] = [
  {
    id: "u1",
    name: "Emma Miller",
    role: "traveller",
    country: "United Kingdom",
    status: "active",
    joined: "2026-08-02",
  },
  {
    id: "u2",
    name: "Sithara Wijesinghe",
    role: "guide",
    country: "Sri Lanka",
    status: "pending",
    joined: "2026-08-01",
  },
  { id: "u3", name: "Kasun Dissanayake", role: "driver", country: "Sri Lanka", status: "active", joined: "2026-07-29" },
  { id: "u4", name: "Raj Sharma", role: "traveller", country: "India", status: "active", joined: "2026-07-27" },
  { id: "u5", name: "Lena Thomas", role: "traveller", country: "Germany", status: "active", joined: "2026-07-25" },
  { id: "u6", name: "Ruwan Perera", role: "guide", country: "Sri Lanka", status: "active", joined: "2026-07-20" },
  { id: "u7", name: "Mark Jensen", role: "traveller", country: "Denmark", status: "suspended", joined: "2026-07-18" },
];

/** Monthly bookings by service for the admin chart (last six months). */
export const bookingsByMonth = [
  { month: "Mar", hotels: 140, taxis: 96 },
  { month: "Apr", hotels: 162, taxis: 118 },
  { month: "May", hotels: 150, taxis: 124 },
  { month: "Jun", hotels: 188, taxis: 141 },
  { month: "Jul", hotels: 214, taxis: 172 },
  { month: "Aug", hotels: 236, taxis: 190 },
];

export const adminKpis = {
  revenueUsd: 48200,
  revenueTrend: "18% vs last month",
  bookings: 1312,
  bookingsTrend: "9% vs last month",
  activeUsers: 9807,
  usersTrend: "22% vs last month",
  openTickets: 14,
};

export interface SupportTicket {
  id: string;
  subject: string;
  from: string;
  priority: "high" | "normal" | "low";
  status: "open" | "waiting" | "resolved";
  updated: string;
}

export const supportTickets: SupportTicket[] = [
  {
    id: "T-1042",
    subject: "Driver late for airport pickup",
    from: "Emma Miller",
    priority: "high",
    status: "open",
    updated: "2 h ago",
  },
  {
    id: "T-1041",
    subject: "Refund for cancelled room",
    from: "Raj Sharma",
    priority: "normal",
    status: "waiting",
    updated: "5 h ago",
  },
  {
    id: "T-1039",
    subject: "Can't add photos to a listing",
    from: "Ruwan Perera",
    priority: "low",
    status: "open",
    updated: "yesterday",
  },
  {
    id: "T-1035",
    subject: "Change booking dates",
    from: "Lena Thomas",
    priority: "normal",
    status: "resolved",
    updated: "2 days ago",
  },
];

export const reportedReviews = [
  { id: "r1", target: "Kandy Lake Hotel", reason: "Spam", reports: 3, excerpt: "Best deals at www…" },
];
