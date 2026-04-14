"use client";

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  ShoppingBag
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

interface OrderStatus {
  step: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export default function OrderStatusPage() {
  const router = useRouter();
  const { cart } = useCart();

  // ✅ Client-side only state
  const [orderNumber, setOrderNumber] = useState<string>("LOADING...");
  const [mounted, setMounted] = useState(false);

  // Generate order number ONLY on client side
  useEffect(() => {
    setOrderNumber("ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase());
    setMounted(true);
  }, []);

  const [currentStep] = useState(2);

  const orderStatuses: OrderStatus[] = [
    {
      step: 1,
      title: "Order Placed",
      description: "Your order has been confirmed",
      date: "Apr 14, 2026 - 10:30 AM",
      completed: true,
      current: false
    },
    {
      step: 2,
      title: "Processing",
      description: "Your order is being prepared",
      date: "Apr 14, 2026 - 11:00 AM",
      completed: currentStep > 2,
      current: currentStep === 2
    },
    {
      step: 3,
      title: "Shipped",
      description: "Your order is on the way",
      date: "Estimated: Apr 16, 2026",
      completed: currentStep > 3,
      current: currentStep === 3
    },
    {
      step: 4,
      title: "Delivered",
      description: "Package delivered successfully",
      date: "Estimated: Apr 17, 2026",
      completed: currentStep > 4,
      current: currentStep === 4
    }
  ];

  const subtotal = cart.reduce(
    (sum: number, item: any) => sum + (item.product?.price || 0) * (item.quantity || 1),
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const getStatusColor = (status: OrderStatus) => {
    if (status.completed || status.current) return "bg-black";
    return "bg-gray-200";
  };

  // Loading state to prevent hydration mismatch
  if (!mounted) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </button>
          <span className="text-gray-300">|</span>
          <span className="font-bold text-xl">SHOP.CO</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-600">Order Status</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Side - Order Status */}
          <div className="lg:col-span-7 space-y-6">
            {/* Order Info Header */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Number</p>
                  <h1 className="text-2xl font-bold">{orderNumber}</h1>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Order Date</p>
                  <p className="font-medium">Apr 14, 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Status:</span>
                <span className={`px-3 py-1 rounded-full font-medium ${currentStep === 1 ? 'bg-yellow-100 text-yellow-800' :
                    currentStep === 2 ? 'bg-blue-100 text-blue-800' :
                      currentStep === 3 ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                  }`}>
                  {currentStep === 1 && "Order Placed"}
                  {currentStep === 2 && "Processing"}
                  {currentStep === 3 && "Shipped"}
                  {currentStep === 4 && "Delivered"}
                </span>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white border rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Truck className="w-6 h-6" />
                Order Status
              </h2>

              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                <div className="space-y-8">
                  {orderStatuses.map((status) => (
                    <div key={status.step} className="relative flex gap-4">
                      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(status)}`}>
                        {status.step === 1 && <ShoppingBag className="w-6 h-6 text-white" />}
                        {status.step === 2 && <Package className="w-6 h-6 text-white" />}
                        {status.step === 3 && <Truck className="w-6 h-6 text-white" />}
                        {status.step === 4 && <CheckCircle className="w-6 h-6 text-white" />}
                      </div>

                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-bold text-lg ${status.completed || status.current ? 'text-black' : 'text-gray-400'}`}>
                            {status.title}
                          </h3>
                          {(status.completed || status.current) && (
                            <span className="text-xs text-gray-500">{status.date}</span>
                          )}
                        </div>
                        <p className={`text-sm ${status.completed || status.current ? 'text-gray-600' : 'text-gray-400'}`}>
                          {status.description}
                        </p>

                        {status.current && (
                          <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            <Clock className="w-3 h-3" />
                            In Progress
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Delivery Address
              </h2>
              <div className="text-sm">
                <p className="font-medium">John Doe</p>
                <p className="text-gray-600 mt-1">123 Main Street, Apt 4B</p>
                <p className="text-gray-600">New York, NY 10001</p>
                <p className="text-gray-600 mt-2">Phone: +1 234 567 890</p>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.length > 0 ? cart.map((item: any, index: number) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border">
                      <img
                        src={item.product?.thumbnail || '/placeholder.jpg'}
                        alt={item.product?.title || 'Product'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{item.product?.title || 'Product'}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                      <p className="font-semibold">${((item.product?.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 text-sm">No items in order</p>
                )}
              </div>

              <div className="space-y-3 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Discount (-20%)</span>
                  <span className="font-medium">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">${deliveryFee}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t">
                  <span>Total Paid</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push("/shop")}
                className="w-full bg-black text-white py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-all mt-6"
              >
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}