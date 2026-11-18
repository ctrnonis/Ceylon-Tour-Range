import Link from "next/link";
import { Fragment } from "react";

/** "Attractions / Cultural Triangle / Sigiriya" trail above detail pages. */
export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink-400">
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 ? <span className="mx-1.5">/</span> : null}
          {item.href ? (
            <Link href={item.href} className="hover:text-ocean-700">
              {item.label}
            </Link>
          ) : (
            <strong className="text-ink-900" aria-current="page">
              {item.label}
            </strong>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
