import React from 'react';
import { Coffee, UtensilsCrossed, CircleDot } from 'lucide-react';

const tabs = [
  { id: 'utama', label: 'Menu Utama', icon: <UtensilsCrossed size={18} /> },
  { id: 'topping', label: 'Topping', icon: <CircleDot size={18} /> },
  { id: 'minuman', label: 'Minuman', icon: <Coffee size={18} /> },
];

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-gray-200 shadow-sm z-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">TASSS<span className="text-primary">POS</span></h1>
        <p className="text-sm text-gray-500 font-medium mt-0.5">Sistem Kasir Modern</p>
      </div>
      <div className="flex bg-gray-100 p-1 rounded-xl">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-white text-primary shadow-sm ring-1 ring-black/5'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}
