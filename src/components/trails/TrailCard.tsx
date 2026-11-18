import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Photo from "@/components/ui/Photo";
import { photos } from "@/lib/images";
import { cn } from "@/lib/cn";
import type { Trail } from "@/lib/types";
import { trailColorClasses } from "./trail-colors";

export default function TrailCard({ trail }: { trail: Trail }) {
  const colors = trailColorClasses[trail.color];

  return (
    <Link href={`/trails/${trail.slug}`} className="card card-interactive group flex flex-col">
      <div className="card-media">
        <Photo
          src={photos[trail.photo]}
          alt={trail.name}
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
        />
        <span className={cn("badge absolute top-3.5 left-3.5 text-white", colors.bg)}>{trail.givenName}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-5 pt-5 pb-6">
        <div className="flex items-center justify-between gap-2">
          <h3>{trail.name}</h3>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </div>
        <p className="text-sm text-ink-600">{trail.tagline}</p>
        <span className={cn("mt-auto pt-2 text-xs font-bold tracking-wide uppercase", colors.text)}>
          {trail.days.length}-day core route
        </span>
      </div>
    </Link>
  );
}
