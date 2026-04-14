import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectDB } from "@/app/utils/db";
import { ProductType } from "@/app/utils/types/Product";

export const fetchCache = "force-no-store";

/**
 * @openapi
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product in the database.
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       description: Product object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - currencyCode
 *               - category
 *               - stock
 *             properties:
 *               title:
 *                 type: string
 *                 description: Product title
 *               description:
 *                 type: string
 *                 description: HTML description of the product
 *               price:
 *                 type: number
 *                 description: Product price
 *               currencyCode:
 *                 type: string
 *                 description: Currency code
 *               discountPercentage:
 *                 type: number
 *                 description: Discount percentage applied to product
 *               images:
 *                 type: array
 *                 description: Product image URLs
 *                 items:
 *                   type: string
 *               thumbnail:
 *                 type: string
 *                 description: Thumbnail image URL
 *               gender:
 *                 type: string
 *                 description: Target gender
 *                 enum: [M, F, U]
 *               category:
 *                 type: string
 *                 description: Product category
 *               subCategory:
 *                 type: string
 *                 description: Product subcategory
 *               averageRating:
 *                 type: number
 *                 description: Average rating of product
 *               numberOfReviews:
 *                 type: integer
 *                 description: Total number of reviews
 *               stock:
 *                 type: integer
 *                 description: Available inventory count
 *               colors:
 *                 type: array
 *                 description: Available color hex codes
 *               sizes:
 *                 type: array
 *                 description: Available product sizes
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Failed to create product
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const product: ProductType = await request.json();

    if (!product.averageRating) {
      product.averageRating = 0;
    }
    if (!product.numberOfReviews) {
      product.numberOfReviews = 0;
    }
    if (!product.colors) {
      product.colors = [];
    }
    if (!product.sizes) {
      product.sizes = ["M", "L", "XL"];
    }
    if (!product.discountPercentage) {
      product.discountPercentage = 0;
    }
    if (!product.currencyCode) {
      product.currencyCode = "CAD";
    }
    if (!product.stock) {
      product.stock = 99;
    }
    if (!product.images || product.images.length === 0) {
      product.images = [];
    }

    const newProduct = new Product(product);
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

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get slug from query params
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    const product: ProductType | null = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);

    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
