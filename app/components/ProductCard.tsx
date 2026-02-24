import Link from "next/link";
import { ProductType } from "../utils/types/Product";
import Image from "next/image";
import formatter from "../utils/priceFormatter";
import StarRating from "./StarRating";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="relative group block overflow-hidden"
    >
      <div className="overflow-hidden md:h-74.5 h-43.5 rounded-[20px] bg-product-bg">
        <Image
          width={500}
          height={500}
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-115 transition-transform duration-300 ease-in-out"
        />
      </div>

      <div className="bg-white pt-3 flex flex-col gap-2">
        <h3 className="md:text-xl text-base font-bold text-black truncate">
          {product.title}
        </h3>

        <div className="inline-flex items-center md:gap-3.25 gap-2.75">
          <StarRating rating={product.averageRating} readonly={true} />
          <span className="text-black md:text-base text-sm">
            {product.averageRating.toFixed(1)}/
            <span className="text-black/60">5</span>
          </span>
        </div>
        <div className="flex md:flex-nowrap flex-wrap items-center md:gap-2.5 gap-1.25">
          <span className="font-bold md:text-2xl text-xl text-black">
            {product.discountPercentage > 0
              ? formatter(
                  product.price -
                    (product.price * product.discountPercentage) / 100,
                  product.currencyCode,
                )
              : formatter(product.price, product.currencyCode)}
          </span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-black/40 md:text-2xl text-xl font-bold line-through">
                {formatter(product.price, product.currencyCode)}
              </span>
              <span className="absolute top-4 right-4 rounded-full bg-custom-red/10 text-custom-red md:text-xs text-[10px] font-medium px-3.5 py-1.5">
                -{product.discountPercentage}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
