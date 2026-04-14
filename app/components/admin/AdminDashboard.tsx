// components/admin/AdminDashboard.tsx
"use client";

import  { useState, useEffect } from "react";
import { Product, View } from "./types";
import Sidebar from "./Sidebar";
import Toast from "./Toast";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>('list');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
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

  const addCategory = async (category: string) => {
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: category })
      });
      if (res.ok) {
console.log("Category added successfully");
        } else {
console.error("Failed to add category");
        }
    } catch {
      showToast("error", "Failed to connect to Database");
    }
  };


  const handleOpenForm = (product: Product | null = null) => {
    setEditingProduct(product);
    setFormData(product ? { ...product } : { title: '', price: 0, stock: 0, category: '', subCategory: '', thumbnail: '' });
    setView('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct ? `/api/products?id=${editingProduct._id}` : "/api/products";
    try {
      await fetch(url, { 
        method, 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(formData) 
      });
      setView('list');
      fetchProducts();
      showToast("success", editingProduct ? "Product Updated" : "Product Created");
    } catch {
      showToast("error", "Operation failed");
    }
  };

  const handleCancel = () => {
    setView('list');
    setEditingProduct(null);
    setFormData({});
  };

  return (
    <div className="flex h-screen w-full bg-[#F6F6F6] text-black">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {toast && <Toast toast={toast} />}
        
        <main className="flex-1 overflow-y-auto p-8 md:p-12">
          {view === 'list' ? (
            <ProductList 
              products={products}
              loading={loading}
              onAdd={() => handleOpenForm()}
              onEdit={handleOpenForm}
              onDelete={handleDelete}
            />
          ) : (
            <ProductForm
              editingProduct={editingProduct}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          )}
        </main>

        <footer className="flex-shrink-0 w-full bg-gray-100 py-6 flex justify-center border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              v1.2 Stable
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}