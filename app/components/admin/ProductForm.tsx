// components/admin/ProductForm.tsx
"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { Product } from "./types";

interface ProductFormProps {
  editingProduct: Product | null;
  formData: Partial<Product>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function ProductForm({ editingProduct, formData, setFormData, onSubmit, onCancel }: ProductFormProps) {
  return (
    <>
      <header className="mb-12">
        <button 
          onClick={onCancel}
          className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-6 font-bold uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={18} /> Back to Inventory
        </button>
        <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">
          {editingProduct ? "Edit Product" : "New Product"}
        </h2>
        <p className="text-gray-400 font-bold mt-2 uppercase text-xs tracking-widest">
          {editingProduct ? `Editing: ${editingProduct.title}` : "Add a new item to inventory"}
        </p>
      </header>

      <div className="bg-white rounded-[40px] border border-gray-100 p-12 shadow-sm max-w-2xl">
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Product Title
            </label>
            <input 
              className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold text-lg" 
              value={formData.title || ""} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              placeholder="Enter product name"
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Price (CAD)
              </label>
              <input 
                className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold text-lg" 
                type="number" 
                step="0.01"
                value={formData.price || 0} 
                onChange={e => setFormData({...formData, price: Number(e.target.value)})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Stock Quantity
              </label>
              <input 
                className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold text-lg" 
                type="number" 
                value={formData.stock || 0} 
                onChange={e => setFormData({...formData, stock: Number(e.target.value)})}  required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Category
            </label>
            <input 
              className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold text-lg" 
              value={formData.category || ""} 
              onChange={e => setFormData({...formData, category: e.target.value})} 
              placeholder="e.g., Electronics, Clothing" required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Thumbnail URL
            </label>
            <input 
              className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold text-lg" 
              value={formData.thumbnail || ""} 
              onChange={e => setFormData({...formData, thumbnail: e.target.value})} 
              placeholder="https://example.com/image.jpg" required
            />
            {formData.thumbnail && (
              <div className="mt-4">
                <img 
                  src={formData.thumbnail} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-2xl border border-gray-100"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Description
            </label>
            <textarea 
              className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold text-base resize-none h-32" 
              value={formData.description || ""} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              placeholder="Product description..." required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit" 
              className="flex-1 bg-black text-white py-5 rounded-full font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl"
            >
              {editingProduct ? "Update Product" : "Create Product"}
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="px-10 py-5 bg-gray-100 text-gray-600 rounded-full font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}