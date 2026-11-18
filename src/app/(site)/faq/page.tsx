import type { Metadata } from "next";
import FaqBrowser from "@/components/support/FaqBrowser";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { faqs } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "Help Centre",
  description: "Answers about taxis, hotels, itineraries, guides and payments.",
};

/** FAQ structured data so search engines can show answers directly. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero title="How can we help?" align="center">
        <div className="h-20" />
      </PageHero>
      <Container className="pb-16 sm:pb-24">
        <FaqBrowser />
      </Container>
    </>
  );
}
