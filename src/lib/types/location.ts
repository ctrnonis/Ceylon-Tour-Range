/** A point on the island. Coordinates drive map pins and taxi distance estimates. */
export interface Coordinates {
  lat: number;
  lng: number;
}

export type LocationId =
  | "cmb-airport"
  | "colombo"
  | "negombo"
  | "bentota"
  | "hikkaduwa"
  | "galle"
  | "unawatuna"
  | "koggala"
  | "mirissa"
  | "tangalle"
  | "hambantota"
  | "yala"
  | "udawalawe"
  | "ella"
  | "haputale"
  | "nuwara-eliya"
  | "kandy"
  | "kitulgala"
  | "dambulla"
  | "sigiriya"
  | "polonnaruwa"
  | "anuradhapura"
  | "trincomalee"
  | "arugam-bay"
  | "knuckles";

export interface Location extends Coordinates {
  id: LocationId;
  name: string;
  district: string;
}
