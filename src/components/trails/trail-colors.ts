import type { TrailColor } from "@/lib/types";

/**
 * Static Tailwind classes per trail colour. Tailwind only generates classes
 * it can see in source, so these must be written out in full rather than
 * built with template strings.
 */
export const trailColorClasses: Record<TrailColor, { bg: string; text: string; border: string }> = {
  coastal: { bg: "bg-coastal", text: "text-coastal", border: "border-coastal" },
  heritage: { bg: "bg-heritage", text: "text-heritage", border: "border-heritage" },
  wild: { bg: "bg-wild", text: "text-wild", border: "border-wild" },
  modern: { bg: "bg-modern", text: "text-modern", border: "border-modern" },
};
