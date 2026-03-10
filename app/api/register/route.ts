import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/app/lib/mongo";
import User from "@/app/model/user-model";
import { registerSchema } from "@/app/lib/zod";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    // 1. Validate incoming data with Zod
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, address, password } = validation.data;

    // 2. Connect to MongoDB
    await dbConnect();

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the user in DB
    await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      address,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Registration error:", err);

    // Handle duplicate email
    if (err.code === 11000) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
};
