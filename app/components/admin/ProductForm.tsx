// components/admin/ProductForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Product, Category } from "./types";
import ImageUploader from "../ImageUploader";
import DropZone from "../DropZone";
import { useImageUpload } from "../ImageUpload";

interface ProductFormProps {
  editingProduct: Product | null;
  formData: Partial<Product>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function ProductForm({
  editingProduct,
  formData,
  setFormData,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [sizesInput, setSizesInput] = useState<string>(
    formData.sizes ? (formData.sizes as string[]).join(",") : "",
  );
  const [colorsInput, setColorsInput] = useState<string>(
    formData.colors ? (formData.colors as string[]).join(",") : "",
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);
  console.log("Available categories:", categories);
  // Get selected category's subcategories
  const selectedCategory = categories.find(
    (cat) => cat.title === formData.category,
  );
  const availableSubcategories = selectedCategory?.subcategories || [];

  useEffect(() => {
    if (!loadingCategories && editingProduct && categories.length > 0) {
      const matchedCat = categories.find(
        (c) => c.title === editingProduct.category,
      );
      if (
        matchedCat &&
        matchedCat.subcategories &&
        matchedCat.subcategories.includes(editingProduct.subCategory || "")
      ) {
        setFormData((prev) => ({
          ...prev,
          subCategory: editingProduct.subCategory,
        }));
      }
    }
  }, [loadingCategories, categories, editingProduct, setFormData]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setFormData({
      ...formData,
      category: newCategory,
      subCategory: "",
    });
  };
  const { uploadImages, uploading, progress } = useImageUpload();

  const handleFilesSelected = async (files: File[]) => {
    // preview immediately
    const previews = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...previews],
    }));

    // upload
    const uploaded = await uploadImages(files);

    setFormData((prev) => ({
      ...prev,
      images: [
        ...(prev.images || []).filter((img) => !img.startsWith("blob:")),
        ...uploaded,
      ],
    }));
  };

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
          {editingProduct
            ? `Editing: ${editingProduct.title}`
            : "Add a new item to inventory"}
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
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, stock: Number(e.target.value) })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Category *
            </label>
            {loadingCategories ? (
              <div className="w-full bg-gray-50 p-5 rounded-2xl text-gray-400 font-bold text-lg">
                Loading categories...
              </div>
            ) : (
              <div className="relative">
                <select
                  value={formData.category || ""}
                  onChange={handleCategoryChange}
                  className="w-full bg-gray-50 border-none p-5 rounded-2xl font-bold text-lg appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Subcategory Dropdown - Only show if category has subcategories */}
          {formData.category && availableSubcategories.length > 0 && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                SubCategory
              </label>
              <div className="relative">
                <select
                  value={formData.subCategory || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, subCategory: e.target.value })
                  }
                  className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold text-lg appearance-none cursor-pointer"
                >
                  <option value="">Select a subCategory </option>
                  {availableSubcategories.map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <ImageUploader
              presetImage={formData.thumbnail}
              onImageUpload={(url) =>
                setFormData({ ...formData, thumbnail: url })
              }
            />
          </div>

          <div className="space-y-2">
            <DropZone
              images={formData.images || []}
              uploading={uploading}
              progress={progress}
              onFilesSelected={handleFilesSelected}
              onDeleteImage={(index) => {
                setFormData((prev) => ({
                  ...prev,
                  images: prev.images?.filter((_, i) => i !== index),
                }));
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Sizes
            </label>

            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="e.g. S, M, L or 4, 5, 6"
                value={sizesInput}
                // value={formData.sizes?.join(", ") || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setSizesInput(value);
                  setFormData({
                    ...formData,
                    sizes: value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean), // remove empty values
                  });
                }}
                className="w-full rounded-lg border border-zinc-200 px-4 py-2"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="color"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1"
            >
              Colors
            </label>

            <div className="flex flex-wrap gap-3">
              <input
                type="color"
                value={colorsInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setColorsInput(value);
                  setFormData({
                    ...formData,
                    colors: value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean), // remove empty values
                  });
                }}
                id="color"
                className="w-16 h-16 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Description
            </label>
            <textarea
              className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold text-base resize-none h-32"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Product description..."
              required
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
