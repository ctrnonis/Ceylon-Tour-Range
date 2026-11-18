import type { PhotoKey } from "@/lib/images";

/**
 * Copy for the coming-soon page. Draft wording based on the project brief;
 * the client should confirm the vision, mission and goals before launch.
 */
export const vision =
  "To be the way the world discovers Sri Lanka: trips planned by the people who know the island best, and booked in one place.";

export const mission =
  "We connect travellers with verified local guides, trusted drivers and family-run hotels, with fair prices and every booking supporting the communities that make the island special.";

export const goals = [
  {
    title: "One place for the whole journey",
    text: "Hotels, taxis, attractions and day-by-day plans, together instead of spread across a dozen apps.",
  },
  {
    title: "Local knowledge first",
    text: "Every place is added and checked by licensed Sri Lankan guides, so travellers find the real highlights.",
  },
  {
    title: "Fair and transparent",
    text: "Fixed taxi fares and clear prices agreed before you go. No surprises on the road.",
  },
  {
    title: "Travel that gives back",
    text: "Bookings go to local drivers, guides and family-run stays across all 25 districts.",
  },
];

export const features: { title: string; text: string; photo: PhotoKey }[] = [
  {
    title: "Themed trails",
    text: "Coastal, heritage, wild or modern: ready-made routes around what you love.",
    photo: "beachSunset",
  },
  {
    title: "Trip planner",
    text: "Build your trip day by day and share it with your travel group.",
    photo: "ellaTrain",
  },
  {
    title: "Hand-picked stays",
    text: "From tea-estate bungalows to beach cabanas, booked in a few taps.",
    photo: "teaBungalow",
  },
  {
    title: "Taxis with live tracking",
    text: "Airport pickups and island transfers with fixed fares.",
    photo: "resortPool",
  },
  {
    title: "Places locals love",
    text: "Temples, waterfalls, safaris and street food, verified by guides.",
    photo: "sigiriya",
  },
  {
    title: "Guides on the platform",
    text: "Local guides share hidden gems and grow their business with us.",
    photo: "stiltFishermen",
  },
];

export const gallery: { photo: PhotoKey; caption: string }[] = [
  { photo: "sigiriya", caption: "Sigiriya" },
  { photo: "ellaTrain", caption: "Ella" },
  { photo: "stiltFishermen", caption: "Koggala" },
  { photo: "teaBungalow", caption: "Nuwara Eliya" },
  { photo: "beachSunset", caption: "Mirissa" },
];
