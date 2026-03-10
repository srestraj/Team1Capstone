import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_DB_URI as string;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_DB_URI environment variable");
}

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Database connection failed");
  }
}
