"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useFetch } from '../customHooks/useFetch';
import { useMutation } from '@/customHooks/useMutation'

interface InventoryItem {
  ingredientid: number;
  name: string;
  price: number;
  status: string;
  current: number;
  capacity: number;
  category: string;
  threshold: number;
  shelflife: number;
  bulkOrderQuantity: number;
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
    bulkOrderQuantity: number;
  }[];
}

interface IngredientType {
  name: string;
  ingredientid: number;
  current: number;
  price: number;
  shelflife: number;
  bulkOrderQuantity: number;
}

export const IngredientInventoryContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [isUsingSampleData, setIsUsingSampleData] = useState<boolean>(false);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientType | null>(null);

  const modalRef = useRef<HTMLDialogElement>(null);
  const { updateData: updateStock } = useMutation("POST", "stocks");
  
  const { data, isPending, error } = useFetch<BackendStock>('stocks');

  const handleOrderClick = (item: IngredientType) => {
    setSelectedIngredient(item);
    modalRef.current?.showModal();
  };

  const handleConfirmOrder = async () => {
    if (!selectedIngredient) return;
    
    // Use the updateStock function
    const res = await updateStock({
      ingredientId: selectedIngredient.ingredientid,
      current: selectedIngredient.current,
      price: selectedIngredient.price,
      shelfLife: selectedIngredient.shelflife,
      bulkOrderQuantity: selectedIngredient.bulkOrderQuantity,
      
    });
    if(res.success) {
      console.log(`Successfully ordered ${selectedIngredient.name}`);
      modalRef.current?.close();
      // Clear selected ingredient after order
      setSelectedIngredient(null);
    };
  };


  // Sample data for fallback/development
  const getSampleInventoryData = (): InventoryItem[] => [
    { ingredientid: 1, name: 'Regular Bun', price: 0.50, status: 'In Stock', current: 100, capacity: 250, threshold: 125, category: 'Buns', shelflife: 7, bulkOrderQuantity: 75 },
    { ingredientid: 2, name: 'No Bun', price: 0.00, status: 'Always Available', current: 0, capacity: 0, threshold: 0, category: 'Buns', shelflife: 6, bulkOrderQuantity: 75 },
    
    { ingredientid: 3, name: 'Crispy Patty', price: 1.20, status: 'In Stock', current: 75, capacity: 200, threshold: 100, category: 'Patties', shelflife: 5, bulkOrderQuantity: 75 },
    { ingredientid: 4, name: 'Spicy Patty', price: 1.30, status: 'Out of Stock', current: 50, capacity: 200, threshold: 100, category: 'Patties', shelflife: 5, bulkOrderQuantity: 75 },
    { ingredientid: 5, name: 'Grilled Patty', price: 1.40, status: 'In Stock', current: 60, capacity: 200, threshold: 100, category: 'Patties', shelflife: 5, bulkOrderQuantity: 75 },
    
    { ingredientid: 6, name: 'Single Serving Nuggets', price: 0.80, status: 'In Stock', current: 90, capacity: 300, threshold: 150, category: 'Chicken', shelflife: 3, bulkOrderQuantity: 75 },
    { ingredientid: 7, name: 'Double Serving Nuggets', price: 1.50, status: 'Out of Stock', current: 70, capacity: 300, threshold: 150, category: 'Chicken', shelflife: 6, bulkOrderQuantity: 75 },
    
    { ingredientid: 15, name: 'Lettuce', price: 0.25, status: 'In Stock', current: 200, capacity: 500, threshold: 250, category: 'Produce', shelflife: 5, bulkOrderQuantity: 75 },
    { ingredientid: 16, name: 'Tomato', price: 0.50, status: 'Low Stock', current: 150, capacity: 400, threshold: 200, category: 'Produce', shelflife: 5, bulkOrderQuantity: 75 },
    { ingredientid: 11, name: 'Cheese Slice', price: 0.30, status: 'In Stock', current: 80, capacity: 200, threshold: 100, category: 'Cheese', shelflife: 7, bulkOrderQuantity: 75 },
    { ingredientid: 21, name: 'BBQ Sauce', price: 0.15, status: 'Well Stocked', current: 300, capacity: 600, threshold: 300, category: 'Sauces', shelflife: 7, bulkOrderQuantity: 75 },
    { ingredientid: 26, name: 'Mayo', price: 0.10, status: 'Well Stocked', current: 400, capacity: 600, threshold: 300, category: 'Sauces', shelflife: 7, bulkOrderQuantity: 75 },
  ];

  // Modify the received backend data to the format expected by the component
  const transformStockData = (data: BackendStock): InventoryItem[] => {
    if (!data || !data.stock || !Array.isArray(data.stock)) {
      console.log("Invalid data format:", data);
      return [];
    }
    
    return data.stock.map(ingredient => {
      // Calculate total quantity from all stock items that aren't expired
      const validStock = ingredient.stock.filter(item => !item.isexpired);
      const currentQuantity = validStock.reduce((total, item) => total + item.quantity, 0);
      
      // Calculate total capacity (arbitrary - we'll use 5x threshold)
      const capacity = ingredient.thresholdquantity * 5;
      
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
        ingredientid: ingredient.ingredientid,
        name: ingredient.ingredientname,
        price: parseFloat(ingredient.costperunit),
        status,
        current: currentQuantity,
        capacity,
        category: ingredient.category,
        threshold: ingredient.thresholdquantity,
        shelflife: ingredient.shelflife,
        bulkOrderQuantity: ingredient.bulkOrderQuantity,
      };
    });
  };

  // Process the data when it's available
  useEffect(() => {
    if (data) {
      // Transform the backend data to match the expected format
      const transformedData = transformStockData(data);
      setInventoryData(transformedData);
      setIsUsingSampleData(false);
    } else if (error) {
      // Load sample data if there's an error
      console.error('Failed to fetch inventory data:', error);
      const sampleData = getSampleInventoryData();
      setInventoryData(processInventoryData(sampleData));
      setIsUsingSampleData(true);
    }
  }, [data, error]);

  // Process inventory data and calculate statuses (used for sample data only)
  const processInventoryData = (data: InventoryItem[]): InventoryItem[] => {
    return data.map(item => {
      // Skip "Always Available" items
      if (item.status === 'Always Available') return item;
      
      // Thresholds obtained through python scripts 
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
    
    // Using status directly for color and width instead of recalculating with threshold
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
        {isPending ? (
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
                  <th className="py-2 px-3 text-left text-blue-500"></th>
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
                      <td className="py-2 px-3">
                        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors border-none" onClick={()=>handleOrderClick(item)}>Order</button>
                        <dialog id={`order-modal-${index}`} ref={modalRef} className="modal">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">Please Confirm That You Would Like to Place This Order</h3>
                            <p className="py-4">Confirming will place an order with your supplier</p>
                            <div className="modal-action flex justify-end gap-4">
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-success m-1" onClick={handleConfirmOrder}>Confirm</button>
                                <button className="btn btn-warning m-1">Cancel</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
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