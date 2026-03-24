import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/app/models/Product";

export const fetchCache = "force-no-store";

const { MONGO_DB_URI } = process.env;

if (!MONGO_DB_URI) {
  throw new Error("Please add MONGO_DB_URI to environment variables");
}


async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_DB_URI as string);
  }
}

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Get products
 *     description: Returns products with optional filters
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of products
 */
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});

    return NextResponse.json(products, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error loading data from MongoDB", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
