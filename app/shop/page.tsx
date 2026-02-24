import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../utils/apiService";
import { ProductType } from "../utils/types/Product";

const Explore = async () => {
  const products: ProductType[] = await fetchProducts();

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>

          <p className="mt-4 max-w-md text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>

        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <Filters />
          <div className="lg:col-span-3">
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
