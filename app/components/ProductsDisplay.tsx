import { ProductType } from "../utils/types/Product"
import ProductCard from "./ProductCard"

const ProductsDisplay = ({ products, selectedCategory }: { products: ProductType[], selectedCategory: string }) => {
  return <div className="lg:col-span-3">
    <h1 className="md:text-3xl text-2xl font-bold text-black">{selectedCategory || "All"}</h1>
    <p className="md:text-right text-black/60 md:text-base text-sm">
      Showing{" "}
      {!products.length
        ? "0 products"
        : `1-${products.length > 10 ? 10 : products.length} of ${products.length} ${products.length === 1 ? "product" : "products"}`}
    </p>
    <div className="grid w-full md:gap-4 gap-3.5 grid-cols-2 md:grid-cols-3">
      {products.map((product: ProductType) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </div>
}

export default ProductsDisplay;