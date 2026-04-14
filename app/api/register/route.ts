import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/app/lib/mongo";
import jwt from "jsonwebtoken";
import User from "@/app/model/user-model";
import { registerSchema } from "@/app/lib/zod";

const JWT_SECRET = process.env.JWT_SECRET; // Ensure you have this in your .env file, e.g. JWT_SECRET

/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account and returns a JWT token upon successful registration.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - address
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               address:
 *                 type: string
 *                 example: 123 Main St, Toronto, ON
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: array
 *                     items:
 *                       type: string
 *                   example:
 *                     email:
 *                       - Invalid email format
 *                     password:
 *                       - Password must be at least 8 characters
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email already exists
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
export const POST = async (req: NextRequest) => {
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
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      address,
      password: hashedPassword,
    });

    // 5. Generate JWT
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, name: `${user.firstName} ${user.lastName}` },
      JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // 6. Return token and message
    return NextResponse.json(
      { message: "User registered successfully", token },
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
