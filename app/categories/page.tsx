"use client";

import { useEffect, useState } from "react";

type Category = {
  _id: string;
  title: string;
  subcategories: string[];
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleSubmit() {
    setLoading(true);
    const body = {
      title,
      subcategories: subcategories.split(",").map((s) => s.trim()).filter(Boolean),
    };

    if (editId) {
      await fetch(`/api/categories/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setEditId(null);
    } else {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    setTitle("");
    setSubcategories("");
    setLoading(false);
    fetchCategories();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  }

  function handleEdit(category: Category) {
    setEditId(category._id);
    setTitle(category.title);
    setSubcategories(category.subcategories.join(", "));
  }

  function handleCancel() {
    setEditId(null);
    setTitle("");
    setSubcategories("");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-12 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-black dark:text-white mb-8">
          Categories
        </h1>

        {/* Form */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm mb-8 flex flex-col gap-4">
          <h2 className="text-lg font-medium text-black dark:text-white">
            {editId ? "Edit Category" : "Add Category"}
          </h2>

          <input
            type="text"
            placeholder="Title (e.g. Jackets)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-2 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />

          <input
            type="text"
            placeholder="Subcategories (comma separated, e.g. Bomber, Summer)"
            value={subcategories}
            onChange={(e) => setSubcategories(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-2 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading || !title}
              className="rounded-full bg-black dark:bg-white text-white dark:text-black px-6 py-2 font-medium hover:opacity-80 disabled:opacity-40 transition"
            >
              {loading ? "Saving..." : editId ? "Update" : "Add"}
            </button>

            {editId && (
              <button
                onClick={handleCancel}
                className="rounded-full border border-zinc-300 dark:border-zinc-600 px-6 py-2 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-black dark:text-white"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          {categories.length === 0 && (
            <p className="text-zinc-400 text-center py-8">No categories yet. Add one above!</p>
          )}

          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm flex items-start justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white">{cat.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cat.subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full px-3 py-1"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(cat)}
                  className="text-sm rounded-full border border-zinc-300 dark:border-zinc-600 px-4 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-black dark:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="text-sm rounded-full border border-red-300 text-red-500 px-4 py-1.5 hover:bg-red-50 dark:hover:bg-red-950 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}