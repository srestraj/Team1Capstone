import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const fetchCache = "force-no-store";

const { MONGO_DB_URI } = process.env;
if (!MONGO_DB_URI) {
  throw new Error("Please add MONGO_DB_URI to environment variables");
}

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  subcategories: { type: [String], default: [] },
});

const Category =
  mongoose.models.Category ||
  mongoose.model("Category", categorySchema, "categories");

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_DB_URI as string);
  }
}

// GET all categories
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({});
    return NextResponse.json(categories, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// create new category
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const category = await Category.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}