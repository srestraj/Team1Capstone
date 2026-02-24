import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectDB } from "@/app/utils/db";
import { ProductType } from "@/app/utils/types/Product";

export const fetchCache = "force-no-store";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const product: ProductType = await request.json();

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
