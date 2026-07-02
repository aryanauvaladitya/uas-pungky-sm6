import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import MenuCatalog from './components/MenuCatalog';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
const API_BASE = 'http://127.0.0.1:8000/api';

function App() {
  const [menuData, setMenuData] = useState({ utama: [], topping: [], minuman: [] });
  const [activeTab, setActiveTab] = useState('utama');
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCheckout, setIsCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(`${API_BASE}/menu`);
      if (response.data.success) {
        setMenuData(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching menus", err);
      setError("Gagal memuat data menu dari server. Pastikan backend Laravel berjalan.");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (menu) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === menu.id);
      if (existing) {
        return prev.map(item =>
          item.id === menu.id ? { ...item, jumlah: item.jumlah + 1 } : item
        );
      }
      return [...prev, { ...menu, jumlah: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newJumlah = item.jumlah + delta;
          return newJumlah > 0 ? { ...item, jumlah: newJumlah } : null;
        }
        return item;
      }).filter(Boolean); // removes nulls
    });
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);
  const tax = subtotal * 0.11; // 11% PPN
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (!customerName.trim()) {
      alert("Masukkan nama pelanggan terlebih dahulu!");
      return;
    }

    if (cart.length === 0) return;

    setIsCheckout(true);
    try {
      const payload = {
        customerName,
        cart: cart.map(item => ({ nama: item.nama, harga: item.harga, jumlah: item.jumlah }))
      };

      const response = await axios.post(`${API_BASE}/checkout`, payload);

      if (response.data.success) {
        setReceipt(response.data.receipt_no);
        setCart([]);
        setCustomerName('');
      } else {
        alert(response.data.message || "Gagal checkout");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Terjadi kesalahan saat checkout");
    } finally {
      setIsCheckout(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden">
      
      {/* LEFT SECTION: Menu Catalog */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <MenuCatalog 
          error={error} 
          loading={loading} 
          menuData={menuData} 
          activeTab={activeTab} 
          onAdd={addToCart} 
        />
      </div>

      {/* RIGHT SECTION: Cart */}
      <CartSidebar 
        cart={cart}
        customerName={customerName}
        setCustomerName={setCustomerName}
        updateQuantity={updateQuantity}
        handleCheckout={handleCheckout}
        isCheckout={isCheckout}
        subtotal={subtotal}
        tax={tax}
        total={total}
      />

      {/* Success Modal Overlay */}
      <CheckoutModal receipt={receipt} setReceipt={setReceipt} />

    </div>
  );
}

export default App;
