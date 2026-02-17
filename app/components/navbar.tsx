"use client";

import Link from "next/link";
import {
  Search,
  ShoppingCart,
  UserCircle,
  X,
  ChevronDown,
  Menu,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [showPromo, setShowPromo] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top promo bar */}
      {showPromo && (
        <div className="bg-black text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 text-xs sm:text-sm relative">
            <p className="text-center">
              Sign up and get 20% off to your first order.{" "}
              <Link href="/register" className="underline font-medium">
                Sign Up Now
              </Link>
            </p>

            <button
              onClick={() => setShowPromo(false)}
              className="absolute right-4 inline-flex items-center justify-center rounded p-1 hover:bg-white/10"
              aria-label="Close promo"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main navbar */}
      <div className="bg-white border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            SHOP.CO
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 hover:text-black"
            >
              Shop <ChevronDown className="h-4 w-4" />
            </Link>
            <Link href="/sale" className="hover:text-black">
              On Sale
            </Link>
            <Link href="/new" className="hover:text-black">
              New Arrivals
            </Link>
            <Link href="/brands" className="hover:text-black">
              Brands
            </Link>
          </nav>

          {/* Search (desktop center) */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full rounded-full bg-gray-100 pl-12 pr-4 py-3 text-sm outline-none ring-1 ring-transparent focus:bg-white focus:ring-gray-300"
              />
            </div>
          </div>

          {/* Right icons */}
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <Link
              href="/cart"
              className="inline-flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
              aria-label="Profile"
            >
              <UserCircle className="h-5 w-5" />
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown panel */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4 space-y-4">
              {/* Mobile search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full rounded-full bg-gray-100 pl-12 pr-4 py-3 text-sm outline-none ring-1 ring-transparent focus:bg-white focus:ring-gray-300"
                />
              </div>

              {/* Mobile nav links */}
              <nav className="grid gap-2 text-sm text-gray-700">
                <Link
                  href="/shop"
                  className="flex items-center justify-between rounded-md px-2 py-2 hover:bg-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>Shop</span>
                  <ChevronDown className="h-4 w-4" />
                </Link>

                <Link
                  href="/sale"
                  className="rounded-md px-2 py-2 hover:bg-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  On Sale
                </Link>

                <Link
                  href="/new"
                  className="rounded-md px-2 py-2 hover:bg-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  New Arrivals
                </Link>

                <Link
                  href="/brands"
                  className="rounded-md px-2 py-2 hover:bg-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  Brands
                </Link>
              </nav>

              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="flex-1 rounded-md bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-black"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex-1 rounded-md bg-gray-100 px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
