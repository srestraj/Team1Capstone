// components/admin/types.ts
export type Product = {
  _id: string;
  title: string;
  price: number;
  description?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
  stock?: number;
  discountPercentage?: number;
  currencyCode?: string;
  slug?: string;
};

export type View = 'list' | 'form';