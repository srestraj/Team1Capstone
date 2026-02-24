import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import DressStyle from "./components/DressStyle";
import Testimonials from "./components/Testimonials";
import { ProductType } from "./utils/types/Product";
import { fetchProducts } from "./utils/apiService";

// const newArrivals: Product[] = [
//   { id: "1", name: "T-shirt with Tape Details", price: 120, image: "/products/p1.jpg" },
//   { id: "2", name: "Skinny Fit Jeans", price: 240, image: "/products/p2.jpg" },
//   { id: "3", name: "Checkered Shirt", price: 180, image: "/products/p3.jpg" },
//   { id: "4", name: "Sleeve Striped T-shirt", price: 130, image: "/products/p4.jpg" },
// ];

// const topSelling: Product[] = [
//   { id: "5", name: "Vertical Striped Shirt", price: 212, image: "/products/p5.jpg" },
//   { id: "6", name: "Courage Graphic T-shirt", price: 145, image: "/products/p6.jpg" },
//   { id: "7", name: "Loose Fit Bermuda Shorts", price: 80, image: "/products/p7.jpg" },
//   { id: "8", name: "Faded Skinny Jeans", price: 210, image: "/products/p8.jpg" },
// ];

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
