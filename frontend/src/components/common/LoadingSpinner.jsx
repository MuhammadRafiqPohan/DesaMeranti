import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ text = 'Memuat data...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-500">
      <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-3" />
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}
