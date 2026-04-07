"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import formatter from "../utils/priceFormatter"
import { ProductType } from "../utils/types/Product"
import StarRating from "./StarRating"
import { useCart } from "../context/CartContext"

const ProductDescription = ({ product }: { product: ProductType }) => {
  const { addToCart } = useCart()

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color")
      return
    }

    addToCart({
      product,
      quantity: 1,
      selectedSize,
      selectedColor,
    })
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
          {product.title}
        </h1>
        <StarRating rating={product.averageRating} readonly />
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold">
          {product.discountPercentage > 0
            ? formatter(
                product.price -
                  (product.price * product.discountPercentage) / 100,
                product.currencyCode
              )
            : formatter(product.price, product.currencyCode)}
        </span>
      </div>

      {/* Description */}
      <div
        className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />

      <hr className="border-gray-100" />

      {/* Sizes */}
      <div className="space-y-3">
        <span className="text-sm text-gray-600">Choose Size</span>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size: string) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all
                ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Colors */}
      <div className="space-y-3">
        <span className="text-sm text-gray-600">Choose Color</span>
        <div className="flex flex-wrap gap-2.5">
          {product.colors.map((color: string) => (
            <label key={color} className="cursor-pointer">
                <input
                type="radio"
                name="color"
                value={color}
                checked={selectedColor === color}
                className="sr-only peer"
                onChange={(e) =>
                    setSelectedColor(e.target.value)
                }
                />
                <span
                className={`relative size-9 inline-flex items-center justify-center rounded-full border-2 border-black/20 border-inset transition peer-checked:border-black ${color === '#fff' ? 'peer-checked:bg-custom-checkbox-black' : 'peer-checked:bg-custom-checkbox'} bg-size-[50%] bg-position-[55%_70%] bg-no-repeat`}
                style={{ backgroundColor: color }}
                />
            </label>
          ))}
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          role="button"
          className="cursor-pointer flex-1 bg-black text-white font-medium py-3 px-8 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductDescription