import Photo from "./Photo";
import { photos, type PhotoKey } from "@/lib/images";

/** Detail-page photo collage: one large image plus up to two (or four) smaller ones. */
export default function Gallery({
  images,
  alt,
  layout = "duo",
}: {
  images: PhotoKey[];
  alt: string;
  layout?: "duo" | "trio";
}) {
  const [main, ...rest] = images;
  if (!main) return null;
  const side = rest.slice(0, layout === "duo" ? 2 : 4);

  return (
    <div
      className={
        layout === "duo"
          ? "grid gap-3.5 overflow-hidden rounded-[var(--radius-lg)] sm:grid-cols-[2fr_1fr]"
          : "grid grid-cols-2 gap-3.5 overflow-hidden rounded-[var(--radius-lg)] sm:grid-cols-[2fr_1fr_1fr]"
      }
    >
      <div
        className={
          layout === "duo"
            ? "relative h-64 bg-ocean-100 sm:h-[440px]"
            : "relative col-span-2 h-64 bg-ocean-100 sm:col-span-1 sm:row-span-2 sm:h-[420px]"
        }
      >
        <Photo src={photos[main]} alt={alt} sizes="(min-width: 640px) 66vw, 100vw" priority />
      </div>
      {side.length ? (
        <div className={layout === "duo" ? "hidden grid-rows-2 gap-3.5 sm:grid" : "contents"}>
          {side.map((key, index) => (
            <div key={`${key}-${index}`} className="relative h-32 bg-ocean-100 sm:h-auto">
              <Photo src={photos[key]} alt={`${alt}, photo ${index + 2}`} sizes="(min-width: 640px) 25vw, 50vw" />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
