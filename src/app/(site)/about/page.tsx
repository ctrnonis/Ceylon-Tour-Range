import type { Metadata } from "next";
import { CarFront, Compass, HeartHandshake, Headset } from "lucide-react";
import ContactDetails from "@/components/support/ContactDetails";
import ContactForm from "@/components/support/ContactForm";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Photo from "@/components/ui/Photo";
import { photos } from "@/lib/images";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${SITE_NAME} connects travellers with the guides, drivers and hosts who know Sri Lanka best.`,
};

const stats = [
  ["300+", "Verified guides"],
  ["1,200", "Listed places"],
  ["25", "Districts covered"],
];

/** Team areas. Named profiles and photos to be supplied by the client. */
const team = [
  {
    Icon: Compass,
    title: "Founding team",
    text: "Islanders who have planned trips for friends and family for years, and built the platform they wished existed.",
  },
  {
    Icon: HeartHandshake,
    title: "Guide network",
    text: "Licensed local guides who add, verify and keep every listing up to date.",
  },
  {
    Icon: CarFront,
    title: "Driver partners",
    text: "Vetted drivers across the island, on fixed fares agreed before every ride.",
  },
  {
    Icon: Headset,
    title: "Support desk",
    text: "A Colombo-based team answering travellers, guides and hosts seven days a week.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Built by islanders,
            <br />
            for explorers
          </>
        }
        description={`${SITE_NAME} connects travellers with the people who know Sri Lanka best: its guides, drivers and hosts.`}
      />

      <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Our mission</span>
          <h2>Travel that gives back to the island</h2>
          <p className="lede">
            Every booking supports local drivers, family-run hotels and community guides. We verify every listing, keep
            fares fair and route tourism income to the people who create the experience.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {stats.map(([value, label]) => (
              <div key={label}>
                <dd className="stat-value">{value}</dd>
                <dt className="text-sm text-ink-400">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-ocean-100 shadow-[var(--shadow-md)]">
          <Photo
            src={photos.stiltFishermen}
            alt="Stilt fishermen at sunset on the south coast"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
      </Container>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <span className="eyebrow">Our team</span>
          <h2 className="mb-10">The people behind your trip</h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map(({ Icon, title, text }) => (
              <li key={title}>
                <span className="feature-icon mb-4">
                  <Icon aria-hidden />
                </span>
                <h3>{title}</h3>
                <p className="mt-2 text-sm text-ink-600">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="contact" className="scroll-mt-24">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Contact</span>
            <h2>Talk to the team</h2>
            <p className="lede mb-6">
              Questions about bookings, partnerships or becoming a guide? We answer within one business day.
            </p>
            <ContactDetails />
          </div>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
