"use client";

import { useState } from "react";
import Filters from "../components/Filters";
import ProductsDisplay from "../components/ProductsDisplay";
import { fetchProducts } from "../utils/apiService";
import { ProductType } from "../utils/types/Product";

const ExploreClient = ({ initialProducts, initialColors }: { initialProducts: ProductType[], initialColors: string[] }) => {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);

  const handleFilterChange = async (queryString: string) => {
    const products = await fetchProducts(queryString);
    setProducts(products);
  };

  return (
    <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
      <Filters colors={initialColors} onFilterChange={handleFilterChange} />
      <ProductsDisplay products={products} selectedCategory="All" />
    </div>
  );
};

export default ExploreClient;