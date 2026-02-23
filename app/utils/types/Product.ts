export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  currencyCode: string;
  discountPercentage: number;
  images: string[];
  thumbnail: string;
  gender: 'M' | 'F' | 'U';
  category: string;
  subCategory: string;
  averageRating: number;
  numberOfReviews: number;
  stock: number;
  colors: string[];
  sizes: string[];
}