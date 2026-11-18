import Link from "next/link";
import Container from "@/components/ui/Container";
import BrandLogo from "./BrandLogo";
import SocialLinks from "./SocialLinks";
import { footerNav } from "./nav-links";
import { SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer pt-14 pb-8 sm:pt-[76px]">
      <Container>
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <BrandLogo inverted />
            <p className="mt-4 max-w-xs text-sm">
              One platform for taxis, hotels, attractions and itineraries across Sri Lanka.
            </p>
            <SocialLinks className="mt-5" />
          </div>
          {footerNav.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-bold text-white">{group.title}</h4>
              {group.links.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </span>
          <span>Colombo · Kandy · Galle</span>
        </div>
      </Container>
    </footer>
  );
}
