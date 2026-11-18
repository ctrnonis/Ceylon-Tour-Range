import type { Guide } from "@/lib/types";

export const guides: Guide[] = [
  { id: "nuwan", name: "Nuwan Gamage", verifiedSince: 2024, rating: 4.9, region: "Hill Country" },
  { id: "sithara", name: "Sithara Wijesinghe", verifiedSince: 2025, rating: 4.8, region: "South Coast" },
  { id: "ruwan", name: "Ruwan Perera", verifiedSince: 2023, rating: 4.7, region: "Cultural Triangle" },
];

export function getGuide(id: string): Guide | undefined {
  return guides.find((guide) => guide.id === id);
}

/** The guide whose portal is shown in the demo (no auth yet). */
export const currentGuide = guides[0]!;
