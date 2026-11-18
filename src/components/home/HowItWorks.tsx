import { Compass, CalendarRange, CreditCard } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  { title: "Discover", text: "Search attractions and hotels curated by verified local tour guides.", Icon: Compass },
  { title: "Plan", text: "Drag places into a day-by-day itinerary and share it with your travel party.", Icon: CalendarRange },
  { title: "Book", text: "Reserve hotels and taxis in one place, then track everything live.", Icon: CreditCard },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="How it works" title="Three steps to the perfect trip" className="mb-10" />
        <ol className="grid gap-10 md:grid-cols-3">
          {steps.map(({ title, text, Icon }, index) => (
            <li key={title}>
              <span className="feature-icon mb-4">
                <Icon aria-hidden />
              </span>
              <h3>
                {index + 1} · {title}
              </h3>
              <p className="mt-2 text-ink-400">{text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
