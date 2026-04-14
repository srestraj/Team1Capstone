import { ProductType } from "./types/Product";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchProducts = async (queryString?: string) => {
  try {
    const products: ProductType[] = await fetch(`${BASE_URL}/api/products${queryString ? `?${queryString}` : ''}`, { cache: "no-store" })
      .then((res) => res.json());
    const sortedProducts = products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return sortedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export const fetchColors = async () => {
  try {
    const colors: string[] = await fetch(`${BASE_URL}/api/products/colors`, { cache: "no-store" })
      .then((res) => res.json());
    return colors;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};


export const fetchSingleProduct = async (slug: string) => {
  try {
    const product: ProductType = await fetch(`${BASE_URL}/api/product?slug=${slug}`)
      .then((res) => res.json());
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }

}

export const loginUser = async (email: string, password: string) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
  
  return res.json(); // Returns { message, token }
};

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw data; // validation errors or duplicate email
    }

    // Store JWT in browser
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Optional: helper to get JWT
export const getToken = () => {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
};

export const fetchCategories = async () => {
  try {
    const categories = await fetch(`${BASE_URL}/api/categories`, { cache: "no-store" })
      .then((res) => res.json());
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}