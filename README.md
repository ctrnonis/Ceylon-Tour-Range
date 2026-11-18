# Ceylon Tour Range by Nonis

A trip-planning and booking platform for Sri Lanka: themed trails, an attractions directory, hotel booking, taxi
booking with live tracking, a drag-and-drop itinerary builder, and portals for travellers, tour guides and admins.

**Status: Stage 2 complete (front end).** Every page in the sitemap (`CTR.requirements.pdf`) is built to the approved
design (`design/mockups`) and is fully clickable. Data is sample data and is saved in the visitor's browser. Stage 3
replaces that with a real backend (see [Moving to the backend](#moving-to-the-backend)).

Live: https://ceylon-tour-range.vercel.app (deploys automatically from `main`).

## Launch mode

While `PRE_LAUNCH` is on (`src/lib/launch.ts`), visitors to `/` see a coming-soon page with the vision, mission and
goals (`app/(launch)/coming-soon`). The full site is still deployed for review at **/preview** and its usual URLs, but
it isn't linked from the landing page and is hidden from search engines.

To launch, set `NEXT_PUBLIC_PRE_LAUNCH=false` in Vercel (Settings → Environment Variables) and redeploy.

## Stack

| Layer     | Choice                                            |
| --------- | ------------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19, TypeScript     |
| Styling   | Tailwind CSS v4 + a small design-system CSS layer |
| Animation | Motion (`motion/react`)                           |
| Icons     | lucide-react                                      |
| Fonts     | Fraunces + Plus Jakarta Sans, self-hosted         |
| Quality   | ESLint, Prettier, `tsc` (strict)                  |
| Hosting   | Vercel                                            |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script           | What it does                                                 |
| ---------------- | ------------------------------------------------------------ |
| `npm run build`  | Production build                                             |
| `npm run check`  | Type check + lint + formatting check (run before committing) |
| `npm run format` | Format everything with Prettier                              |

## Pages

| Route                                   | Page                                              |
| --------------------------------------- | ------------------------------------------------- |
| `/`                                     | Homepage                                          |
| `/trails`, `/trails/[slug]`             | Themed trails and trail overview                  |
| `/attractions`, `/attractions/[slug]`   | Attractions directory and details                 |
| `/hotels`, `/hotels/[slug]`             | Hotels directory and details                      |
| `/hotels/[slug]/book`                   | Hotel checkout                                    |
| `/taxi`                                 | Taxi booking and ride tracking                    |
| `/plan`                                 | Itinerary builder (`?trail=` starts from a trail) |
| `/dashboard`                            | Traveller dashboard (`?tab=bookings`, ...)        |
| `/guide`                                | Tour guide portal                                 |
| `/admin`                                | Admin dashboard                                   |
| `/login`, `/signup`, `/forgot-password` | Authentication                                    |
| `/about`, `/contact`, `/faq`, `/legal`  | Company and support pages                         |

## Project structure

```
src/
  app/                     Routes. Route groups add the page chrome:
    (site)/                  public pages: navbar + footer
    (auth)/                  login / sign-up: split-screen layout
    (app)/                   dashboard, guide portal, admin: sidebar shell
    layout.tsx               fonts, global CSS, toasts
    fonts.ts, sitemap.ts, robots.ts, not-found.tsx

  components/
    ui/                      Design-system primitives (Button, Badge, Field, Tabs, ...)
    layout/                  Navbar, Footer, nav links, currency/language switcher
    map/                     Island map (pins, routes, live vehicle)
    app-shell/               Sidebar shell for signed-in areas
    home/ trails/ attractions/ hotels/ taxi/ planner/
    dashboard/ guide/ admin/ auth/ support/ bookings/ reviews/

  lib/
    types/                   Domain types: the shapes the backend API will return
    data/                    Sample content (attractions, hotels, trails, FAQs, ...)
    store/                   Browser-persisted state (trips, bookings, session, ...)
    site.ts                  Brand name and contact details
    images.ts                Photo catalogue (swap placeholder photos here)
    currency.ts, format.ts, geo.ts

  styles/
    theme.css                Design tokens (colours, fonts, radii, motion)
    base.css                 Element defaults
    components.css           Design-system component classes

design/mockups/            Approved static mockups (reference only)
```

### Conventions

- **Pages stay thin.** A `page.tsx` picks data and lays out components; UI lives in `components/`, content in
  `lib/data/`.
- **Use the UI primitives** (`Button`, `Badge`, `Field`, ...) rather than the raw CSS classes they wrap.
- **State changes go through store functions** (`addStop`, `createHotelBooking`, ...), never `store.set` in a component.
  Each function is one future API call.
- **Prices are stored in USD** and shown with `<Money usd={...} />`, which follows the visitor's chosen currency.
- **Dates relative to today** are computed in the browser (`useToday`, `useNow`) because pages are pre-rendered at
  build time.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org) (`feat(planner): ...`).

## Common edits

| To change...                      | Edit                               |
| --------------------------------- | ---------------------------------- |
| Brand name, phone, email, address | `src/lib/site.ts`                  |
| Photos                            | `src/lib/images.ts`                |
| Attractions / hotels / trails     | `src/lib/data/*.ts`                |
| Taxi fares and vehicles           | `src/lib/data/taxi.ts`             |
| Exchange rates                    | `src/lib/currency.ts`              |
| FAQ and legal copy                | `src/lib/data/faqs.ts`, `legal.ts` |
| Colours and fonts                 | `src/styles/theme.css`             |

## What is simulated in this stage

| Feature                      | Now                                   | Backend phase                          |
| ---------------------------- | ------------------------------------- | -------------------------------------- |
| Accounts, social login       | Mock session in the browser           | Auth provider, protected routes        |
| Trips, bookings, submissions | `localStorage` stores                 | Database + API                         |
| Payments                     | Display-only card form, nothing taken | Payment provider (e.g. Stripe/PayHere) |
| Maps                         | Stylised island map                   | Google Maps / Mapbox                   |
| Taxi tracking                | Simulated driver (`useRideTracking`)  | Dispatch service updates               |
| Sharing / collaboration      | Invite list stored locally            | Shared trips with permissions          |
| Exchange rates               | Fixed placeholder rates               | Rates API                              |
| Sinhala / Tamil              | Switcher in place, English only       | Translated copy                        |

Everyone currently sees a sample traveller account. "Reset demo data" on the dashboard restores it.

## Moving to the backend

Each file in `src/lib/store/` exposes plain functions and a hook. Replacing a store means keeping those signatures and
calling the API inside them (with a data-fetching library for the hooks); components don't need to change. Types in
`src/lib/types/` are the contract for the API responses.

## Open items for the client

- Real social media links (footer, `components/layout/SocialLinks.tsx`).
- Licensed photography to replace the Unsplash placeholders (`lib/images.ts`).
- Confirm contact details, taxi rates, tax rate and attraction prices.
- Legal copy from counsel (`lib/data/legal.ts`).
- Sinhala and Tamil translations.
- Coastal Ceylon's "brine fishing" is read as stilt fishing at Koggala; please confirm.
- Team profiles and photos for the About page.

The day-by-day reasoning behind the four trails is in `CTR_Trip_Planner_Reference.docx` in the project folder.
