export interface Review {
  author: string;
  country?: string;
  rating: number;
  /** ISO date */
  date: string;
  text: string;
}
