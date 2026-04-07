// components/admin/ProductList.tsx
import { Plus, Loader2 } from "lucide-react";
import { Product } from "./types";
import ProductRow from "./ProductRow";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductList({ products, loading, onAdd, onEdit, onDelete }: ProductListProps) {
  return (
    <>
      <header className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">ADMIN</h2>
          <p className="text-gray-400 font-bold mt-2 uppercase text-xs tracking-widest">DASHBOARD</p>
        </div>
        <button 
          onClick={onAdd}
          className="bg-black text-white px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-xl"
        >
          <Plus size={18} strokeWidth={3} /> Add Product
        </button>
      </header>

      <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm mb-20">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase font-black tracking-[0.2em] border-b border-gray-50">
              <th className="px-10 py-7">Product Details</th>
              <th className="px-10 py-7">Category</th>
              <th className="px-10 py-7">Price</th>
              <th className="px-10 py-7">Stock</th>
              <th className="px-10 py-7 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-40 text-center">
                  <Loader2 className="animate-spin mx-auto text-black mb-4" size={48} />
                  <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Syncing with Atlas...</p>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-32 text-center text-gray-400 font-black uppercase text-sm">Database Empty</td>
              </tr>
            ) : (
              products.map((item) => (
                <ProductRow 
                  key={item._id} 
                  item={item} 
                  onEdit={() => onEdit(item)} 
                  onDelete={() => onDelete(item._id)} 
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}