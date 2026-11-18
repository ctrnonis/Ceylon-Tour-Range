"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

/**
 * Modal dialog built on the native <dialog> element, which handles focus
 * trapping, Escape to close and the backdrop for us.
 */
export default function Dialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => event.target === ref.current && onClose()}
      className="m-auto w-[min(92vw,480px)] rounded-[var(--radius-lg)] bg-white p-0 shadow-[var(--shadow-lg)] backdrop:bg-ocean-950/50 backdrop:backdrop-blur-sm"
      aria-labelledby="dialog-title"
    >
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 id="dialog-title">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-ink-400 hover:bg-sand-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
