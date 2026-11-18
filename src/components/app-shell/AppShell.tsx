"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import BrandLogo from "@/components/layout/BrandLogo";
import Avatar from "@/components/ui/Avatar";
import Badge, { type BadgeTone } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { HOME_HREF } from "@/lib/launch";

export interface ShellNavItem {
  /** Value of the ?tab= query this item opens. */
  tab: string;
  label: string;
  Icon: LucideIcon;
}

export interface ShellNavGroup {
  title: string;
  items: ShellNavItem[];
}

/**
 * Layout for signed-in areas (traveller dashboard, guide portal, admin).
 * Sections are addressed with ?tab= so each one has a shareable URL.
 * The sidebar collapses to a horizontal tab strip on small screens.
 */
export default function AppShell({
  area,
  areaTone,
  groups,
  user,
  footer,
  children,
}: {
  area: string;
  areaTone: BadgeTone;
  groups: ShellNavGroup[];
  user: { name: string; subtitle: string; photo?: string };
  footer?: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  const firstTab = groups[0]?.items[0]?.tab;
  const current = params.get("tab") ?? firstTab;
  const allItems = groups.flatMap((group) => group.items);
  const href = (tab: string) => (tab === firstTab ? pathname : `${pathname}?tab=${tab}`);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="site-nav print:hidden">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:h-[72px]">
          <BrandLogo />
          <Badge tone={areaTone} className="hidden sm:inline-flex">
            {area}
          </Badge>
          <div className="ml-auto flex items-center gap-3">
            <Link href={HOME_HREF} className="hidden text-sm font-semibold text-ink-600 hover:text-ocean-900 sm:inline">
              Back to site
            </Link>
            <Avatar name={user.name} src={user.photo} size={36} />
          </div>
        </div>
        {/* Mobile section tabs */}
        <nav
          className="flex gap-1 overflow-x-auto border-t border-ocean-700/10 px-3 py-2 lg:hidden"
          aria-label={`${area} sections`}
        >
          {allItems.map(({ tab, label }) => (
            <Link
              key={tab}
              href={href(tab)}
              aria-current={current === tab ? "page" : undefined}
              className="shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold text-ink-600 aria-[current=page]:bg-ocean-900 aria-[current=page]:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="flex flex-1">
        <aside className="sidebar hidden w-[250px] shrink-0 flex-col px-4 py-7 lg:flex print:hidden">
          <div className="mb-5 flex items-center gap-3 rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-3.5">
            <Avatar name={user.name} src={user.photo} size={44} />
            <span className="min-w-0">
              <strong className="block truncate text-sm text-white">{user.name}</strong>
              <span className="text-xs text-white/55">{user.subtitle}</span>
            </span>
          </div>
          <nav aria-label={`${area} sections`}>
            {groups.map((group) => (
              <div key={group.title}>
                <span className="sidebar-title">{group.title}</span>
                {group.items.map(({ tab, label, Icon }) => (
                  <Link
                    key={tab}
                    href={href(tab)}
                    className="sidebar-link"
                    aria-current={current === tab ? "page" : undefined}
                  >
                    <Icon aria-hidden /> {label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
          {footer ? <div className="mt-auto pt-6">{footer}</div> : null}
        </aside>

        <main className={cn("min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-9 lg:px-10")}>{children}</main>
      </div>
    </div>
  );
}

/** Reads the active ?tab= for a section page, falling back to the first. */
export function useActiveTab<T extends string>(tabs: readonly T[]): T {
  const value = useSearchParams().get("tab");
  return (tabs as readonly string[]).includes(value ?? "") ? (value as T) : tabs[0]!;
}
