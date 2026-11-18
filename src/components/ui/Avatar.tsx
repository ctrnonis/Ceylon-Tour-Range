import Image from "next/image";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";

/** Round avatar: photo when available, otherwise initials on the accent gradient. */
export default function Avatar({
  name,
  src,
  size = 40,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className={cn("shrink-0 rounded-full object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span className={cn("avatar", className)} style={{ width: size, height: size }} aria-label={name} role="img">
      {initials(name)}
    </span>
  );
}
