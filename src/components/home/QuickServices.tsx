import Link from "next/link";
import { CarFront, BedDouble, Route } from "lucide-react";
import Container from "@/components/ui/Container";

const services = [
  { href: "/taxi", title: "Taxi Booking", text: "Fixed fares, live tracking, trusted drivers.", Icon: CarFront },
  { href: "/hotels", title: "Hotel Stays", text: "Hand-picked stays across the island.", Icon: BedDouble },
  { href: "/plan", title: "Trip Planner", text: "Drag-and-drop itineraries, shared with friends.", Icon: Route },
];

/** Shortcuts to the three core services, directly under the hero. */
export default function QuickServices() {
  return (
    <section className="py-14 sm:py-20" aria-label="Services">
      <Container className="grid gap-5 md:grid-cols-3">
        {services.map(({ href, title, text, Icon }) => (
          <Link key={href} href={href} className="card card-interactive flex items-center gap-4 p-5">
            <span className="icon-tile">
              <Icon aria-hidden />
            </span>
            <span>
              <h3>{title}</h3>
              <span className="text-sm text-ink-400">{text}</span>
            </span>
          </Link>
        ))}
      </Container>
    </section>
  );
}
