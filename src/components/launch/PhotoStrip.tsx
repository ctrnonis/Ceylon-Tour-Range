import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import { photos } from "@/lib/images";
import { gallery } from "./launch-content";

/** Edge-to-edge strip of island photos with place captions. */
export default function PhotoStrip() {
  return (
    <section aria-label="Places across Sri Lanka" className="pb-20 sm:pb-28">
      <Reveal className="flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:justify-center">
        {gallery.map((item) => (
          <figure key={item.caption} className="tile !aspect-[3/4] w-56 shrink-0 snap-start bg-ocean-100 sm:w-64">
            <Photo src={photos[item.photo]} alt={item.caption} sizes="256px" />
            <span>{item.caption}</span>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}
