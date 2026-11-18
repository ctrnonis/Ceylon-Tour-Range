import Avatar from "@/components/ui/Avatar";
import Container from "@/components/ui/Container";
import Panel from "@/components/ui/Panel";
import Rating from "@/components/ui/Rating";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data/testimonials";

export default function Testimonials() {
  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <SectionHeading eyebrow="Testimonials" title="Travellers trust the Range" className="mb-10" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Panel as="figure" key={testimonial.author}>
              <Rating value={5} hideValue />
              <blockquote className="mt-4">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar name={testimonial.author} />
                <span>
                  <strong className="block">{testimonial.author}</strong>
                  <span className="text-sm text-ink-400">{testimonial.country}</span>
                </span>
              </figcaption>
            </Panel>
          ))}
        </div>
      </Container>
    </section>
  );
}
