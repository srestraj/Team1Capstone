"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  UserCircle,
  X,
  ChevronDown,
  Menu,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Type definitions
interface Credentials {
  email: string;
  password: string;
}

interface UserData {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export default function Navbar() {
  const router = useRouter(); // router hook
  const [showPromo, setShowPromo] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check login status on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const storedUserName = localStorage.getItem("userName");

      if (token && storedUserName) {
        setIsLoggedIn(true);
        setUserName(storedUserName);
      }
    };

    checkAuth();

    // Event listener for auth changes (custom event)
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (event?: React.SubmitEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!searchQuery.trim()) return;

    const params = new URLSearchParams(window.location.search);
    params.set("q", searchQuery);
    const url = `/shop?${params.toString()}`;

    router.replace(url);
    router.refresh();
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    // Update states
    setIsLoggedIn(false);
    setUserName("");
    setShowProfileDropdown(false);

    // Redirect to home
    router.push("/");
  };

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Example login handler with proper types
  const handleLogin = async (credentials: Credentials) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data: UserData = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);

        window.dispatchEvent(new Event("authChange"));

        router.push("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    // debounce
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (searchQuery.trim()) {
        params.set("q", searchQuery);
      } else {
        params.delete("q");
      }

      router.push(`/shop?${params.toString()}`, {
        scroll: false,
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

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
              <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full bg-gray-100 pl-12 pr-4 py-3 text-sm outline-none ring-1 ring-transparent focus:bg-white focus:ring-gray-300"
                />
              </form>
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

            {/* Profile Section - Desktop */}
            <div className="hidden md:block relative" ref={dropdownRef}>
              {isLoggedIn ? (
                // Logged In State - Show Name with Dropdown
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="inline-flex items-center gap-2 rounded-full pl-2 pr-3 py-1.5 hover:bg-gray-100 transition-colors"
                    aria-label="Profile menu"
                  >
                    {/* Avatar with initials */}
                    <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                      {getInitials(userName)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {userName.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform ${showProfileDropdown ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Hello, {userName}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {typeof window !== 'undefined' ? localStorage.getItem("userEmail") : ''}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>

                      <Link
                        href="/orders"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        My Orders
                      </Link>

                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>

                      <div className="border-t border-gray-100 mt-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Not Logged In State - Show Icon
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
                  aria-label="Login"
                >
                  <UserCircle className="h-5 w-5" />
                </Link>
              )}
            </div>

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
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full bg-gray-100 pl-12 pr-4 py-3 text-sm outline-none ring-1 ring-transparent focus:bg-white focus:ring-gray-300"
                  />
                </form>
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

              {/* Mobile Auth Section */}
              {isLoggedIn ? (
                <div className="space-y-3 pt-2 border-t">
                  <div className="flex items-center gap-3 px-2">
                    <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                      {getInitials(userName)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500">
                        {typeof window !== 'undefined' ? localStorage.getItem("userEmail") : ''}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-gray-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>

                  <Link
                    href="/orders"
                    className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-gray-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    My Orders
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}