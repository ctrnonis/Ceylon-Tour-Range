import { Mail, Phone } from "lucide-react";
import SocialLinks from "@/components/layout/SocialLinks";
import Container from "@/components/ui/Container";
import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import { photos } from "@/lib/images";
import { CONTACT } from "@/lib/site";

/** Closing call to action: get in touch and follow along. No sign-up form until there's a backend to store it. */
export default function StayInTouch() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <Reveal>
          <div className="photo-banner">
            <Photo src={photos.beachSunset} alt="" sizes="(min-width: 1200px) 1200px, 100vw" />
            <div className="photo-banner-body flex flex-col gap-8 p-8 sm:p-14 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <span className="eyebrow !text-sun-500">Stay in touch</span>
                <h2>Be among the first to explore with us</h2>
                <p className="lede !text-white/85">
                  Planning a trip, running a hotel, or a guide who wants to join? We&apos;d love to hear from you.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Ceylon Tour Range enquiry")}`}
                  className="btn btn-accent btn-lg"
                >
                  <Mail aria-hidden /> {CONTACT.email}
                </a>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="btn btn-ghost btn-lg">
                  <Phone aria-hidden /> {CONTACT.phone}
                </a>
                <SocialLinks className="mt-2 justify-center lg:justify-end" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
