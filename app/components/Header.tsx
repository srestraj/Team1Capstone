"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [showPromo, setShowPromo] = useState(true);

  return (
    <header className="w-full border-b border-gray-200 bg-white">

      {/* Promo Bar */}
      {showPromo && (
        <div className="bg-black text-white text-center text-sm py-2 relative">
          <p>
            Sign up and get 20% off to your first order.
            <Link href="/register" className="underline font-semibold ml-1">
              Sign Up Now
            </Link>
          </p>

          <button
            onClick={() => setShowPromo(false)}
            className="absolute right-5 top-2 text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Left */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black">
            SHOP.CO
          </Link>

          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/shop">Shop</Link>
            <Link href="/on-sale">On Sale</Link>
            <Link href="/new-arrivals">New Arrivals</Link>
            <Link href="/brands">Brands</Link>
          </nav>
        </div>

        {/* Center Search */}
        <div className="flex-1 mx-10">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full h-11 rounded-full bg-gray-100 px-6 text-sm focus:outline-none"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-6 text-xl">
          <Link href="/cart">🛒</Link>
          <Link href="/login">👤</Link>
        </div>

      </div>
    </header>
  );
}
