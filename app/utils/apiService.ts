import { ProductType } from "./types/Product";

const { BASE_URL } = process.env;

export const fetchProducts = async () => {
  try {
    const products: ProductType[] = await fetch(`${BASE_URL}/api/products`, { cache: "no-store" })
    .then((res) => res.json());
    const sortedProducts = products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return sortedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}