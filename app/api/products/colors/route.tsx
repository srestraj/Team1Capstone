import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/app/models/Product";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
  }
}

export async function GET() {
  try {
    await connectDB();

    // Get unique colors from array field
    const colors = await Product.distinct("colors");

    return NextResponse.json(colors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load colors" }, { status: 500 });
  }
}