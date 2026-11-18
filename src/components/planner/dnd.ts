/**
 * Drag-and-drop payloads for the planner (native HTML5 DnD).
 * Two things can be dragged: an existing stop (to reorder or move it to
 * another day) and an attraction suggestion (to add it as a new stop).
 */
export type DragPayload = { type: "stop"; dayId: string; stopId: string } | { type: "attraction"; slug: string };

const MIME = "application/x-ctr-planner";

export function setDragPayload(event: React.DragEvent, payload: DragPayload) {
  event.dataTransfer.setData(MIME, JSON.stringify(payload));
  // "copyMove" for both so drop targets never reject the drop on effect mismatch.
  event.dataTransfer.effectAllowed = "copyMove";
}

export function readDragPayload(event: React.DragEvent): DragPayload | null {
  try {
    const raw = event.dataTransfer.getData(MIME);
    return raw ? (JSON.parse(raw) as DragPayload) : null;
  } catch {
    return null;
  }
}

/** Whether the drag carries a planner payload (data is unreadable until drop). */
export function isPlannerDrag(event: React.DragEvent): boolean {
  return event.dataTransfer.types.includes(MIME);
}
