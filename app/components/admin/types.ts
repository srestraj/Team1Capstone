// components/admin/types.ts
export type Product = {
  _id: string;
  title: string;
  price: number;
  description?: string;
  category?: string;
  subCategory?: string;
  thumbnail?: string;
  stock?: number;
  discountPercentage?: number;
  currencyCode?: string;
  slug?: string;
};
export type Category = {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  icon?: string;
  subcategories?: string[];
};

export type View = 'list' | 'form'| 'categories';