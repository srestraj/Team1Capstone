// app/admin/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import AdminDashboard from "../components/admin/AdminDashboard";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return <div>Loading...</div>;
  }

  return (
    <div>
<AdminDashboard/>
      <p>Welcome {user.name}</p>
    </div>
  );
}