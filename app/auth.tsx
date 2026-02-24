import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/model/user-model";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/app/lib/mongo"; // Ensure DB is connected

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",  
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // 1. Connect to DB
          await dbConnect();

          // 2. Find User
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this email.");
          }

          // 3. Check Password
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isMatch) {
            throw new Error("Invalid password.");
          }

          // 4. Return user object (NextAuth expects an object)
          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
          };
        } catch (error: any) {
          // Re-throw the error so NextAuth can catch it
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", 
  },
});