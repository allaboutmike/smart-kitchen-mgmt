"use client";

import React, { useState, useEffect } from 'react';

interface WasteItem {
  wasteid: number;
  stockid: number;
  reason: string;
  wastetimestamp: string;
  quantity: number;
  ingredientName?: string;
  category?: string;
  wasteCost?: number;
}

export const WasteTrackingTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [wasteData, setWasteData] = useState<WasteItem[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  
  // Using sample data for now til we have the waste endpoint
  const getSampleWasteData = (): WasteItem[] => [
    { 
      wasteid: 130, 
      stockid: 15, 
      reason: 'Expired', 
      wastetimestamp: '2025-03-12 22:46:57.625 -0500', 
      quantity: 72,
      ingredientName: 'Regular Bun',
      category: 'Buns',
      wasteCost: 17.28
    },
    { 
      wasteid: 131, 
      stockid: 64, 
      reason: 'Expired', 
      wastetimestamp: '2025-03-11 14:22:37.625 -0500', 
      quantity: 59,
      ingredientName: 'Regular Bun',
      category: 'Buns',
      wasteCost: 14.16
    },
    { 
      wasteid: 132, 
      stockid: 67, 
      reason: 'Over-prepped', 
      wastetimestamp: '2025-03-10 10:15:27.625 -0500', 
      quantity: 52,
      ingredientName: 'Regular Bun',
      category: 'Buns',
      wasteCost: 12.48
    },
    { 
      wasteid: 133, 
      stockid: 80, 
      reason: 'Expired', 
      wastetimestamp: '2025-03-09 18:33:17.625 -0500', 
      quantity: 19,
      ingredientName: 'Regular Bun',
      category: 'Buns',
      wasteCost: 4.56
    },
    { 
      wasteid: 134, 
      stockid: 99, 
      reason: 'Expired', 
      wastetimestamp: '2025-03-08 09:26:47.625 -0500', 
      quantity: 35,
      ingredientName: 'Crispy Patty',
      category: 'Patties',
      wasteCost: 43.75
    },
    { 
      wasteid: 135, 
      stockid: 177, 
      reason: 'Over-prepped', 
      wastetimestamp: '2025-03-07 16:58:27.625 -0500', 
      quantity: 16,
      ingredientName: 'Crispy Patty',
      category: 'Patties',
      wasteCost: 20.00
    },
    { 
      wasteid: 136, 
      stockid: 47, 
      reason: 'Over-prepped', 
      wastetimestamp: '2025-03-06 11:42:17.625 -0500', 
      quantity: 44,
      ingredientName: 'Spicy Patty',
      category: 'Patties',
      wasteCost: 63.80
    },
    { 
      wasteid: 137, 
      stockid: 60, 
      reason: 'Over-prepped', 
      wastetimestamp: '2025-03-05 14:26:37.625 -0500', 
      quantity: 28,
      ingredientName: 'Spicy Patty',
      category: 'Patties',
      wasteCost: 40.60
    },
    { 
      wasteid: 138, 
      stockid: 85, 
      reason: 'Expired', 
      wastetimestamp: '2025-03-04 17:19:47.625 -0500', 
      quantity: 22,
      ingredientName: 'Spicy Patty',
      category: 'Patties',
      wasteCost: 31.90
    },
    { 
      wasteid: 139, 
      stockid: 13, 
      reason: 'Over-prepped', 
      wastetimestamp: '2025-03-03 08:47:27.625 -0500', 
      quantity: 17,
      ingredientName: 'Grilled Patty',
      category: 'Patties',
      wasteCost: 27.54
    },
    { 
      wasteid: 140, 
      stockid: 29, 
      reason: 'Over-prepped', 
      wastetimestamp: '2025-03-02 12:36:17.625 -0500', 
      quantity: 14,
      ingredientName: 'Grilled Patty',
      category: 'Patties',
      wasteCost: 22.68
    },
    { 
      wasteid: 141, 
      stockid: 25, 
      reason: 'Expired', 
      wastetimestamp: '2025-03-01 15:22:37.625 -0500', 
      quantity: 8,
      ingredientName: 'Grilled Patty',
      category: 'Patties',
      wasteCost: 12.96
    }
  ];

  // Load sample data on mount
  useEffect(() => {
    const sampleData = getSampleWasteData();
    setWasteData(sampleData);
    
    // Calculate total cost
    const total = sampleData.reduce((sum, item) => sum + (item.wasteCost || 0), 0);
    setTotalCost(total);
  }, []);

  // Format timestamp for readability
  const formatTimestamp = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch {
      // Empty catch block with no parameter
      return timestamp; 
    }
  };
  
  // Filter items based on search term
  const filteredItems = wasteData.filter(item => 
    item.wasteid.toString().includes(searchTerm) || 
    item.stockid.toString().includes(searchTerm) ||
    (item.reason && item.reason.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.ingredientName && item.ingredientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Get reason color
  const getReasonColor = (reason: string): string => {
    switch (reason) {
      case 'Expired': return 'text-red-500';
      case 'Over-prepped': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };
  
  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col h-full pb-10">
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-2">
          Waste Tracking
          <span className="text-xs text-gray-500 block mt-1">(Sample Data)</span>
        </h1>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-white p-3 rounded-lg shadow">
            <h2 className="text-md font-semibold text-gray-700">Total Waste Cost</h2>
            <p className="text-xl font-bold text-blue-600">${totalCost.toFixed(2)}</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow">
            <h2 className="text-md font-semibold text-gray-700">Waste Records</h2>
            <p className="text-xl font-bold text-blue-600">{wasteData.length}</p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search waste records..."
          className="w-full p-2 rounded-lg border border-gray-300 bg-gray-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="h-[350px] overflow-y-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-white">
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="py-1 px-2 text-left text-blue-500">Waste ID</th>
                <th className="py-1 px-2 text-left text-blue-500">Ingredient</th>
                <th className="py-1 px-2 text-left text-blue-500">Category</th>
                <th className="py-1 px-2 text-left text-blue-500">Reason</th>
                <th className="py-1 px-2 text-left text-blue-500">Timestamp</th>
                <th className="py-1 px-2 text-left text-blue-500">Quantity</th>
                <th className="py-1 px-2 text-left text-blue-500">Cost</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.wasteid} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-1 px-2 text-blue-600">{item.wasteid}</td>
                    <td className="py-1 px-2 font-medium">{item.ingredientName || 'Unknown'}</td>
                    <td className="py-1 px-2">{item.category || 'Unknown'}</td>
                    <td className={`py-1 px-2 ${getReasonColor(item.reason)}`}>
                      {item.reason}
                    </td>
                    <td className="py-1 px-2">
                      {formatTimestamp(item.wastetimestamp)}
                    </td>
                    <td className="py-1 px-2">
                      {item.quantity}
                    </td>
                    <td className="py-1 px-2 font-medium">
                      ${item.wasteCost?.toFixed(2) || '0.00'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-3 text-center text-gray-500">
                    {searchTerm ? 'No matching waste records found' : 'No waste records available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WasteTrackingTable;