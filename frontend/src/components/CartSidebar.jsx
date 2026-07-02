import React from 'react';
import { ShoppingBag, UserCircle2 } from 'lucide-react';
import CartItem from './CartItem';

export default function CartSidebar({ 
  cart, 
  customerName, 
  setCustomerName, 
  updateQuantity, 
  handleCheckout, 
  isCheckout,
  subtotal,
  tax,
  total
}) {
  return (
    <div className="w-full md:w-[400px] lg:w-[450px] bg-white border-l border-gray-200 shadow-2xl flex flex-col h-screen z-20">
      <div className="p-6 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <ShoppingBag className="text-primary" /> Pesanan Saat Ini
        </h2>
      </div>

      <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex-shrink-0">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Pelanggan <span className="text-primary">*</span></label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserCircle2 size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Masukkan nama pelanggan..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <ShoppingBag size={48} className="mb-4 opacity-20" />
            <p className="font-medium">Belum ada menu di keranjang.</p>
            <p className="text-sm mt-1">Silakan pilih menu di samping.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {cart.map(item => (
              <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} />
            ))}
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>PPN (11%)</span>
            <span className="font-medium">Rp {tax.toLocaleString('id-ID')}</span>
          </div>
          <div className="pt-3 border-t border-gray-200 border-dashed flex justify-between items-center">
            <span className="font-bold text-gray-800">Total</span>
            <span className="text-2xl font-bold text-primary">
              Rp {total.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={cart.length === 0 || isCheckout}
          className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center transition-all duration-300 shadow-lg ${
            cart.length === 0 || isCheckout
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              : 'bg-primary hover:bg-red-600 text-white hover:shadow-red-500/30'
          }`}
        >
          {isCheckout ? (
            <span className="animate-pulse">Memproses...</span>
          ) : (
            'Bayar Pesanan'
          )}
        </button>
      </div>
    </div>
  );
}
