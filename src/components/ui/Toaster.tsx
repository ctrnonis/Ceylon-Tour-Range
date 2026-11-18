"use client";

import { CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";

/**
 * Lightweight toast notifications. Call `notify("Saved")` from anywhere on
 * the client; <Toaster /> (mounted once in the root layout) renders them.
 */
interface Toast {
  id: number;
  message: string;
}

let toasts: Toast[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

export function notify(message: string, durationMs = 3200) {
  const toast = { id: nextId++, message };
  toasts = [...toasts, toast];
  emit();
  window.setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== toast.id);
    emit();
  }, durationMs);
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const EMPTY: Toast[] = [];

export default function Toaster() {
  const items = useSyncExternalStore(subscribe, () => toasts, () => EMPTY);

  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2">
      <AnimatePresence>
        {items.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="toast pointer-events-auto"
          >
            <CheckCircle2 className="h-5 w-5 text-sun-500" aria-hidden />
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
