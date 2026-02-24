import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import DressStyle from "./components/DressStyle";
import Testimonials from "./components/Testimonials";
import { ProductType } from "./utils/types/Product";
import { fetchProducts } from "./utils/apiService";

export default async function Home() {
  const newArrivals: ProductType[] = await fetchProducts();
  return (
    <main>
      <Hero />
      <ProductSection title="NEW ARRIVALS" products={newArrivals.slice(0, 4)} />
      <ProductSection title="TOP SELLING" products={newArrivals.slice(0, 4)} />
      <DressStyle />
      <Testimonials />
    </main>
  );
}
