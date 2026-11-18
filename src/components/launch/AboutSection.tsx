import Container from "@/components/ui/Container";
import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import { photos } from "@/lib/images";
import { SITE_NAME } from "@/lib/site";

const intro = `${SITE_NAME} brings everything a trip to Sri Lanka needs into one simple platform. Pick a themed trail or build your own route, book stays and taxis along the way, and lean on local guides for the places you'd never find alone.`;

const stats = [
  ["4", "Themed trails"],
  ["25", "Districts"],
  ["1", "Place to plan it all"],
];

/** What the business is. */
export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-6 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">Who we are</span>
          <h2>A Sri Lankan travel company, built for the way people travel today</h2>
          <p className="lede">{intro}</p>
          <dl className="mt-9 grid grid-cols-3 gap-4">
            {stats.map(([value, label]) => (
              <div key={label}>
                <dd className="stat-value">{value}</dd>
                <dt className="text-sm text-ink-400">{label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.15} className="grid grid-cols-2 gap-4">
          <div className="relative row-span-2 min-h-[360px] overflow-hidden rounded-[var(--radius-lg)] bg-ocean-100 shadow-[var(--shadow-md)]">
            <Photo src={photos.sigiriya} alt="Sigiriya Rock Fortress" sizes="(min-width: 1024px) 280px, 50vw" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-ocean-100 shadow-[var(--shadow-md)]">
            <Photo
              src={photos.stiltFishermen}
              alt="Stilt fishermen on the south coast"
              sizes="(min-width: 1024px) 280px, 50vw"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-ocean-100 shadow-[var(--shadow-md)]">
            <Photo src={photos.teaBungalow} alt="Tea country in the hills" sizes="(min-width: 1024px) 280px, 50vw" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
