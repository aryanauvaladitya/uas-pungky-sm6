import React from 'react';
import MenuCard from './MenuCard';

export default function MenuCatalog({ error, loading, menuData, activeTab, onAdd }) {
  return (
    <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 font-medium mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className="bg-white h-64 rounded-2xl border border-gray-100 shadow-sm animate-pulse flex flex-col">
              <div className="h-40 bg-gray-200 rounded-t-2xl"></div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded-xl mt-4"></div>
              </div>
            </div>
          ))
        ) : (
          menuData[activeTab]?.map(menu => (
            <MenuCard key={menu.id} menu={menu} onAdd={onAdd} />
          ))
        )}
      </div>
    </div>
  );
}
