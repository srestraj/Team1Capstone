// components/admin/ProductRow.tsx
import { Pencil, Trash2 } from "lucide-react";
import { Product } from "./types";

interface ProductRowProps {
  item: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductRow({ item, onEdit, onDelete }: ProductRowProps) {
  return (
    <tr className="hover:bg-gray-50/50 transition-all group">
      <td className="px-10 py-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gray-100 rounded-[20px] overflow-hidden border border-gray-50 shrink-0">
            <img 
              src={item.thumbnail || "https://placehold.co/200"} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              alt="" 
            />
          </div>
          <div>
            <div className="font-black text-gray-900 text-lg leading-tight mb-1">{item.title}</div>
            <div className="text-[11px] text-gray-300 font-mono tracking-tighter uppercase">{item.slug}</div>
          </div>
        </div>
      </td>
      <td className="px-10 py-6">
        <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
          {item.category || "General"}
        </span>
      </td>
      <td className="px-10 py-6 font-black text-lg">
        <span className="text-gray-400 text-xs mr-1">{item.currencyCode || "CAD"}</span>{item.price}
      </td>
      <td className="px-10 py-6">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${(item.stock ?? 0) < 10 ? 'bg-red-500' : 'bg-green-500'}`} />
          <span className="font-bold text-gray-700">{item.stock ?? 0}</span>
        </div>
      </td>
      <td className="px-10 py-6 text-right">
        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
          <button 
            onClick={onEdit} 
            className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <Pencil size={18} />
          </button>
          <button 
            onClick={onDelete} 
            className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}