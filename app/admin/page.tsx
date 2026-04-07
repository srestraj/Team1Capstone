"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, Pencil, Trash2, Package, LayoutDashboard, 
  Settings, Loader2, X, AlertCircle, CheckCircle2 
} from "lucide-react";

type Product = {
  _id: string;
  title: string;
  price: number;
  description?: string;
  category?: string;
  thumbnail?: string;
  stock?: number;
  discountPercentage?: number;
  currencyCode?: string;
  slug?: string;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", { cache: 'no-store' });
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      showToast("error", "Failed to connect to Database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this product?")) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p._id !== id));
        showToast("success", "Product deleted");
      }
    } catch (err) {
      showToast("error", "Delete failed");
    }
  };

  const handleOpenModal = (product: Product | null = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    // h-screen overflow-hidden stops the global footer from appearing
    <div className="flex h-screen w-full bg-[#F6F6F6] text-black overflow-hidden relative z-[999]">
      
      {/* Sidebar */}
      <aside className="w-64 bg-black p-6 flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="flex-1">
          <h1 className="text-white text-2xl font-black mb-10 tracking-tighter">SHOP.CO</h1>
          <nav className="space-y-2">
            <SidebarLink icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
            <SidebarLink icon={<Package size={20}/>} label="Products" />
            <SidebarLink icon={<Settings size={20}/>} label="Settings" />
          </nav>
        </div>

        {/* Anchored to Bottom Left */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              v1.2 Stable
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Scrollable Area */}
      <main className="flex-1 ml-64 p-8 md:p-12 overflow-y-auto h-full relative bg-[#F6F6F6]">
        {toast && (
          <div className={`fixed top-5 right-5 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-5 ${
            toast.type === 'success' ? 'bg-black text-white' : 'bg-red-600 text-white'
          }`}>
            {toast.type === 'success' ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>}
            <span className="font-bold uppercase text-xs tracking-wide">{toast.text}</span>
          </div>
        )}

        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Inventory</h2>
            <p className="text-gray-400 font-bold mt-2 uppercase text-xs tracking-widest">System Management</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-black text-white px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-xl"
          >
            <Plus size={18} strokeWidth={3} /> Add Product
          </button>
        </header>

        {/* Table Container */}
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
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-gray-100 rounded-[20px] overflow-hidden border border-gray-50 shrink-0">
                          <img src={item.thumbnail || "https://placehold.co/200"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
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
                        <button onClick={() => handleOpenModal(item)} className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-black hover:text-white transition-all shadow-sm">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm text-red-600">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal & SidebarLink components remain logic-same, just ensure they are included */}
      {isModalOpen && (
        <ProductModal 
          product={editingProduct} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => { setIsModalOpen(false); fetchProducts(); showToast("success", "Inventory Updated"); }} 
        />
      )}
    </div>
  );
}

// --- SidebarLink & ProductModal should be defined here exactly as before ---
const SidebarLink = ({ icon, label, active = false }: any) => (
  <a href="#" className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold ${active ? "bg-white text-black shadow-lg" : "text-gray-500 hover:text-white hover:bg-white/5"}`}>
    {icon} <span className="uppercase text-[11px] tracking-widest">{label}</span>
  </a>
);

const ProductModal = ({ product, onClose, onSuccess }: any) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || { title: "", price: 0, category: "", thumbnail: "", description: "", currencyCode: "CAD", stock: 0 }
  );
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const method = product ? "PUT" : "POST";
    const url = product ? `/api/products?id=${product._id}` : "/api/products";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) onSuccess();
    } catch (err) { console.error(err); } 
    finally { setSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white w-full max-w-xl rounded-[48px] p-12 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-10 right-10 text-gray-300 hover:text-black transition-colors"><X size={32}/></button>
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-10">{product ? "Update Item" : "New Entry"}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Product Title</label>
            <input className="w-full bg-gray-50 border-none p-5 rounded-3xl focus:ring-2 focus:ring-black outline-none font-bold text-lg" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Price</label>
              <input className="w-full bg-gray-50 border-none p-5 rounded-3xl focus:ring-2 focus:ring-black outline-none font-bold text-lg" type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Stock</label>
              <input className="w-full bg-gray-50 border-none p-5 rounded-3xl focus:ring-2 focus:ring-black outline-none font-bold text-lg" type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Category</label>
            <input className="w-full bg-gray-50 border-none p-5 rounded-3xl focus:ring-2 focus:ring-black outline-none font-bold text-lg" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Thumbnail URL</label>
            <input className="w-full bg-gray-50 border-none p-5 rounded-3xl focus:ring-2 focus:ring-black outline-none font-bold text-lg" value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} />
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-black text-white py-6 rounded-full font-black uppercase tracking-widest hover:bg-gray-900 transition-all disabled:bg-gray-200 mt-6 shadow-xl">
            {submitting ? "Processing..." : "Confirm Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};