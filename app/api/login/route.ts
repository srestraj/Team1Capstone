import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/app/lib/mongo";
import jwt from "jsonwebtoken";
import User from "@/app/model/user-model";

const JWT_SECRET = process.env.JWT_SECRET ;

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    // 1. Connect to MongoDB
    await dbConnect();

    // 2. Find user
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

    // 4. Create JWT token
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, name: `${user.firstName} ${user.lastName}` },
      JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // 5. Return JWT in response
    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
