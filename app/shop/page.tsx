import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../utils/apiService";
import { ProductType } from "../utils/types/Product";

const Explore = async () => {
  const products: ProductType[] = await fetchProducts();

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <Filters />
          <div className="lg:col-span-3">
            <h1 className="md:text-3xl text-2xl font-bold text-black">All</h1>
            <p className="md:text-right text-black/60 md:text-base text-sm">
              Showing{" "}
              {!products.length
                ? "0 products"
                : `1-${products.length > 10 ? 10 : products.length} of ${products.length} products`}
            </p>
            <div className="grid w-full md:gap-4 gap-3.5 grid-cols-2 md:grid-cols-3">
              {products.map((product: ProductType) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
