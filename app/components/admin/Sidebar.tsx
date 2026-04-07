// components/admin/Sidebar.tsx
import { LayoutDashboard, Package, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black p-6 flex flex-col shadow-2xl">
      <div className="flex-1">
        <h1 className="text-white text-2xl font-black mb-10 tracking-tighter">SHOP.CO</h1>
        <nav className="space-y-2">
          <a href="#" className="flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold bg-white text-black shadow-lg">
            <LayoutDashboard size={20}/> <span className="uppercase text-[11px] tracking-widest">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-gray-500 hover:text-white hover:bg-white/5">
            <Package size={20}/> <span className="uppercase text-[11px] tracking-widest">Products</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-gray-500 hover:text-white hover:bg-white/5">
            <Settings size={20}/> <span className="uppercase text-[11px] tracking-widest">Settings</span>
          </a>
        </nav>
      </div>

      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            v1.2 Stable
          </span>
        </div>
      </div>
    </aside>
  );
}