"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginSchema } from "@/app/lib/zod";
import { loginUser } from "@/app/utils/apiService";

export default function LoginPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setServerError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

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
      await loginUser(validation.data.email, validation.data.password);
      router.push("/");
    } catch (error: any) {
      setServerError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg space-y-4 rounded-2xl p-8 shadow-xl border-2 bg-white border-neutral-200">
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
        {serverError && <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm text-center">{serverError}</div>}

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={`border rounded-full px-4 py-2 ${errors.email ? "border-red-500" : "border-neutral-300"}`} />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className={`border rounded-full px-4 py-2 ${errors.password ? "border-red-500" : "border-neutral-300"}`} />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

        <button disabled={loading} type="submit" className="w-full rounded-full bg-black text-white py-3">{loading ? "Signing In..." : "Sign In"}</button>

        <p className="text-center mt-4">Don't have an account? <Link href="/register" className="text-indigo-600">Register</Link></p>
      </form>
    </div>
  );
}
