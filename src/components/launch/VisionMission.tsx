import { Eye, Target } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { goals, mission, vision } from "./launch-content";

/** Vision, mission and goals on a dark band. */
export default function VisionMission() {
  return (
    <section className="page-hero !py-20 sm:!py-28">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { Icon: Eye, label: "Our vision", text: vision },
            { Icon: Target, label: "Our mission", text: mission },
          ].map(({ Icon, label, text }, index) => (
            <Reveal key={label} delay={index * 0.12}>
              <div className="h-full rounded-[var(--radius-lg)] border border-white/15 bg-white/[0.07] p-8 backdrop-blur">
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-sun-500/20 text-sun-500">
                  <Icon aria-hidden />
                </span>
                <span className="eyebrow">{label}</span>
                <p className="font-display text-[1.35rem] leading-snug text-white">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <span className="eyebrow">Our goals</span>
          <h2 className="!text-white">What we&apos;re building towards</h2>
        </Reveal>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {goals.map((goal, index) => (
            <Reveal as="li" key={goal.title} delay={index * 0.08} className="border-t-2 border-sun-500 pt-5">
              <span className="font-display text-3xl text-sun-500">0{index + 1}</span>
              <h3 className="mt-2 !text-white">{goal.title}</h3>
              <p className="mt-2 text-sm text-white/75">{goal.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
