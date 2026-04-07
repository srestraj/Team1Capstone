// app/cart/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Trash2, 
  Minus, 
  Plus, 
  Tag,
  ArrowRight,
  Mail,
  ChevronDown
} from 'lucide-react';

// Types
interface CartItem {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

// Social Icons Components
const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Gradient Graphic T-shirt',
      size: 'Large',
      color: 'White',
      price: 145,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Checkered Shirt',
      size: 'Medium',
      color: 'Red',
      price: 180,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Skinny Fit Jeans',
      size: 'Large',
      color: 'Blue',
      price: 240,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop'
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal * 0.20;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-xs sm:text-sm relative">
        <span>Sign up and get 20% off to your first order. </span>
        <button className="underline font-medium">Sign Up Now</button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold tracking-tight">SHOP.CO</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium hover:text-gray-600">
                  Shop <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <a href="#" className="text-sm font-medium hover:text-gray-600">On Sale</a>
              <a href="#" className="text-sm font-medium hover:text-gray-600">New Arrivals</a>
              <a href="#" className="text-sm font-medium hover:text-gray-600">Brands</a>
            </nav>

            {/* Search & Icons */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search for products..." 
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>
              <button className="md:hidden">
                <Search className="w-6 h-6" />
              </button>
              <button>
                <ShoppingCart className="w-6 h-6" />
              </button>
              <button>
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-3">
              <button className="flex items-center justify-between w-full py-2">
                <span className="font-medium">Shop</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <a href="#" className="block py-2 font-medium">On Sale</a>
              <a href="#" className="block py-2 font-medium">New Arrivals</a>
              <a href="#" className="block py-2 font-medium">Brands</a>
            </div>
          </div>
        )}
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-900">Home</a>
          <span>&gt;</span>
          <span className="text-gray-900">Cart</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight">Your Cart</h2>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-7 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 pb-6 border-b">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                      <p className="text-sm text-gray-500">Color: {item.color}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold">${item.price}</span>
                    
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount (-20%)</span>
                  <span className="font-medium text-red-500">-${discount.toFixed(0)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">${deliveryFee}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-bold">${total.toFixed(0)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6 flex gap-2">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Add promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 text-sm outline-none focus:border-black"
                  />
                </div>
                <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                  Apply
                </button>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-black text-white py-4 rounded-full font-medium mt-4 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                Go to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-black rounded-2xl p-6 sm:p-12 text-white">
          <div className="md:flex md:items-center md:justify-between gap-8">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase leading-tight md:max-w-md">
              Stay upto date about our latest offers
            </h2>
            
            <div className="mt-6 md:mt-0 md:w-80 space-y-3">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-black text-sm outline-none"
                />
              </div>
              <button className="w-full bg-white text-black py-3 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <h3 className="text-2xl font-bold mb-4">SHOP.CO</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                We have clothes that suits your style and which you&apos;re proud to wear. From women to men.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors">
                  <TwitterIcon />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                  <FacebookIcon />
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors">
                  <InstagramIcon />
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors">
                  <GithubIcon />
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-medium mb-4 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Works</a></li>
                <li><a href="#" className="hover:text-gray-900">Career</a></li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-medium mb-4 uppercase tracking-wider text-sm">Help</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900">Customer Support</a></li>
                <li><a href="#" className="hover:text-gray-900">Delivery Details</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
              </ul>
            </div>

            {/* FAQ */}
            <div>
              <h4 className="font-medium mb-4 uppercase tracking-wider text-sm">FAQ</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900">Account</a></li>
                <li><a href="#" className="hover:text-gray-900">Manage Deliveries</a></li>
                <li><a href="#" className="hover:text-gray-900">Orders</a></li>
                <li><a href="#" className="hover:text-gray-900">Payments</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-medium mb-4 uppercase tracking-wider text-sm">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900">Free eBooks</a></li>
                <li><a href="#" className="hover:text-gray-900">Development Tutorial</a></li>
                <li><a href="#" className="hover:text-gray-900">How to - Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Youtube Playlist</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
            <div className="flex items-center gap-3">
              <div className="bg-white px-3 py-2 rounded border">
                <svg className="h-4" viewBox="0 0 48 16" fill="none">
                  <rect width="48" height="16" rx="2" fill="white"/>
                  <text x="4" y="12" fontSize="10" fontWeight="bold" fill="#1A1F71">VISA</text>
                </svg>
              </div>
              <div className="bg-white px-3 py-2 rounded border">
                <div className="flex gap-1">
                  <div className="w-4 h-4 rounded-full bg-red-500 opacity-80"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-80 -ml-2"></div>
                </div>
              </div>
              <div className="bg-white px-3 py-2 rounded border text-blue-800 font-bold text-xs">
                PayPal
              </div>
              <div className="bg-white px-3 py-2 rounded border text-black font-bold text-xs">
                 Pay
              </div>
              <div className="bg-white px-3 py-2 rounded border text-black font-bold text-xs">
                G Pay
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}