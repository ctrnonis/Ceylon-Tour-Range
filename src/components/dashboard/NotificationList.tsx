import Link from "next/link";
import { CarFront, CreditCard, Route } from "lucide-react";
import type { DemoNotification } from "@/lib/data/demo-account";

const icons = { payment: CreditCard, driver: CarFront, trip: Route };

export default function NotificationList({ items }: { items: DemoNotification[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => {
        const Icon = icons[item.kind];
        return (
          <li key={item.id}>
            <Link href={item.href} className="row-item !p-3.5">
              <span className="icon-tile">
                <Icon aria-hidden />
              </span>
              <span>
                <strong className="block text-sm">{item.title}</strong>
                <span className="text-sm text-ink-400">
                  {item.detail} · {item.when}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
