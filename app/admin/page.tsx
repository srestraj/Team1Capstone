"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, Pencil, Trash2, Package, LayoutDashboard, 
  Settings, Loader2, X, AlertCircle, CheckCircle2 
} from "lucide-react";

// --- Types matched to your Mongoose Model ---
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

  // 1. FETCH FROM DATABASE
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", { cache: 'no-store' });
      const data = await res.json();
      // Ensure we set data from the DB or an empty array if DB is empty
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      showToast("error", "Failed to connect to Database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  // 2. DELETE FROM DATABASE
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will permanently delete the product from MongoDB.")) return;
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
    <div className="flex min-h-screen bg-[#F6F6F6] text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-black p-6 flex flex-col hidden lg:flex fixed h-full z-10">
        <h1 className="text-white text-2xl font-black mb-10 tracking-tighter">SHOP.CO</h1>
        <nav className="space-y-2 flex-1">
          <SidebarLink icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <SidebarLink icon={<Package size={20}/>} label="Products" />
          <SidebarLink icon={<Settings size={20}/>} label="Settings" />
        </nav>
        <div className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">v1.2 Stable</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 md:p-10">
        {/* Toast Notification */}
        {toast && (
          <div className={`fixed top-5 right-5 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl z-50 animate-bounce ${
            toast.type === 'success' ? 'bg-black text-white' : 'bg-red-600 text-white'
          }`}>
            {toast.type === 'success' ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>}
            <span className="font-bold">{toast.text}</span>
          </div>
        )}

        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Inventory</h2>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
          >
            <Plus size={20} /> Add Product
          </button>
        </header>

        {/* Product Table */}
        <div className="bg-white rounded-[32px] border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-100">
                <th className="px-8 py-5 text-3xl">Product Details</th>
                <th className="px-8 py-5 text-3xl">Category</th>
                <th className="px-8 py-5 text-3xl">Price</th>
                <th className="px-8 py-5 text-3xl">Stock</th>
                <th className="px-8 py-5 text-3xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-32 text-center">
                    <Loader2 className="animate-spin mx-auto text-black mb-4" size={40} />
                    <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Fetching from Atlas...</p>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-gray-400 font-bold">Database is empty.</td>
                </tr>
              ) : (
                products.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                          <img 
                            src={item.thumbnail || "https://placehold.co/100x100?text=No+Img"} 
                            className="w-full h-full object-cover" 
                            alt=""
                          />
                        </div>
                        <div>
                          <div className="font-black text-gray-900 leading-none mb-1">{item.title}</div>
                          <div className="text-[10px] text-gray-400 font-mono">{item.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        {item.category || "General"}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-black">
                      {item.currencyCode || "CAD"} {item.price}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`font-bold ${(item.stock ?? 0) < 5 ? 'text-red-500' : 'text-gray-700'}`}>
                        {item.stock ?? 0}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(item)} className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-black hover:text-white transition-all shadow-sm">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
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

      {/* --- MODAL FOR CREATE/UPDATE --- */}
      {isModalOpen && (
        <ProductModal 
          product={editingProduct} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => { setIsModalOpen(false); fetchProducts(); showToast("success", "Database Synchronized"); }} 
        />
      )}
    </div>
  );
}

// --- MODAL COMPONENT ---
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
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white w-full max-w-xl rounded-[40px] p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-black"><X size={28}/></button>
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">{product ? "Edit Item" : "New Product"}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Product Title</label>
            <input className="w-full bg-gray-50 border-none p-4 rounded-2xl mt-1 focus:ring-2 focus:ring-black outline-none font-bold" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Price</label>
              <input className="w-full bg-gray-50 border-none p-4 rounded-2xl mt-1 focus:ring-2 focus:ring-black outline-none font-bold" type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} required />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Stock Level</label>
              <input className="w-full bg-gray-50 border-none p-4 rounded-2xl mt-1 focus:ring-2 focus:ring-black outline-none font-bold" type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Category</label>
            <input className="w-full bg-gray-50 border-none p-4 rounded-2xl mt-1 focus:ring-2 focus:ring-black outline-none font-bold" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Image URL</label>
            <input className="w-full bg-gray-50 border-none p-4 rounded-2xl mt-1 focus:ring-2 focus:ring-black outline-none font-bold" value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} />
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-200 mt-4">
            {submitting ? "Saving to MongoDB..." : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, label, active = false }: any) => (
  <a href="#" className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold ${active ? "bg-white text-black shadow-lg" : "text-gray-500 hover:text-white hover:bg-white/5"}`}>
    {icon} <span className="uppercase text-[10px] tracking-widest">{label}</span>
  </a>
);