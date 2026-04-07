import { NextResponse,NextRequest } from "next/server";
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
// 2. POST (Create Product)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Create the product in MongoDB
    const newProduct = await Product.create(body);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. PUT (Update via ?id=...)
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const body = await req.json();
    const updated = await Product.findByIdAndUpdate(id, body, { new: true });
    
    return NextResponse.json(updated);
  } catch (error: any) {
  console.error("DEBUG UPDATE ERROR:", error); 
  return NextResponse.json({ error: error.message }, { status: 500 });
}
}

// 4. DELETE (Delete via ?id=...)
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}