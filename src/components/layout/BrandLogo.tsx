import Link from "next/link";
import { BRAND_NAME, BRAND_SUFFIX } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Wordmark used in the navbar, app shells and footer. */
export default function BrandLogo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex shrink-0 items-center gap-2.5 text-[1.05rem] font-extrabold",
        inverted ? "text-white" : "text-ocean-900",
        className,
      )}
    >
      <span className="brand-mark" aria-hidden>
        C
      </span>
      <span>
        {BRAND_NAME} <small className="brand-sub">{BRAND_SUFFIX}</small>
      </span>
    </Link>
  );
}
