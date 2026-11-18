"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/ui/Container";
import BrandLogo from "./BrandLogo";
import PreferencesMenu from "./PreferencesMenu";
import AccountButtons from "./AccountButtons";
import { isActivePath, primaryNav } from "./nav-links";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <nav className="site-nav print:hidden" aria-label="Main">
      <Container className="flex h-16 items-center gap-8 lg:h-[72px]">
        <BrandLogo />

        <div className="hidden items-center gap-7 lg:flex">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-5 lg:flex">
          <PreferencesMenu />
          <AccountButtons />
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-ocean-900 hover:bg-ocean-100 lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-ocean-700/10 lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {primaryNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
                  className="rounded-lg px-3 py-2.5 font-semibold text-ink-600 hover:bg-ocean-100 aria-[current=page]:text-ocean-900"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-sand-100 pt-4">
                <PreferencesMenu />
                <AccountButtons onNavigate={close} />
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
