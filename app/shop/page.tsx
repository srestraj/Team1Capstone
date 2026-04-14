import ExploreClient from "../components/ExploreClient";
import { fetchCategories, fetchColors, fetchProducts } from "../utils/apiService";
import { buildQueryString } from "../utils/buildQueryString";
import { Category, ProductType, SearchProps } from "../utils/types/Product";

const Explore = async ({ searchParams }: SearchProps) => {
  const params = await searchParams;
  const filters = {
    q: params.q,
    category: params.category,
    subcategory: params.subcategory,
    minPrice: params.minPrice
      ? Number(params.minPrice)
      : undefined,
    maxPrice: params.maxPrice
      ? Number(params.maxPrice)
      : undefined,
    colors: params.color
      ? params.color.split(",").map(decodeURIComponent)
      : [],
  };

  const products: ProductType[] = params ? await fetchProducts(buildQueryString(filters)) : await fetchProducts();
  const colors: string[] = await fetchColors();
  const categories: Category[] = await fetchCategories();

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <ExploreClient initialProducts={products} initialColors={colors} initialCategories={categories} />
      </div>
    </section>
  );
};

export default Explore;
