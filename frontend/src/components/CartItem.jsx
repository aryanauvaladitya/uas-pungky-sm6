import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartItem({ item, onUpdateQuantity }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm mb-3 hover:border-red-100 transition-colors">
      <div className="flex-1 min-w-0 pr-3">
        <h4 className="font-medium text-gray-800 truncate">{item.nama}</h4>
        <p className="text-sm text-gray-500">Rp {item.harga.toLocaleString('id-ID')}</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <button 
            onClick={() => onUpdateQuantity(item.id, -1)}
            className="p-1.5 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            {item.jumlah > 1 ? <Minus size={16} /> : <Trash2 size={16} className="text-red-500" />}
          </button>
          
          <span className="w-8 text-center font-medium text-sm">
            {item.jumlah}
          </span>
          
          <button 
            onClick={() => onUpdateQuantity(item.id, 1)}
            className="p-1.5 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="text-right min-w-[70px]">
          <p className="font-semibold text-gray-800">
            Rp {(item.harga * item.jumlah).toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    </div>
  );
}
