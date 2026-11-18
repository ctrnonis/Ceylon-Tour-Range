import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface StyleProps {
  variant?: Variant;
  size?: Size;
  /** Stretch to the full width of the parent. */
  block?: boolean;
  className?: string;
}

const sizeClass: Record<Size, string> = { sm: "btn-sm", md: "", lg: "btn-lg" };

export function buttonClass({ variant = "primary", size = "md", block, className }: StyleProps = {}) {
  return cn("btn", `btn-${variant}`, sizeClass[size], block && "w-full", className);
}

/** Navigation styled as a button. Use for calls to action that change page. */
export function ButtonLink({ href, children, ...style }: StyleProps & { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={buttonClass(style)}>
      {children}
    </Link>
  );
}

/** A real <button>, for actions (submit, add, toggle). Defaults to type="button". */
export function Button({
  children,
  variant,
  size,
  block,
  className,
  type = "button",
  ...rest
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClass({ variant, size, block, className })} {...rest}>
      {children}
    </button>
  );
}
