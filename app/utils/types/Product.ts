import { Document, Types } from "mongoose";

export interface ProductDocument extends Document {
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
  slug?: string;
  createdAt: Date;
}

export type ProductType = {
  _id?: string;
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
  slug?: string;
  createdAt: Date;
}

export type StarType = {
  classNames?: string;
  title: string;
  primaryFill?: string;
  secondaryFill?: string | null;
}

export type IconType = {
  classNames?: string;
}

export type SearchProps = {
  searchParams: {
    q?: string;
    category?: string;
    subcategory?: string;
    minPrice?: string;
    maxPrice?: string;
    color?: string;
  }
}

export type Category = {
  _id: string;
  title: string;
  subcategories: string[];
};