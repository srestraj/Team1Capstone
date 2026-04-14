"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft,
  CreditCard,
  Lock,
  Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Empty cart check
  if (!cart || cart.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4 text-xl">Your cart is empty</p>
          <button 
            onClick={() => router.push("/cart")}
            className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all"
          >
            Back to Cart
          </button>
        </div>
      </main>
    );
  }

  const subtotal = cart.reduce(
    (sum: number, item: any) => sum + (item.product?.price || 0) * (item.quantity || 1),
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const goBackToCart = () => {
    router.push("/cart");
  };

  // ✅ Place Order Handler
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Navigate to order confirmation
    router.push("/order-confirmation");
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={goBackToCart}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Cart
          </button>
          <span className="text-gray-300">|</span>
          <span className="font-bold text-xl">SHOP.CO</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-600">Checkout</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-12 gap-8">
        {/* Left Side - Forms */}
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-2xl font-bold uppercase mb-6">Checkout</h1>

          {/* Step 1: Contact */}
          <div className="bg-white border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">1</div>
              <h3 className="font-semibold text-lg">Contact Information</h3>
            </div>
            <div className="space-y-4">
              <input type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-xl focus:border-black outline-none" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border rounded-xl focus:border-black outline-none" />
            </div>
          </div>

          {/* Step 2: Shipping */}
          <div className="bg-white border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">2</div>
              <h3 className="font-semibold text-lg">Shipping Address</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="First Name" className="px-4 py-3 border rounded-xl focus:border-black outline-none" />
              <input placeholder="Last Name" className="px-4 py-3 border rounded-xl focus:border-black outline-none" />
              <input placeholder="Address" className="col-span-2 px-4 py-3 border rounded-xl focus:border-black outline-none" />
              <input placeholder="City" className="px-4 py-3 border rounded-xl focus:border-black outline-none" />
              <input placeholder="Postal Code" className="px-4 py-3 border rounded-xl focus:border-black outline-none" />
            </div>
          </div>

          {/* Step 3: Payment */}
          <div className="bg-white border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">3</div>
              <h3 className="font-semibold text-lg">Payment Method</h3>
            </div>
            
            <div className="space-y-3 mb-4">
              <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-3 w-4 h-4" />
                <CreditCard className="w-5 h-5 mr-2" />
                <span className="font-medium">Credit Card</span>
              </label>
              
              <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-3 w-4 h-4" />
                <span className="font-medium">PayPal</span>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <input placeholder="Card Number" className="w-full px-4 py-3 border rounded-xl focus:border-black outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="MM/YY" className="px-4 py-3 border rounded-xl focus:border-black outline-none" />
                  <input placeholder="CVV" className="px-4 py-3 border rounded-xl focus:border-black outline-none" />
                </div>
                <input placeholder="Name on Card" className="w-full px-4 py-3 border rounded-xl focus:border-black outline-none" />
              </div>
            )}
          </div>

          {/* ✅ Updated Place Order Button with Loading */}
          <button 
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full bg-black text-white py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>Place Order - ${total.toFixed(2)}</>
            )}
          </button>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            <span>Secure SSL Encryption</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-4">
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cart.map((item: any, index: number) => (
                <div key={`${item.product?._id || index}-${index}`} className="flex gap-3">
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
              ))}
            </div>

            <div className="space-y-3 text-sm border-t pt-4">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-red-500"><span>Discount (-20%)</span><span className="font-medium">-${discount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Delivery</span><span className="font-medium">${deliveryFee}</span></div>
              <div className="flex justify-between font-bold text-lg pt-3 border-t"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}