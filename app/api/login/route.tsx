import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/app/lib/mongo";
import User from "@/app/model/user-model";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    await dbConnect();

    // 1. Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // This is the error message you wanted
      return NextResponse.json(
        { message: "Email address does not match" }, 
        { status: 401 }
      );
    }

    // 2. Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // This is the error message you wanted
      return NextResponse.json(
        { message: "Password does not match" }, 
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};