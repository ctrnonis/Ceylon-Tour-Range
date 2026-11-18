import Container from "@/components/ui/Container";
import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { photos } from "@/lib/images";
import { features } from "./launch-content";

/** Teaser of the platform's features. Cards are deliberately not links until launch. */
export default function ComingFeatures() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What's coming"
            title="Everything for your trip, in one place"
            description="Here's a first look at what you'll be able to do when we open."
            className="mb-12"
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 3) * 0.1}>
              <article className="card card-interactive h-full">
                <div className="card-media !aspect-[16/10]">
                  <Photo
                    src={photos[feature.photo]}
                    alt=""
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  />
                  <span className="badge badge-light absolute top-3.5 left-3.5">Coming soon</span>
                </div>
                <div className="px-6 pt-5 pb-6">
                  <h3>{feature.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-600">{feature.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
