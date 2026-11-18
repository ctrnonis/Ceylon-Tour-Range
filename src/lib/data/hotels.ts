import type { Amenity, Hotel } from "@/lib/types";

/**
 * Hotels directory (sample content). Prices are per room per night in USD.
 * In the backend phase availability and pricing come from the hotel data
 * provider; this file only fixes the shape.
 */
export const amenityLabels: Record<Amenity, string> = {
  pool: "Pool",
  spa: "Spa",
  breakfast: "Breakfast included",
  wifi: "Free Wi-Fi",
  parking: "Free parking",
  "mountain-view": "Mountain views",
  beachfront: "Beachfront",
  "air-conditioning": "Air conditioning",
  "airport-pickup": "Airport pickup",
  garden: "Garden",
  "pet-friendly": "Pet friendly",
  restaurant: "Restaurant",
  fireplace: "Fireplace",
  eco: "Eco lodge",
};

/** Taxes and service charge applied at checkout. Placeholder rate. */
export const HOTEL_TAX_RATE = 0.12;

export const hotels: Hotel[] = [
  {
    slug: "ella-ridge-resort",
    name: "Ella Ridge Resort & Spa",
    location: "ella",
    locationNote: "0.8 km from Nine Arch Bridge",
    description:
      "A hillside resort with an infinity pool facing Ella Gap. Rooms open onto private balconies over the valley, and the Ayurveda spa uses herbs from the resort's own garden.",
    photo: "resortPool",
    gallery: ["resortPool", "teaBungalow", "lagoonVilla", "mountains", "beachSunset"],
    rating: 4.8,
    reviewCount: 642,
    amenities: ["pool", "spa", "breakfast", "wifi", "parking", "mountain-view", "garden", "pet-friendly"],
    guidesPick: true,
    coordinates: { lat: 6.874, lng: 81.052 },
    rooms: [
      {
        id: "deluxe-valley",
        name: "Deluxe Valley View",
        bed: "King bed",
        sizeM2: 32,
        sleeps: 2,
        features: ["Balcony", "Rain shower"],
        priceUsdPerNight: 86,
        photo: "teaBungalow",
        freeCancellationDays: 2,
      },
      {
        id: "ridge-suite",
        name: "Ridge Suite + Plunge Pool",
        bed: "King bed",
        sizeM2: 58,
        sleeps: 3,
        features: ["Private pool", "Lounge"],
        priceUsdPerNight: 154,
        photo: "lagoonVilla",
        remaining: 1,
      },
    ],
    reviews: [
      {
        author: "Marco T.",
        country: "Italy",
        rating: 5,
        date: "2026-07-30",
        text: "Woke up to clouds rolling through the valley. Staff arranged our Little Adam's Peak hike before breakfast.",
      },
      {
        author: "Priya N.",
        country: "India",
        rating: 4,
        date: "2026-06-11",
        text: "Gorgeous pool and very kind staff. The road up is steep, so take the hotel's tuk-tuk from town.",
      },
    ],
  },
  {
    slug: "koggala-lagoon-villa",
    name: "Koggala Lagoon Villa",
    location: "koggala",
    locationNote: "Beachfront, 20 min from Galle Fort",
    description:
      "A small villa between the lagoon and the ocean, with breakfast on the beach and boat trips to the cinnamon island. Five rooms, so it rarely feels busy.",
    photo: "lagoonVilla",
    gallery: ["lagoonVilla", "beachSunset", "stiltFishermen", "resortPool", "teaBungalow"],
    rating: 4.6,
    reviewCount: 318,
    amenities: ["beachfront", "air-conditioning", "airport-pickup", "breakfast", "wifi", "restaurant"],
    coordinates: { lat: 5.99, lng: 80.33 },
    rooms: [
      {
        id: "beachfront",
        name: "Beachfront Room",
        bed: "Queen bed",
        sizeM2: 28,
        sleeps: 2,
        features: ["Sea view", "Terrace"],
        priceUsdPerNight: 124,
        photo: "lagoonVilla",
        freeCancellationDays: 3,
        remaining: 2,
      },
      {
        id: "lagoon-suite",
        name: "Lagoon Family Suite",
        bed: "King + twin beds",
        sizeM2: 46,
        sleeps: 4,
        features: ["Lagoon view", "Kitchenette"],
        priceUsdPerNight: 168,
        photo: "resortPool",
        freeCancellationDays: 3,
      },
    ],
    reviews: [
      {
        author: "Lena T.",
        country: "Germany",
        rating: 5,
        date: "2026-03-09",
        text: "Watched the stilt fishermen from our terrace every morning. Pure magic.",
      },
    ],
  },
  {
    slug: "tea-trails-bungalow",
    name: "Tea Trails Bungalow",
    location: "nuwara-eliya",
    locationNote: "Plantation estate, 15 min from town",
    description:
      "A restored 1920s planter's bungalow on a working tea estate. Full board with a private butler, log fires in the evening and guided walks through the plantation.",
    photo: "teaBungalow",
    gallery: ["teaBungalow", "mountains", "resortPool", "lagoonVilla", "ellaTrain"],
    rating: 4.9,
    reviewCount: 207,
    amenities: ["fireplace", "breakfast", "garden", "wifi", "parking", "mountain-view", "restaurant"],
    guidesPick: true,
    coordinates: { lat: 6.96, lng: 80.77 },
    rooms: [
      {
        id: "planter",
        name: "Planter's Room",
        bed: "King bed",
        sizeM2: 36,
        sleeps: 2,
        features: ["Fireplace", "Full board"],
        priceUsdPerNight: 210,
        photo: "teaBungalow",
        freeCancellationDays: 7,
      },
    ],
    reviews: [],
  },
  {
    slug: "kandy-lake-hotel",
    name: "Kandy Lake Hotel",
    location: "kandy",
    locationNote: "5 min walk to the Temple of the Tooth",
    description:
      "A comfortable city hotel on the lake promenade with a rooftop restaurant. The best-value base for the Temple of the Tooth and the botanical gardens.",
    photo: "resortPool",
    gallery: ["resortPool", "ellaTrain", "teaBungalow"],
    rating: 4.3,
    reviewCount: 892,
    amenities: ["wifi", "air-conditioning", "restaurant", "breakfast"],
    coordinates: { lat: 7.292, lng: 80.64 },
    rooms: [
      {
        id: "standard-lake",
        name: "Standard Lake View",
        bed: "Double bed",
        sizeM2: 24,
        sleeps: 2,
        features: ["Lake view"],
        priceUsdPerNight: 48,
        photo: "teaBungalow",
        freeCancellationDays: 1,
      },
      {
        id: "family",
        name: "Family Room",
        bed: "Double + twin beds",
        sizeM2: 34,
        sleeps: 4,
        features: ["City view"],
        priceUsdPerNight: 72,
        photo: "resortPool",
        freeCancellationDays: 1,
      },
    ],
    reviews: [],
  },
  {
    slug: "sigiriya-jungle-lodge",
    name: "Sigiriya Jungle Lodge",
    location: "sigiriya",
    locationNote: "Rock views, 3 km from the entrance",
    description:
      "Solar-powered cabins on stilts in the forest, with a natural pool and views of Sigiriya from the dining deck. Bicycles are free for getting to the rock.",
    photo: "mountains",
    gallery: ["mountains", "sigiriya", "resortPool"],
    rating: 4.7,
    reviewCount: 455,
    amenities: ["eco", "pool", "breakfast", "garden", "parking"],
    coordinates: { lat: 7.94, lng: 80.74 },
    rooms: [
      {
        id: "cabin",
        name: "Jungle Cabin",
        bed: "Queen bed",
        sizeM2: 26,
        sleeps: 2,
        features: ["Outdoor shower", "Deck"],
        priceUsdPerNight: 42,
        photo: "mountains",
        freeCancellationDays: 2,
      },
    ],
    reviews: [],
  },
  {
    slug: "mirissa-bay-cabanas",
    name: "Mirissa Bay Cabanas",
    location: "mirissa",
    locationNote: "On the beach, 10 min walk to the harbour",
    description:
      "Simple timber cabanas a few steps from the sand, with hammocks, a beach bar and early breakfast before whale-watching boats leave the harbour.",
    photo: "beachSunset",
    gallery: ["beachSunset", "lagoonVilla", "stiltFishermen"],
    rating: 4.4,
    reviewCount: 266,
    amenities: ["beachfront", "breakfast", "wifi", "eco"],
    coordinates: { lat: 5.946, lng: 80.46 },
    rooms: [
      {
        id: "cabana",
        name: "Beach Cabana",
        bed: "Double bed",
        sizeM2: 20,
        sleeps: 2,
        features: ["Fan", "Hammock"],
        priceUsdPerNight: 38,
        photo: "beachSunset",
        freeCancellationDays: 2,
      },
    ],
    reviews: [],
  },
];

export function getHotel(slug: string): Hotel | undefined {
  return hotels.find((hotel) => hotel.slug === slug);
}

/** Cheapest room rate, shown as "from" price on cards. */
export function lowestRate(hotel: Hotel): number {
  return Math.min(...hotel.rooms.map((room) => room.priceUsdPerNight));
}

export interface StayPrice {
  nights: number;
  subtotal: number;
  taxes: number;
  total: number;
}

/** Price breakdown for a stay. Kept here so details, checkout and dashboard agree. */
export function priceStay(nightlyRate: number, nights: number): StayPrice {
  const subtotal = nightlyRate * nights;
  const taxes = Math.round(subtotal * HOTEL_TAX_RATE);
  return { nights, subtotal, taxes, total: subtotal + taxes };
}
