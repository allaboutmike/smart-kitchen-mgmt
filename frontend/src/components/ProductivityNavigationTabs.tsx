"use client";

import React from 'react';

interface ProductivityNavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProductivityNavigationTabs: React.FC<ProductivityNavigationTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ['Productivity Metrics', 'Waste Metrics'];
  
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-white rounded-md shadow-sm inline-flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm ${
              activeTab === tab
                ? 'text-blue-600 font-medium bg-blue-50'
                : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductivityNavigationTabs;