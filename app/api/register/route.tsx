import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import createUser from "@/app/model/user-model";
import { dbConnect } from "@/app/lib/mongo";
import { registerSchema } from "@/app/lib/zod"; // Import the Zod schema for registration validation

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    console.log("Received registration data:", body);
    
    // Validate with Zod
    const validation = registerSchema.safeParse(body);
    
    if (!validation.success) {
      // Send the whole errors array so the frontend can map it to fields
      return NextResponse.json(
        { 
          message: "Validation failed", 
          errors: validation.error.flatten().fieldErrors 
        }, 
        { status: 400 }
      );
    }

    const { firstName, lastName, email, address, password } = validation.data;

    await dbConnect();

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser.create({
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
    console.error("Registration error", err);

    if (err.code === 11000) {
      console.error("Duplicate email error:", err);
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};