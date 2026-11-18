"use client";

import { useState } from "react";
import { BedDouble, CarFront, CreditCard, Route, Search, UsersRound, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import EmptyState from "@/components/ui/EmptyState";
import { faqCategories, faqs } from "@/lib/data/faqs";
import type { Faq } from "@/lib/types";

const categoryIcons: Record<Faq["category"], LucideIcon> = {
  taxi: CarFront,
  hotels: BedDouble,
  itineraries: Route,
  guides: UsersRound,
  payments: CreditCard,
};

/** Searchable, categorised help centre. */
export default function FaqBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Faq["category"] | "all">("all");

  const q = query.trim().toLowerCase();
  const results = faqs.filter(
    (faq) => (category === "all" || faq.category === category) && (!q || `${faq.question} ${faq.answer}`.toLowerCase().includes(q)),
  );

  return (
    <>
      <div className="searchbar relative z-10 mx-auto -mt-24 mb-10 max-w-2xl !grid-cols-1">
        <label className="searchbar-cell !border-0">
          <span>Search the help centre</span>
          <span className="flex items-center gap-2 !normal-case !tracking-normal">
            <Search className="h-4 w-4 text-ink-400" aria-hidden />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. cancel a hotel booking" />
          </span>
        </label>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Categories">
        <Chip active={category === "all"} onClick={() => setCategory("all")}>
          All topics
        </Chip>
        {(Object.keys(faqCategories) as Faq["category"][]).map((key) => {
          const Icon = categoryIcons[key];
          return (
            <Chip key={key} active={category === key} onClick={() => setCategory(key)}>
              <Icon aria-hidden /> {faqCategories[key]}
            </Chip>
          );
        })}
      </div>

      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        {results.length === 0 ? (
          <EmptyState icon={Search} title="No answers found" description="Try different words, or contact our support team." />
        ) : (
          results.map((faq, index) => (
            <details key={faq.question} className="accordion-item" open={index === 0 && !q}>
              <summary>{faq.question}</summary>
              <p className="px-6 pb-5 text-ink-600">{faq.answer}</p>
            </details>
          ))
        )}
      </div>

      <div className="panel mx-auto mt-12 max-w-3xl text-center">
        <h3>Still stuck?</h3>
        <p className="mt-1 mb-4 text-sm text-ink-400">Our support team replies within a few hours.</p>
        <ButtonLink href="/contact">Contact support</ButtonLink>
      </div>
    </>
  );
}
