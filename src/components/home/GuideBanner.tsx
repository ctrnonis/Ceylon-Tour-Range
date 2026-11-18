import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Photo from "@/components/ui/Photo";
import { photos } from "@/lib/images";

/** Call-to-action for local guides to join the platform. */
export default function GuideBanner() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="photo-banner min-h-[340px]">
          <Photo
            src={photos.beachSunset}
            alt="Beach at sunset on the south coast"
            sizes="(min-width: 1200px) 1200px, 100vw"
          />
          <div className="photo-banner-body flex min-h-[340px] max-w-xl flex-col justify-center p-8 sm:p-14">
            <h2>Local guides earn by sharing hidden gems</h2>
            <p className="lede !text-white/85">
              Add places, manage listings and track engagement in the Tour Guide Portal.
            </p>
            <div className="mt-6">
              <ButtonLink href="/guide" variant="accent">
                Become a guide
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
