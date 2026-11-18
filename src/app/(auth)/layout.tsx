import { Star } from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";
import Avatar from "@/components/ui/Avatar";
import Photo from "@/components/ui/Photo";
import { photos } from "@/lib/images";
import { testimonials } from "@/lib/data/testimonials";

const quote = testimonials[0]!;

/** Full-screen split layout for login, sign-up and password reset. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden text-white lg:flex">
        <Photo src={photos.ellaTrain} alt="Train crossing Nine Arch Bridge, Ella" sizes="50vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/75 via-ocean-950/40 to-ocean-950/95" />
        <div className="relative z-10 px-14 pt-10">
          <BrandLogo inverted />
        </div>
        <div className="relative z-10 px-14 pb-14">
          <span className="eyebrow !text-sun-500">Ella · Hill Country</span>
          <h2 className="!text-white">Your whole journey, one account.</h2>
          <p className="lede max-w-md !text-white/85">
            Bookings, itineraries and saved places stay in sync, from the airport transfer to the last sunset.
          </p>
          <figure className="mt-8 max-w-md rounded-[var(--radius-lg)] border border-white/15 bg-white/10 p-6 backdrop-blur">
            <div className="flex gap-0.5 text-sun-500" aria-label="5 stars">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} aria-hidden />
              ))}
            </div>
            <blockquote className="mt-3 font-display text-lg leading-snug">&ldquo;{quote.quote}&rdquo;</blockquote>
            <figcaption className="mt-4 flex items-center gap-3 text-sm">
              <Avatar name={quote.author} src={photos.travellerPortrait} size={36} />
              <span>
                <strong className="block">{quote.author}</strong>
                <span className="text-white/70">{quote.country}</span>
              </span>
            </figcaption>
          </figure>
          <dl className="mt-8 flex gap-10">
            {[
              ["300+", "Verified guides"],
              ["1,200", "Listed places"],
              ["25", "Districts"],
            ].map(([value, label]) => (
              <div key={label}>
                <dd className="font-display text-3xl">{value}</dd>
                <dt className="text-xs tracking-widest text-white/60 uppercase">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </aside>

      <main className="flex items-center justify-center px-5 py-12 sm:px-6">
        <div className="w-full max-w-[430px]">
          <div className="mb-8 lg:hidden">
            <BrandLogo />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
