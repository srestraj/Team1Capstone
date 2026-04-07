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

export const fetchColors = async () => {
  try {
    const colors: string[] = await fetch(`${BASE_URL}/api/products/colors`, { cache: "no-store" })
      .then((res) => res.json());
    return colors;
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw error;
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Store JWT in browser
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// ✅ Register with JWT
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