import type { BadgeTone } from "@/components/ui/Badge";
import type { SubmissionStatus } from "@/lib/types";

export const submissionStatusBadge: Record<SubmissionStatus, { label: string; tone: BadgeTone }> = {
  live: { label: "Live", tone: "green" },
  "in-review": { label: "In review", tone: "amber" },
  "edits-requested": { label: "Edits requested", tone: "red" },
  rejected: { label: "Rejected", tone: "red" },
};
