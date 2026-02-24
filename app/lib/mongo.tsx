import mongoose from "mongoose";

export async function dbConnect() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI as string);
        return conn;
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        throw new Error( error as any);
    }
}
