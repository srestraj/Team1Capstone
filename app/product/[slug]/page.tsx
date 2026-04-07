import { Star, Minus, Plus, ShoppingCart, ChevronRight, Search, ShoppingBag, User } from 'lucide-react';
import { fetchSingleProduct } from "@/app/utils/apiService";
import { ProductType } from "@/app/utils/types/Product";
import StarRating from '@/app/components/StarRating';
import formatter from '@/app/utils/priceFormatter';
import ProductCarousel from '@/app/components/ProductCarousel';

const fetchProduct = async (slug: string) => {
    const product: ProductType = await fetchSingleProduct(slug);
    return product;
}

export default async function ProductPage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = await params;

    const product: any = await fetchProduct(slug);
    console.log(product)

    return (
        <div className="min-h-screen bg-white font-sans">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Images */}
                    <ProductCarousel images={[product.thumbnail, ...product.images]} productTitle={product.title} />

                    {/* Right Column - Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                                {product.title}
                            </h1>
                            <StarRating rating={product.averageRating} readonly />
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold">
                                {product.discountPercentage > 0
                                    ? formatter(
                                        product.price -
                                        (product.price * product.discountPercentage) / 100,
                                        product.currencyCode,
                                    )
                                    : formatter(product.price, product.currencyCode)}
                            </span>
                        </div>
                        <div
                            className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />

                        <hr className="border-gray-100" />

                        {/* <ColorSelector 
              colors={product.colors} 
              selected={selectedColor} 
              onSelect={setSelectedColor} 
            /> */}

                        <hr className="border-gray-100" />
                        <div className="space-y-3">
                            <span className="text-sm text-gray-600">Choose Size</span>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((size: string) => (
                                    <button
                                        key={size}
                                        // onClick={() => onSelect(size)}
                                        className="px-6 py-3 rounded-full text-sm font-medium transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <hr className="border-gray-100" />
                        <div className="space-y-3">
                            <span className="text-sm text-gray-600">Choose Color</span>
                            <div className="w-full flex flex-wrap gap-2.5">
                                {
                                    product.colors.map((color: string) => (
                                        <label key={color} className="cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="color"
                                                value={color}
                                                // checked={filters.colors.includes(color)}
                                                className="sr-only peer"
                                            // onChange={(e) =>
                                            //   updateFilter("color", {
                                            //     value: color,
                                            //     checked: e.target.checked,
                                            //   })
                                            // }
                                            />
                                            <span
                                                className={`relative size-9 inline-flex items-center justify-center rounded-full border-2 border-black/20 border-inset transition peer-checked:border-black ${color === '#fff' ? 'peer-checked:bg-custom-checkbox-black' : 'peer-checked:bg-custom-checkbox'} bg-size-[50%] bg-position-[55%_70%] bg-no-repeat`}
                                                style={{ backgroundColor: color }}
                                            />
                                        </label>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {/* <QuantitySelector quantity={quantity} onChange={setQuantity} /> */}
                            <button className="flex-1 bg-black text-white font-medium py-3 px-8 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}