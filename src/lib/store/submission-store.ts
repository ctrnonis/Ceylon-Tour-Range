"use client";

import { createPersistentStore } from "./create-store";
import { submissions as sampleSubmissions } from "@/lib/data/platform";
import { createId } from "@/lib/id";
import type { Submission, SubmissionStatus } from "@/lib/types";

/**
 * Listings submitted by guides, shared by the Guide Portal (submit, track)
 * and the Admin moderation queue (approve, reject). Becomes the
 * submissions API in the backend phase.
 */
export const submissionStore = createPersistentStore<Submission[]>("submissions", sampleSubmissions);

export function useSubmissions() {
  return submissionStore.useValue();
}

export function submitListing(input: Omit<Submission, "id" | "visits" | "rating" | "status">): Submission {
  const submission: Submission = { ...input, id: createId("sub"), visits: null, rating: null, status: "in-review" };
  submissionStore.set((list) => [submission, ...list]);
  return submission;
}

export function setSubmissionStatus(id: string, status: SubmissionStatus, note?: string) {
  submissionStore.set((list) => list.map((item) => (item.id === id ? { ...item, status, note } : item)));
}
