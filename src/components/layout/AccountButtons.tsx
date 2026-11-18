"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { useSession } from "@/lib/store/session-store";
import { cn } from "@/lib/cn";

/** Log in / Sign up when signed out; avatar linking to the dashboard when signed in. */
export default function AccountButtons({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const session = useSession();

  if (session) {
    return (
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-2 rounded-full py-1 pr-3 pl-1 text-sm font-bold text-ocean-900 hover:bg-ocean-100",
          className,
        )}
      >
        <Avatar name={session.name} size={34} />
        My trips
      </Link>
    );
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)} onClick={onNavigate}>
      <ButtonLink href="/login" variant="ghost" size="sm">
        Log in
      </ButtonLink>
      <ButtonLink href="/signup" size="sm">
        Sign up
      </ButtonLink>
    </div>
  );
}
