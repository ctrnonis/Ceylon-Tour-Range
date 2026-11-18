export interface Guide {
  id: string;
  name: string;
  verifiedSince: number;
  rating: number;
  region: string;
}

export type SubmissionStatus = "live" | "in-review" | "edits-requested" | "rejected";

export interface Submission {
  id: string;
  name: string;
  kind: "place" | "hotel" | "event";
  category: string;
  district: string;
  visits: number | null;
  rating: number | null;
  status: SubmissionStatus;
  submittedBy: string;
  photos: number;
  /** Reviewer note when edits are requested. */
  note?: string;
}

export interface PlatformUser {
  id: string;
  name: string;
  role: "traveller" | "guide" | "driver" | "admin";
  country: string;
  status: "active" | "pending" | "suspended";
  joined: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  country: string;
}

export interface Faq {
  category: "taxi" | "hotels" | "itineraries" | "guides" | "payments";
  question: string;
  answer: string;
}
