import type { Location, LocationId } from "@/lib/types";

/**
 * Towns and hubs used across the site (attraction/hotel locations, taxi
 * pickup and drop-off, itinerary days). Coordinates are approximate town
 * centres.
 */
export const locations: Location[] = [
  { id: "cmb-airport", name: "Bandaranaike Intl. Airport (CMB)", district: "Gampaha", lat: 7.18, lng: 79.88 },
  { id: "colombo", name: "Colombo", district: "Colombo", lat: 6.93, lng: 79.85 },
  { id: "negombo", name: "Negombo", district: "Gampaha", lat: 7.21, lng: 79.84 },
  { id: "bentota", name: "Bentota", district: "Galle", lat: 6.42, lng: 80.0 },
  { id: "hikkaduwa", name: "Hikkaduwa", district: "Galle", lat: 6.14, lng: 80.1 },
  { id: "galle", name: "Galle", district: "Galle", lat: 6.03, lng: 80.22 },
  { id: "unawatuna", name: "Unawatuna", district: "Galle", lat: 6.01, lng: 80.25 },
  { id: "koggala", name: "Koggala", district: "Galle", lat: 5.99, lng: 80.33 },
  { id: "mirissa", name: "Mirissa", district: "Matara", lat: 5.95, lng: 80.46 },
  { id: "tangalle", name: "Tangalle", district: "Hambantota", lat: 6.02, lng: 80.79 },
  { id: "hambantota", name: "Hambantota", district: "Hambantota", lat: 6.12, lng: 81.12 },
  { id: "yala", name: "Yala (Tissamaharama)", district: "Hambantota", lat: 6.28, lng: 81.29 },
  { id: "udawalawe", name: "Udawalawe", district: "Ratnapura", lat: 6.47, lng: 80.89 },
  { id: "ella", name: "Ella", district: "Badulla", lat: 6.87, lng: 81.05 },
  { id: "haputale", name: "Haputale", district: "Badulla", lat: 6.77, lng: 80.96 },
  { id: "nuwara-eliya", name: "Nuwara Eliya", district: "Nuwara Eliya", lat: 6.95, lng: 80.79 },
  { id: "kandy", name: "Kandy", district: "Kandy", lat: 7.29, lng: 80.63 },
  { id: "kitulgala", name: "Kitulgala", district: "Kegalle", lat: 6.99, lng: 80.42 },
  { id: "dambulla", name: "Dambulla", district: "Matale", lat: 7.86, lng: 80.65 },
  { id: "sigiriya", name: "Sigiriya", district: "Matale", lat: 7.95, lng: 80.76 },
  { id: "polonnaruwa", name: "Polonnaruwa", district: "Polonnaruwa", lat: 7.94, lng: 81.0 },
  { id: "anuradhapura", name: "Anuradhapura", district: "Anuradhapura", lat: 8.31, lng: 80.4 },
  { id: "trincomalee", name: "Trincomalee", district: "Trincomalee", lat: 8.59, lng: 81.21 },
  { id: "arugam-bay", name: "Arugam Bay", district: "Ampara", lat: 6.84, lng: 81.83 },
  { id: "knuckles", name: "Knuckles Range", district: "Matale", lat: 7.45, lng: 80.79 },
];

const byId = new Map(locations.map((location) => [location.id, location]));

export function getLocation(id: LocationId): Location {
  const location = byId.get(id);
  if (!location) throw new Error(`Unknown location: ${id}`);
  return location;
}

/** Distinct districts, sorted, for filter and form dropdowns. */
export const districts = [...new Set(locations.map((location) => location.district))].sort();
