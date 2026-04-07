// components/admin/Toast.tsx
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ToastProps {
  toast: { type: 'success' | 'error', text: string };
}

export default function Toast({ toast }: ToastProps) {
  return (
    <div className={`fixed top-5 right-5 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-5 ${
      toast.type === 'success' ? 'bg-black text-white' : 'bg-red-600 text-white'
    }`}>
      {toast.type === 'success' ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>}
      <span className="font-bold uppercase text-xs tracking-wide">{toast.text}</span>
    </div>
  );
}