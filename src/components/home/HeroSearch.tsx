"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

type SearchType = "attractions" | "hotels" | "taxi";

/** Hero search bar. Routes to the matching directory with the query applied. */
export default function HeroSearch() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<SearchType>("attractions");

  function submit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.set("q", destination.trim());
    if (date) params.set("date", date);
    const query = params.toString();
    router.push(`/${type}${query ? `?${query}` : ""}`);
  }

  return (
    <form onSubmit={submit} className="searchbar mt-10 max-w-4xl" role="search" aria-label="Search the island">
      <label className="searchbar-cell">
        <span>Destination</span>
        <input
          type="text"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          placeholder="Where to? e.g. Ella, Galle, Sigiriya"
        />
      </label>
      <label className="searchbar-cell">
        <span>Date</span>
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      </label>
      <label className="searchbar-cell">
        <span>Looking for</span>
        <select value={type} onChange={(event) => setType(event.target.value as SearchType)}>
          <option value="attractions">Attractions</option>
          <option value="hotels">Hotels</option>
          <option value="taxi">Taxis</option>
        </select>
      </label>
      <Button type="submit" variant="accent" size="lg">
        <Search aria-hidden /> Search
      </Button>
    </form>
  );
}
