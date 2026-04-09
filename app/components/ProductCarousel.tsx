"use client";

import { useState } from "react";

interface ProductCarouselProps {
    images: string[];
    productTitle: string;
}

const ProductCarousel = ({ images, productTitle }: ProductCarouselProps) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx
                            ? 'border-black'
                            : 'border-transparent hover:border-gray-300'
                            }`}
                    >
                        <img
                            src={img}
                            alt={`${productTitle} view ${idx + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden aspect-square">
                <img
                    src={images[selectedImage]}
                    alt={productTitle}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

export default ProductCarousel;