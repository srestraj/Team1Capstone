"use client";

export default function Header({ onAdd }: any) {
  return (
    <div className="flex justify-between mb-8">
      <h1 className="text-3xl font-bold">Inventory</h1>

      <button
        onClick={onAdd}
        className="bg-black text-white px-5 py-2 rounded"
      >
        + Add Product
      </button>
    </div>
  );
}
