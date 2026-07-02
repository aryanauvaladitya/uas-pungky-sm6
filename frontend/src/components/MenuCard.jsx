import React from 'react';
import { Plus } from 'lucide-react';

import imgStrawberry from '../assets/strawberry.jpg';
import imgLychee from '../assets/lychee.jpg';
import imgTea from '../assets/tea.jpg';
import imgTelur from '../assets/telur.jpg';
import imgMayo from '../assets/mayo.jpg';
import imgSalad from '../assets/salad.jpg';
import imgEbi from '../assets/ebi.jpg';
import imgKatsu from '../assets/katsu.jpg';
import imgBeef from '../assets/beef.jpg';
import imgTeriyaki from '../assets/teriyaki.jpg';
import imgSpicy from '../assets/spicy.jpg';
import imgMix from '../assets/mix.jpg';
import imgDefault from '../assets/default.jpg';

export default function MenuCard({ menu, onAdd }) {
  // Mapping gambar berdasarkan nama menu 
  const getImageUrl = (name) => {
    const n = name.toLowerCase();
    
    // Minuman
    if (n.includes('strawberry')) return imgStrawberry;
    if (n.includes('lychee')) return imgLychee;
    if (n.includes('tea') || n.includes('es ') || n.includes('minum')) return imgTea;
    
    // Topping & Side Dish
    if (n.includes('telur') || n.includes('egg roll')) return imgTelur;
    if (n.includes('mayo')) return imgMayo;
    if (n.includes('salad')) return imgSalad;
    if (n.includes('ebi furay') || n.includes('shrimp')) return imgEbi;
    if (n.includes('ekkado')) return imgTelur; // using egg image for ekkado
    
    // Menu Utama - Paket Mix & Hemat
    if (n === 'hemat a') return imgDefault;
    if (n === 'mix b') return imgBeef;
    if (n === 'mix c') return imgTeriyaki;
    if (n === 'mix d') return imgEbi;
    if (n === 'mix e') return imgMix;
    
    // Menu Utama - Ala Carte
    if (n === 'chicken teriyaki a') return imgTeriyaki;
    if (n === 'chicken teriyaki b') return imgSalad; // variation with salad
    if (n === 'beef teriyaki a') return imgBeef;
    if (n === 'beef teriyaki b') return imgMix;
    if (n.includes('katsu')) return imgKatsu;
    if (n.includes('spicy')) return imgSpicy;
    
    // Fallback
    return imgDefault;
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer" onClick={() => onAdd(menu)}>
      <div className="h-40 overflow-hidden bg-gray-100 relative">
        <img 
          src={getImageUrl(menu.nama)} 
          alt={menu.nama} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>
      
      <div className="p-4 flex flex-col flex-grow justify-between bg-white relative">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg leading-tight mb-1">{menu.nama}</h3>
          <p className="text-primary font-bold">Rp {menu.harga.toLocaleString('id-ID')}</p>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAdd(menu);
          }}
          className="mt-4 flex items-center justify-center w-full bg-red-50 hover:bg-primary text-primary hover:text-white py-2 rounded-xl font-medium transition-colors duration-200"
        >
          <Plus size={18} className="mr-1" /> Add
        </button>
      </div>
    </div>
  );
}
