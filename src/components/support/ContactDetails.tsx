import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/lib/site";

export default function ContactDetails() {
  const rows = [
    { Icon: Mail, primary: CONTACT.email, secondary: "General & support", href: `mailto:${CONTACT.email}` },
    { Icon: Phone, primary: CONTACT.phone, secondary: CONTACT.hours, href: `tel:${CONTACT.phone.replace(/\s/g, "")}` },
    { Icon: MapPin, primary: CONTACT.address, secondary: "Head office" },
  ];

  return (
    <ul className="flex flex-col gap-3">
      {rows.map(({ Icon, primary, secondary, href }) => {
        const content = (
          <>
            <span className="icon-tile">
              <Icon aria-hidden />
            </span>
            <span>
              <strong className="block text-sm">{primary}</strong>
              <span className="text-sm text-ink-400">{secondary}</span>
            </span>
          </>
        );
        return (
          <li key={primary}>
            {href ? (
              <a href={href} className="row-item">
                {content}
              </a>
            ) : (
              <div className="row-item">{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
