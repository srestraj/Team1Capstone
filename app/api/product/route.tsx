import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const fetchCache = "force-no-store";

const { MONGO_DB_URI } = process.env;

if (!MONGO_DB_URI) {
  throw new Error("Please add MONGO_DB_URI to environment variables");
}

const productSchema = new mongoose.Schema({}, { strict: false });
const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema, "products");

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_DB_URI as string);
  }
}

export async function POST() {
  try {
    await connectDB();
    const newProduct = new Product({
      title: "Test Product",
      description: "This is a test product",
      price: 19.99,
      currencyCode: "USD",
      discountPercentage: 0,
      images: ["https://example.com/image.jpg"],
      thumbnail: "https://example.com/thumbnail.jpg",
      gender: "U",
      category: "Test Category",
      subCategory: "Test Subcategory",
      averageRating: 0,
      numberOfReviews: 0,
      stock: 100,
      colors: ["Red", "Blue"],
      sizes: ["S", "M", "L"],
    });
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
