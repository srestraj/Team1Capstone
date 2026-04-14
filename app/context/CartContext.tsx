"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { ProductType } from "../utils/types/Product"

type CartItem = {
  product: ProductType
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
  increaseQuantity: (item: CartItem) => void
  decreaseQuantity: (item: CartItem) => void
  clearCart: () => void
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [cart, setCart] = useState<CartItem[]>([])

  // ✅ Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  // ✅ Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // ✅ Helper to match same item
  const isSameItem = (a: CartItem, b: CartItem) =>
    a.product._id === b.product._id &&
    a.selectedSize === b.selectedSize &&
    a.selectedColor === b.selectedColor

  // ✅ Add to cart (merge quantities)
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) =>
        isSameItem(i, item)
      )

      if (existingIndex !== -1) {
        return prev.map((cartItem, index) =>
          index === existingIndex
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
              }
            : cartItem
        )
      }

      return [...prev, item]
    })
  }

  // ✅ Remove item completely
  const removeFromCart = (item: CartItem) => {
    setCart((prev) =>
      prev.filter((i) => !isSameItem(i, item))
    )
  }

  // ✅ Increase quantity
  const increaseQuantity = (item: CartItem) => {
    setCart((prev) =>
      prev.map((i) =>
        isSameItem(i, item)
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    )
  }

  // ✅ Decrease quantity (remove if 0)
  const decreaseQuantity = (item: CartItem) => {
    setCart((prev) =>
      prev
        .map((i) =>
          isSameItem(i, item)
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    )
  }

  // ✅ Clear entire cart
  const clearCart = () => {
    setCart([])
  }

  // ✅ Total item count (for navbar badge)
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ✅ Hook
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}