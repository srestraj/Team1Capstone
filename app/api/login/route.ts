import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/app/lib/mongo";
import User from "@/app/model/user-model";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    // 1. Connect to MongoDB
    await dbConnect();

    // 2. Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { message: "Email address does not match" },
        { status: 401 }
      );
    }

    // 3. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Password does not match" },
        { status: 401 }
      );
    }

    // 4. Login successful
    return NextResponse.json({ message: "Login successful" }, { status: 200 });

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
