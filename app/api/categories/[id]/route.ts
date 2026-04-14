import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

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

// update category 
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params; 
    const body = await req.json();
    const updated = await Category.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// delete category 
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params; 
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json({ message: "Category deleted" }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}