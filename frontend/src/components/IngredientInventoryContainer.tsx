"use client";

import React, { useState, useEffect } from 'react';

interface InventoryItem {
  name: string;
  price: number;
  status: string;
  current: number;
  capacity: number;
  category: string;
  threshold?: number;
}

export const IngredientInventoryContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingSampleData, setIsUsingSampleData] = useState<boolean>(false);

  // Sample data for fallback/development
  const getSampleInventoryData = (): InventoryItem[] => [

    { name: 'Regular Bun', price: 0.50, status: 'In Stock', current: 100, capacity: 250, threshold: 125, category: 'Buns' },
    { name: 'No Bun', price: 0.00, status: 'Always Available', current: 0, capacity: 0, threshold: 0, category: 'Buns' },
    
    { name: 'Crispy Patty', price: 1.20, status: 'In Stock', current: 75, capacity: 200, threshold: 100, category: 'Patties' },
    { name: 'Spicy Patty', price: 1.30, status: 'Out of Stock', current: 50, capacity: 200, threshold: 100, category: 'Patties' },
    { name: 'Grilled Patty', price: 1.40, status: 'In Stock', current: 60, capacity: 200, threshold: 100, category: 'Patties' },
    
    { name: 'Single Serving Nuggets', price: 0.80, status: 'In Stock', current: 90, capacity: 300, threshold: 150, category: 'Chicken' },
    { name: 'Double Serving Nuggets', price: 1.50, status: 'Out of Stock', current: 70, capacity: 300, threshold: 150, category: 'Chicken' },
    
    { name: 'Lettuce', price: 0.25, status: 'In Stock', current: 200, capacity: 500, threshold: 250, category: 'Produce' },
    { name: 'Tomato', price: 0.50, status: 'Low Stock', current: 150, capacity: 400, threshold: 200, category: 'Produce' },
    { name: 'Cheese Slice', price: 0.30, status: 'In Stock', current: 80, capacity: 200, threshold: 100, category: 'Cheese' },
    { name: 'BBQ Sauce', price: 0.15, status: 'Well Stocked', current: 300, capacity: 600, threshold: 300, category: 'Sauces' },
    { name: 'Mayo', price: 0.10, status: 'Well Stocked', current: 400, capacity: 600, threshold: 300, category: 'Sauces' },
  ];

  // Fetch data from the backend
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stock');
        
        if (response.status === 404) {
          // If API endpoint not found, use sample data
          console.warn('API endpoint not found (404); using sample data instead.');
          const sampleData = getSampleInventoryData();
          setInventoryData(processInventoryData(sampleData));
          setIsUsingSampleData(true);
          setError(null);
          return;
        }
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setInventoryData(processInventoryData(data));
        setIsUsingSampleData(false);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch inventory data:', err);
        
        // Load sample data for any error
        const sampleData = getSampleInventoryData();
        setInventoryData(processInventoryData(sampleData));
        setIsUsingSampleData(true);
        
        // Set error message for debugging
        setError('Failed to load inventory data from API; using sample data instead.');
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, []);

  // Process inventory data and calculate statuses
  const processInventoryData = (data: InventoryItem[]): InventoryItem[] => {
    return data.map(item => {
      // Skip "Always Available" items
      if (item.status === 'Always Available') return item;
      
      //threasholds obtained through python scripts 
      const threshold = item.threshold || item.capacity / 2; // Default threshold is half capacity
      
      if (item.current === 0) {
        return { ...item, status: 'Out of Stock' };
      } else if (item.current <= threshold * 0.8) {
        // Below threshold (0-80% of threshold)
        return { ...item, status: 'Low Stock' };
      } else if (item.current <= threshold * 1.2) {
        // Around threshold (80-120% of threshold)
        return { ...item, status: 'In Stock' };
      } else {
        // Above threshold (120-200% of threshold)
        return { ...item, status: 'Well Stocked' };
      }
    });
  };
  
  // Filter items based on search term
  const filteredItems = inventoryData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get status color for text
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Well Stocked': return 'text-green-500';
      case 'In Stock': return 'text-blue-500';
      case 'Low Stock': return 'text-yellow-500';
      case 'Out of Stock': return 'text-red-500';
      case 'Always Available': return 'text-blue-500';
      default: return '';
    }
  };
  
  // Get appropriate progress bar width and color
  const getProgressBar = (item: InventoryItem) => {
    if (item.capacity === 0) return null;
    
    const threshold = item.threshold || item.capacity / 2;
    let width = '30%';
    let color = 'bg-red-500';
    
    if (item.status === 'Well Stocked') {
      width = '80%';
      color = 'bg-green-500';
    } else if (item.status === 'In Stock') {
      width = '50%';
      color = 'bg-blue-500';
    } else if (item.status === 'Low Stock') {
      width = '30%';
      color = 'bg-yellow-500';
    } else if (item.status === 'Out of Stock') {
      width = '10%';
      color = 'bg-red-500';
    }
    
    return (
      <div className="w-28 bg-gray-300 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color}`}
          style={{ width }}
        ></div>
      </div>
    );
  };
  
  const currentDate = new Date();
  const formattedDate = `Tuesday, March 11, 2025 ${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')} PM`;
  
  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col h-full">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-4">
          Ingredients Inventory
          {isUsingSampleData && <span className="text-xs text-gray-500 block mt-1">(Sample Data)</span>}
        </h1>
        <input
          type="text"
          placeholder="Search ingredients..."
          className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="h-[400px] overflow-y-auto">
            {error && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 mb-2">
                <p className="text-sm">{error}</p>
              </div>
            )}
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-white">
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="py-2 px-3 text-left text-blue-500">Item</th>
                  <th className="py-2 px-3 text-left text-blue-500">Price</th>
                  <th className="py-2 px-3 text-left text-blue-500">Status</th>
                  <th className="py-2 px-3 text-left text-blue-500">Stock Level</th>
                  <th className="py-2 px-3 text-left text-blue-500">Quantity</th>
                  <th className="py-2 px-3 text-left text-blue-500">Threshold</th>
                  <th className="py-2 px-3 text-left text-blue-500">Category</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-3 text-blue-600">{item.name}</td>
                      <td className="py-2 px-3">${item.price.toFixed(2)}</td>
                      <td className={`py-2 px-3 ${getStatusColor(item.status)}`}>
                        {item.status}
                      </td>
                      <td className="py-2 px-3">
                        {getProgressBar(item) || <span>N/A</span>}
                      </td>
                      <td className="py-2 px-3">
                        {item.capacity > 0 ? `${item.current}/${item.capacity}` : 'N/A'}
                      </td>
                      <td className="py-2 px-3">
                        {item.threshold || 'N/A'}
                      </td>
                      <td className="py-2 px-3">
                        {item.category}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-gray-500">
                      {searchTerm ? 'No matching items found' : 'No inventory items available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientInventoryContainer;