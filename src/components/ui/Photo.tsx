import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Responsive photo that fills its parent (the parent sets the size or
 * aspect ratio and must be `relative`). Wraps next/image so every image on
 * the site gets lazy loading, responsive sizes and object-cover cropping.
 */
export default function Photo({
  src,
  alt,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", className)} />;
}
