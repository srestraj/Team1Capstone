import { NextRequest, NextResponse } from "next/server";
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
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const url = request.url;
    const { searchParams } = new URL(url);

    const category: string | null = searchParams.get("category") || null;
    const minPrice: number | null = parseInt(searchParams.get("minPrice") as string) || null;
    const maxPrice: number | null = parseInt(searchParams.get("maxPrice") as string) || null;
    const colorParam = searchParams.get("color");

    const colors: string[] | null = colorParam
      ? colorParam
        .split(",")
        .map(c => decodeURIComponent(c).toLowerCase())
        .filter(Boolean)
      : null;

    const query: any = {};

    if (category) {
      query.category = category;
    }

    if (colors && colors.length > 0) {
      query.colors = { $in: colors };
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    const products = await Product.find(query);

    return NextResponse.json(products, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error loading data from MongoDB", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
