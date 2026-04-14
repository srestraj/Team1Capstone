// app/api/users/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/mongo";
import User from "@/app/model/user-model";

export async function GET() {
  try {
    // 1. Connect to the database
    await dbConnect();

    // 2. Fetch all users
    const users = await User.find({}).select("-password");

    // 3. Return the data
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching users", error: error.message },
      { status: 500 }
    );
  }
}