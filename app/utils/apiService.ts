import { ProductType } from "./types/Product";

const { BASE_URL } = process.env;

export const fetchProducts = async () => {
  try {
    const products: ProductType[] = await fetch(`${BASE_URL}/api/products`, { cache: "no-store" })
    .then((res) => res.json());
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}