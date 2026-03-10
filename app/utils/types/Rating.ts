export type Rating = {
  rating: number;
  readonly?: boolean;
  updateRating?: (newRating: number) => void;
}