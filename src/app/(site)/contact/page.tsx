import type { Metadata } from "next";
import Link from "next/link";
import ContactDetails from "@/components/support/ContactDetails";
import ContactForm from "@/components/support/ContactForm";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about bookings, partnerships or becoming a guide.",
};

const supportLinks = [
  { href: "/faq", label: "Help centre and FAQs" },
  { href: "/dashboard?tab=bookings", label: "Manage my bookings" },
  { href: "/guide", label: "Tour guide portal" },
  { href: "/legal#terms", label: "Terms and cancellation policy" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're here to help"
        description="We answer within one business day, usually much sooner."
      />
      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-8">
          <ContactDetails />
          <div>
            <h3 className="mb-3">Quick links</h3>
            <ul className="flex flex-col gap-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-semibold text-ocean-700 hover:underline">
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ContactForm />
      </Container>
    </>
  );
}
