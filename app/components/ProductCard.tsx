import Image from "next/image";
import Link from "next/link";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ p }: { p: Product }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100">
        <Image src={p.image} alt={p.name} className="h-full w-full object-cover" />
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
        <p className="mt-1 text-base font-bold">${p.price.toFixed(2)}</p>

        <Link
          href={`/products/${p.id}`}
          className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}