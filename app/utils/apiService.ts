import { ProductType } from "./types/Product";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;

  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
}) => {
  try {
    const response = await fetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw data; // return validation errors or duplicate email
    }

    return data;

  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
