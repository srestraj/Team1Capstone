import Link from "next/link";
import { Product } from "../utils/types/Product";
import Image from "next/image";
import formatter from "../utils/priceFormatter";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href="#" className="group block overflow-hidden rounded-t-[20px]">
      <Image
        width={500}
        height={500}
        src={product.thumbnail}
        alt={product.title}
        className="rounded-[20px] md:h-74.5 h-43.5 w-full object-cover object-center bg-product-bg"
      />

      <div className="relative bg-white pt-3">
        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {product.title}
        </h3>

        <p className="mt-2">
          <span className="sr-only"> Regular Price </span>

          <span className="tracking-wider text-gray-900">
            {formatter(product.price, product.currencyCode)}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
