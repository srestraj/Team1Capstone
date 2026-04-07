import { Star, Minus, Plus, ShoppingCart, ChevronRight, Search, ShoppingBag, User } from 'lucide-react';
import { fetchSingleProduct } from "@/app/utils/apiService";
import { ProductType } from "@/app/utils/types/Product";
import StarRating from '@/app/components/StarRating';
import formatter from '@/app/utils/priceFormatter';
import ProductCarousel from '@/app/components/ProductCarousel';
import ProductDescription from '@/app/components/ProductDescription';

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

    return (
        <div className="min-h-screen bg-white font-sans">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Images */}
                    <ProductCarousel images={[product.thumbnail, ...product.images]} productTitle={product.title} />

                    {/* Right Column - Product Info */}
                    <ProductDescription product={product} />
                </div>
            </main>
        </div>
    );
}