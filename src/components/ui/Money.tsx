"use client";

import { useMoney } from "@/lib/store/preferences-store";

/**
 * Renders a USD amount in the visitor's chosen currency. A client
 * component, so server-rendered pages can show prices that follow the
 * currency switcher.
 */
export default function Money({ usd, className }: { usd: number; className?: string }) {
  const format = useMoney();
  return <span className={className}>{format(usd)}</span>;
}
