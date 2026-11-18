import { BedDouble, CarFront, Landmark, PenLine, UtensilsCrossed, type LucideIcon } from "lucide-react";
import type { StopKind } from "@/lib/types";

export const stopKinds: Record<StopKind, { label: string; Icon: LucideIcon }> = {
  attraction: { label: "Attraction", Icon: Landmark },
  transfer: { label: "Transfer", Icon: CarFront },
  stay: { label: "Stay", Icon: BedDouble },
  meal: { label: "Meal", Icon: UtensilsCrossed },
  custom: { label: "Note", Icon: PenLine },
};
