"use client";

import React, { useState, useEffect } from 'react';
import NavigationTabs from './NavigationTabs';
import Image from 'next/image';
import Chicken from '../../assets/fashion-chicken.png'; 
import { useFetch } from '../customHooks/useFetch';

interface KeyInventoryProps {
  hideNavigation?: boolean;
}

interface InventoryItem {
  name: string;
  price: number;
  status: string;
  current: number;
  capacity: number;
  category: string;
  threshold?: number;
}

interface BackendStock {
  stock: {
    ingredientid: number;
    ingredientname: string;
    stock: {
      stockid: number;
      quantity: number;
      cost: string;
      isexpired: boolean;
      receivedtimestamp: string;
      expirationdate: string;
    }[];
    thresholdquantity: number;
    category: string;
    costperunit: string;
    shelflife: number;
    servingSize: string;
  }[];
}

const KeyInventory: React.FC<KeyInventoryProps> = ({ hideNavigation = false }) => {
  const [activeTab, setActiveTab] = useState('Key Inventory');
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [isUsingSampleData, setIsUsingSampleData] = useState<boolean>(false);
  
  // Fetch data from backend
  const { data, isPending, error } = useFetch<BackendStock>('stocks');

  // Sample data for fallback/development
  const getSampleInventoryData = (): InventoryItem[] => [
    { name: 'Regular Bun', price: 0.50, status: 'In Stock', current: 100, capacity: 250, threshold: 125, category: 'Buns' },
    { name: 'No Bun', price: 0.00, status: 'Always Available', current: 0, capacity: 0, threshold: 0, category: 'Buns' },
    { name: 'Crispy Patty', price: 1.20, status: 'In Stock', current: 75, capacity: 200, threshold: 100, category: 'Patties' },
    { name: 'Spicy Patty', price: 1.30, status: 'Out of Stock', current: 50, capacity: 200, threshold: 100, category: 'Patties' },
    { name: 'Grilled Patty', price: 1.40, status: 'In Stock', current: 60, capacity: 200, threshold: 100, category: 'Patties' },
    { name: 'Single Serving Nuggets', price: 0.80, status: 'In Stock', current: 90, capacity: 300, threshold: 150, category: 'Chicken' },
    { name: 'Double Serving Nuggets', price: 1.50, status: 'Out of Stock', current: 70, capacity: 300, threshold: 150, category: 'Chicken' },
    { name: 'Single Serving Chicken Strips', price: 1.20, status: 'In Stock', current: 85, capacity: 300, threshold: 150, category: 'Chicken' },
    { name: 'Single Fries', price: 0.60, status: 'Well Stocked', current: 200, capacity: 400, threshold: 200, category: 'Fries' },
    { name: 'Deluxe Fries', price: 0.90, status: 'In Stock', current: 150, capacity: 300, threshold: 150, category: 'Fries' },
    { name: 'American Cheese Slice', price: 0.30, status: 'In Stock', current: 120, capacity: 250, threshold: 125, category: 'Cheese' },
    { name: 'Shredded American Cheese', price: 0.40, status: 'Low Stock', current: 80, capacity: 200, threshold: 100, category: 'Cheese' },
    { name: 'Pepper Jack Cheese Slice', price: 0.35, status: 'In Stock', current: 110, capacity: 250, threshold: 125, category: 'Cheese' },
    { name: 'Shredded Pepper Jack Cheese', price: 0.45, status: 'In Stock', current: 90, capacity: 200, threshold: 100, category: 'Cheese' },
    { name: 'Lettuce', price: 0.25, status: 'In Stock', current: 200, capacity: 500, threshold: 250, category: 'Produce' },
    { name: 'Tomato', price: 0.50, status: 'Low Stock', current: 150, capacity: 400, threshold: 200, category: 'Produce' },
    { name: 'Onion', price: 0.30, status: 'In Stock', current: 180, capacity: 400, threshold: 200, category: 'Produce' },
    { name: 'Pickles', price: 0.20, status: 'Well Stocked', current: 250, capacity: 500, threshold: 250, category: 'Produce' },
    { name: 'Ketchup', price: 0.10, status: 'Well Stocked', current: 350, capacity: 600, threshold: 300, category: 'Condiments' },
    { name: 'Mustard', price: 0.10, status: 'Well Stocked', current: 320, capacity: 600, threshold: 300, category: 'Condiments' },
    { name: 'Mayo', price: 0.10, status: 'Well Stocked', current: 400, capacity: 600, threshold: 300, category: 'Condiments' },
    { name: 'Special Sauce', price: 0.15, status: 'In Stock', current: 280, capacity: 500, threshold: 250, category: 'Condiments' },
    { name: 'Ranch', price: 0.15, status: 'In Stock', current: 260, capacity: 500, threshold: 250, category: 'Condiments' },
    { name: 'BBQ Sauce', price: 0.15, status: 'Well Stocked', current: 300, capacity: 600, threshold: 300, category: 'Condiments' },
  ];

  // Transform backend data to match our format
  const transformStockData = (data: BackendStock): InventoryItem[] => {
    if (!data || !data.stock || !Array.isArray(data.stock)) {
      console.log("Invalid data format:", data);
      return [];
    }
    
    return data.stock.map(ingredient => {
      // Calculate total quantity from all stock items that aren't expired
      const validStock = ingredient.stock.filter(item => !item.isexpired);
      const currentQuantity = validStock.reduce((total, item) => total + item.quantity, 0);
      
      // Calculate total capacity (we'll use 2x threshold)
      const capacity = ingredient.thresholdquantity * 2;
      
      // Determine status based on quantity and threshold
      let status = 'In Stock';
      if (ingredient.ingredientname === "No Bun") {
        status = 'Always Available';
      } else if (currentQuantity === 0) {
        status = 'Out of Stock';
      } else if (currentQuantity <= ingredient.thresholdquantity * 0.8) {
        status = 'Low Stock';
      } else if (currentQuantity <= ingredient.thresholdquantity * 1.2) {
        status = 'In Stock';
      } else {
        status = 'Well Stocked';
      }
      
      return {
        name: ingredient.ingredientname,
        price: parseFloat(ingredient.costperunit),
        status,
        current: currentQuantity,
        capacity,
        category: ingredient.category,
        threshold: ingredient.thresholdquantity
      };
    });
  };

  // Process data when it's available
  useEffect(() => {
    if (data) {
      // Transform the backend data to match our expected format
      const transformedData = transformStockData(data);
      setInventoryData(transformedData);
      setIsUsingSampleData(false);
    } else if (error) {
      // Load sample data if there's an error
      console.error('Failed to fetch inventory data:', error);
      setInventoryData(getSampleInventoryData());
      setIsUsingSampleData(true);
    }
  }, [data, error]);

  // Get all unique categories from the inventory data
  const getCategories = () => {
    const categories = inventoryData.map(item => item.category);
    return [...new Set(categories)];
  };

  // Group inventory items by category
  const getItemsByCategory = () => {
    const categories = getCategories();
    const itemsByCategory: { [key: string]: InventoryItem[] } = {};
    
    categories.forEach(category => {
      itemsByCategory[category] = inventoryData.filter(item => 
        item.category === category 
      );
    });
    
    return itemsByCategory;
  };

  // Get status color for the items
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

  // Customer support data
  const customerSupport = {
    name: 'Tabitha Hill',
    email: 'T.Hill@OurCompany.com',
    phone: '(770)554-9089'
  };

  // Group the items by category
  const itemsByCategory = getItemsByCategory();

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col bg-gray-50">
      {!hideNavigation && (
        <>
          {/* Account Number Header */}
          <div className="text-right p-4">
            <p className="text-sm text-gray-700">Account Number: A802JDJKH20978D</p>
          </div>

          {/* Navigation Tabs Component */}
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}

      {/* Main Content */}
      <div className="px-4 pb-8">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
            Available Ingredients
            {isUsingSampleData && <span className="text-xs text-gray-500 ml-2">(Sample Data)</span>}
          </h1>
        </div>

        {/* Loading state */}
        {isPending && (
          <div className="flex justify-center items-center h-[300px]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error message */}
        {error && !isUsingSampleData && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
            <p>Failed to load inventory data. Using sample data instead.</p>
          </div>
        )}

        {/* Ingredients Listing - Scrollable */}
        {!isPending && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="max-h-[400px] overflow-y-auto pr-2">
              {Object.keys(itemsByCategory).length > 0 ? (
                Object.entries(itemsByCategory).map(([category, items]) => (
                  items.length > 0 && (
                    <div key={category} className="mb-6 last:mb-0">
                      <h2 className="font-bold text-gray-800 mb-2 border-b pb-1">{category.toUpperCase()}</h2>
                      <div className="pl-2">
                        {items.map((item, index) => (
                          <div key={index} className="mb-1 flex items-center">
                            <span className={`mr-2 font-medium ${getStatusColor(item.status)}`}>•</span>
                            <span className="text-gray-700">{item.name}</span>
                            <span className={`ml-2 text-sm ${getStatusColor(item.status)}`}>
                              ({item.status})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                </div>
              )}
            </div>
            
            {/* Scroll indicator */}
            <div className="text-center text-gray-500 mt-4">
              <div className="mx-auto w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-gray-400 border-r-[10px] border-r-transparent"></div>
            </div>
          </div>
        )}

         {/* Customer Support Section */}
         <div className="bg-white rounded-lg shadow-sm p-6 inline-block mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Need Assistance?</h2>

          <div className="flex flex-col items-center">
            {/* Image */}
            <div className="mb-4">
              <div className="w-32 h-32 bg-gray-100 flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={Chicken}
                  alt="Chicken CEO"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Support info */}
            <div className="text-center">
              <h3 className="font-bold text-gray-700 mb-2">Your Customer Support Rep</h3>
              <p className="mb-1 text-gray-800">{customerSupport.name}</p>
              <p className="mb-1 text-blue-600">{customerSupport.email}</p>
              <p className="mb-3 text-gray-800">{customerSupport.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyInventory;