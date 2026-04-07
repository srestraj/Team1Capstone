"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerSchema } from "@/app/lib/zod";
import { registerUser } from "@/app/utils/apiService";


export default function RegisterPage() {
  const router = useRouter();

  // State for individual field errors (Zod)
  const [errors, setErrors] = useState<Record<string, string>>({});
  // State for general server errors (Database/Network)
  const [serverError, setServerError] = useState("");
  // State for loading status
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setServerError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    // 1. Client-side Validation using Zod
    const validation = registerSchema.safeParse(values);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        const path = err.path[0] as string;
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }
    try {
      const response = await registerUser(validation.data);
      // console.log("Server Response:", response); // Look at your browser console (F12)
      router.push("/login"); 
    } catch (error: any) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setServerError(error.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-4 font-sans">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-lg space-y-4 rounded-2xl p-8 shadow-xl border-2 bg-white border-neutral-200"
      >
        <h1 className="text-3xl font-bold text-black text-center mb-6">Create Account</h1>

        {/* Global Error Alert */}
        {serverError && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm text-center font-medium">
            {serverError}
          </div>
        )}

        {/* First Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black px-1" htmlFor="firstName">First Name</label>
          <input
            className={`w-full rounded-full bg-neutral-50 px-4 py-2.5 border transition focus:outline-none text-black ${errors.firstName ? "border-red-500" : "border-neutral-300 focus:border-black"
              }`}
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          {errors.firstName && <p className="text-red-500 text-xs pl-4 font-medium">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black px-1" htmlFor="lastName">Last Name</label>
          <input
            className={`w-full rounded-full bg-neutral-50 px-4 py-2.5 border transition focus:outline-none text-black ${errors.lastName ? "border-red-500" : "border-neutral-300 focus:border-black"
              }`}
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
          {errors.lastName && <p className="text-red-500 text-xs pl-4 font-medium">{errors.lastName}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black px-1" htmlFor="email">Email Address</label>
          <input
            className={`w-full rounded-full bg-neutral-50 px-4 py-2.5 border transition focus:outline-none text-black ${errors.email ? "border-red-500" : "border-neutral-300 focus:border-black"
              }`}
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs pl-4 font-medium">{errors.email}</p>}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black px-1" htmlFor="address">Address</label>
          <input
            className={`w-full rounded-full bg-neutral-50 px-4 py-2.5 border transition focus:outline-none text-black ${errors.address ? "border-red-500" : "border-neutral-300 focus:border-black"
              }`}
            id="address"
            name="address"
            type="text"
            placeholder="address"
          />
          {errors.address && <p className="text-red-500 text-xs pl-4 font-medium">{errors.address}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black px-1" htmlFor="password">Password</label>
          <input
            className={`w-full rounded-full bg-neutral-50 px-4 py-2.5 border transition focus:outline-none text-black ${errors.password ? "border-red-500" : "border-neutral-300 focus:border-black"
              }`}
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"

          />
          {errors.password && <p className="text-red-500 text-xs pl-4 font-medium">{errors.password}</p>}
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="mt-4 block w-full rounded-full bg-black text-white hover:bg-neutral-800 disabled:bg-gray-400 transition px-12 py-3 text-base font-semibold shadow-md active:scale-95"
          type="submit"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}