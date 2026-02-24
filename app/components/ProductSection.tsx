import ProductCard, { Product } from "./productcard";

export default function ProductSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-center text-2xl font-black tracking-tight">{title}</h2>

      <div className="mt-8 grid grid-cols-4 gap-6">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}