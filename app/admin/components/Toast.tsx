"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-sm transition-all duration-300 animate-slide-in
        ${type === "success"
          ? "bg-green-500/20 border-green-500/40 text-green-300"
          : "bg-red-500/20 border-red-500/40 text-red-300"
        }`}
    >
      {type === "success"
        ? <CheckCircle className="w-5 h-5 flex-shrink-0" />
        : <XCircle className="w-5 h-5 flex-shrink-0" />
      }
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
