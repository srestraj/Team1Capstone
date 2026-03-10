import { ProductType } from "../utils/types/Product";
import ProductCard from "./ProductCard";

export default function ProductSection({
  title,
  products,
}: {
  title: string;
  products: ProductType[];
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-center text-2xl font-black tracking-tight">
        {title}
      </h2>

      <div className="mt-8 flex items-center overflow-auto gap-6">
        {products.slice(0, 4).map((p) => (
          <ProductCard
            classNames="md:w-1/4 w-11/12 md:min-w-1/4 min-w-11/12"
            key={p._id}
            product={p}
          />
        ))}
      </div>
    </section>
  );
}
