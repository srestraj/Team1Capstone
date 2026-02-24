"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema } from "@/app/lib/zod"; // Import from your central file

export default function LoginPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setServerError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    // 1. Validate using the exported loginSchema
    const validation = loginSchema.safeParse(values);

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
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/"); // Redirect to home on success
      } else {
        // 2. This catches "Email address does not match" or "Password does not match"
        setServerError(data.message);
      }
    } catch (error) {
      setServerError("An error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-4 font-sans text-black">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-lg space-y-4 rounded-2xl p-8 shadow-xl border-2 bg-white border-neutral-200"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

        {/* Server Error Message (Credential mismatch) */}
        {serverError && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm text-center font-medium">
            {serverError}
          </div>
        )}

        {/* Email Address */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold px-1" htmlFor="email">Email Address</label>
          <input
            className={`w-full rounded-full bg-neutral-50 px-4 py-2.5 border transition focus:outline-none ${
              errors.email ? "border-red-500" : "border-neutral-300 focus:border-black"
            }`}
            id="email"
            name="email"
            type="email"
            placeholder="name@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs pl-4 font-medium">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold px-1" htmlFor="password">Password</label>
          <input
            className={`w-full rounded-full bg-neutral-50 px-4 py-2.5 border transition focus:outline-none ${
              errors.password ? "border-red-500" : "border-neutral-300 focus:border-black"
            }`}
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-xs pl-4 font-medium">{errors.password}</p>}
        </div>

        <button
          disabled={loading}
          className="mt-4 block w-full rounded-full bg-black text-white hover:bg-neutral-800 disabled:bg-gray-400 transition px-12 py-3 text-base font-semibold shadow-md active:scale-95"
          type="submit"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}