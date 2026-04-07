import ExploreClient from "../components/ExploreClient";
import { fetchColors, fetchProducts } from "../utils/apiService";
import { ProductType } from "../utils/types/Product";

const Explore = async () => {
  const products: ProductType[] = await fetchProducts();
  const colors: string[] = await fetchColors();

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <ExploreClient initialProducts={products} initialColors={colors} />
      </div>
    </section>
  );
};

export default Explore;
