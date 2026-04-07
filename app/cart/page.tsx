"use client";

import {
  Trash2,
  Minus,
  Plus,
  ArrowRight
} from "lucide-react"

import { useCart } from "../context/CartContext"

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // ✅ Totals
  const subtotal = cart.reduce(
    (sum: any, item: any) => sum + item.product.price * item.quantity,
    0
  )

  const discount = subtotal * 0.2
  const deliveryFee = cart.length > 0 ? 15 : 0
  const total = subtotal - discount + deliveryFee

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 uppercase">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          // ✅ Empty state
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">
              Your cart is empty
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-full">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-7 space-y-6">
              {cart.map((item) => (
                <div
                  key={`${item.product._id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 pb-6 border-b"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Size: {item.selectedSize}
                        </p>
                        <p className="text-sm text-gray-500">
                          Color: {item.selectedColor}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item)}
                        className="text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-lg font-bold">
                        ${item.product.price}
                      </span>

                      <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                        <button
                          onClick={() => decreaseQuantity(item)}
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <span className="w-8 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item)}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-5">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-red-500">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>${deliveryFee}</span>
                  </div>

                  <div className="border-t pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo */}
                {/* <div className="mt-6 flex gap-2">
                  <input
                    value={promoCode}
                    onChange={(e) =>
                      setPromoCode(e.target.value)
                    }
                    placeholder="Promo code"
                    className="flex-1 px-4 py-3 rounded-full border"
                  />
                  <button className="bg-black text-white px-6 rounded-full">
                    Apply
                  </button>
                </div> */}

                {/* Checkout */}
                <button className="w-full bg-black text-white py-4 rounded-full mt-4 flex justify-center items-center gap-2">
                  Go to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
  )
}