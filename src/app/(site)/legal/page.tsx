import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { legalDocuments } from "@/lib/data/legal";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Legal",
  description: "Terms of Service, Privacy Policy and Cookie Policy.",
};

export default function LegalPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="The fine print, made readable" />
      <Container className="grid max-w-[1000px] gap-10 py-14 sm:py-20 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Legal documents" className="panel flex h-fit flex-col gap-3 !p-5 lg:sticky lg:top-24">
          {legalDocuments.map((doc) => (
            <a key={doc.id} href={`#${doc.id}`} className="text-sm font-semibold text-ocean-700 hover:underline">
              {doc.title}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-6">
          <p className="rounded-[var(--radius-md)] bg-sun-500/10 p-4 text-sm text-ink-600">
            Draft wording for review. Final legal text will be supplied by the company&apos;s legal advisers before
            launch.
          </p>
          {legalDocuments.map((doc) => (
            <article key={doc.id} id={doc.id} className="panel scroll-mt-24">
              <Badge className="mb-3">Updated {formatDate(doc.updated)}</Badge>
              <h2>{doc.title}</h2>
              {doc.sections.map((section, index) => (
                <section key={section.heading} className="mt-5">
                  <h3 className="!text-base">
                    {index + 1}. {section.heading}
                  </h3>
                  <p className="mt-1 text-sm text-ink-600">{section.body}</p>
                </section>
              ))}
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
