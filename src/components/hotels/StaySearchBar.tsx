"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Hotels hero search: updates the ?q= query the results read from. */
export default function StaySearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function submit(event: FormEvent) {
    event.preventDefault();
    router.push(query.trim() ? `/hotels?q=${encodeURIComponent(query.trim())}` : "/hotels");
  }

  return (
    <form onSubmit={submit} className="searchbar mt-8 max-w-3xl" role="search" aria-label="Search stays">
      <label className="searchbar-cell">
        <span>Location</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. Ella, Galle, Kandy" />
      </label>
      <label className="searchbar-cell">
        <span>Guests</span>
        <select defaultValue="2">
          <option value="1">1 adult</option>
          <option value="2">2 adults · 1 room</option>
          <option value="4">Family (2 + 2)</option>
        </select>
      </label>
      <Button type="submit" variant="accent">
        <Search aria-hidden /> Search
      </Button>
    </form>
  );
}
