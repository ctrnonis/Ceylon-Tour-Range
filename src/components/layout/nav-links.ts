/** Primary site navigation. Shared by the desktop bar, the mobile menu and the footer. */
export const primaryNav = [
  { href: "/trails", label: "Trails" },
  { href: "/attractions", label: "Attractions" },
  { href: "/hotels", label: "Hotels" },
  { href: "/taxi", label: "Taxi" },
  { href: "/plan", label: "Trip Planner" },
] as const;

export const footerNav = [
  {
    title: "Explore",
    links: [
      { href: "/trails", label: "Themed trails" },
      { href: "/attractions", label: "Attractions" },
      { href: "/hotels", label: "Hotels" },
      { href: "/taxi", label: "Taxi booking" },
      { href: "/plan", label: "Trip planner" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
      { href: "/guide", label: "Guide portal" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faq", label: "Help centre" },
      { href: "/legal#terms", label: "Terms of Service" },
      { href: "/legal#privacy", label: "Privacy Policy" },
      { href: "/legal#cookies", label: "Cookie Policy" },
    ],
  },
] as const;

/** True when `pathname` is `href` or a page under it. */
export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
