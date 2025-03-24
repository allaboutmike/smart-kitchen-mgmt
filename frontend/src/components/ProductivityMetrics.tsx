"use client";

import React, { useState, useEffect } from 'react';
import { useFetch } from '../customHooks/useFetch';
import Image from 'next/image';

interface ProfitMetric {
  profit: string;
}

interface OrderCounts {
  _count: {
    completed: number;
  };
}

interface SalesItem {
  name: string;
  pictureUrl: string;
}

interface ProductivityData {
  profitMetricsToday: ProfitMetric[];
  profitMetricsSevenDays: ProfitMetric[];
  profitMetricsOneYear: ProfitMetric[];
  successfulOrdersToday: OrderCounts;
  totalOrdersToday: number;
  successfulOrdersSevenDays: OrderCounts;
  totalOrdersSevenDays: number;
  successfulOrdersOneYear: OrderCounts;
  totalOrdersOneYear: number;
  bestSellingItemToday: SalesItem[];
  worstSellingItemToday: SalesItem[];
  bestSellingItemLastSevenDays: SalesItem[];
  worstSellingItemLastSevenDays: SalesItem[];
  bestSellingItemYearToDate: SalesItem[];
  worstSellingItemYearToDate: SalesItem[];
}

const ProductivityMetricsComponent: React.FC = () => {
  const [metricsData, setMetricsData] = useState<ProductivityData | null>(null);
  const [isUsingSampleData, setIsUsingSampleData] = useState<boolean>(false);
  
  const { data, isPending, error } = useFetch<ProductivityData>('metrics/Productivity');

  // Sample data for fallback/development
  const getSampleMetricsData = (): ProductivityData => ({
    profitMetricsToday: [{ profit: "2467.00" }],
    profitMetricsSevenDays: [{ profit: "14983.00" }],
    profitMetricsOneYear: [{ profit: "500045.00" }],
    successfulOrdersToday: { _count: { completed: 125 } },
    totalOrdersToday: 150,
    successfulOrdersSevenDays: { _count: { completed: 710 } },
    totalOrdersSevenDays: 758,
    successfulOrdersOneYear: { _count: { completed: 13900 } },
    totalOrdersOneYear: 14900,
    bestSellingItemToday: [{ 
      name: "Chicken Sandwich", 
      pictureUrl: "https://res.cloudinary.com/dufytrfii/image/upload/v1741950882/Deluxe_Regular_Queenwhich_hoiqpk.png" 
    }],
    worstSellingItemToday: [{ 
      name: "Apple", 
      pictureUrl: "https://res.cloudinary.com/dufytrfii/image/upload/v1741950879/8_pc_Royal_Nuggets_uqeg56.png" 
    }],
    bestSellingItemLastSevenDays: [{ 
      name: "Chicken Wrap", 
      pictureUrl: "https://res.cloudinary.com/dufytrfii/image/upload/v1741950882/Deluxe_Regular_Queenwhich_hoiqpk.png" 
    }],
    worstSellingItemLastSevenDays: [{ 
      name: "Burger", 
      pictureUrl: "https://res.cloudinary.com/dufytrfii/image/upload/v1741950879/8_pc_Royal_Nuggets_uqeg56.png" 
    }],
    bestSellingItemYearToDate: [{ 
      name: "Chicken Panini", 
      pictureUrl: "https://res.cloudinary.com/dufytrfii/image/upload/v1741950880/Bubbly_Water_lh7i6d.png" 
    }],
    worstSellingItemYearToDate: [{ 
      name: "Green Juice", 
      pictureUrl: "https://res.cloudinary.com/dufytrfii/image/upload/v1741950883/Grilled_Queenwhich_xugf2f.png" 
    }]
  });

  useEffect(() => {
    if (data) {
      setMetricsData(data);
      setIsUsingSampleData(false);
    } else if (error) {
      console.error('Failed to fetch productivity metrics:', error);
      const sampleData = getSampleMetricsData();
      setMetricsData(sampleData);
      setIsUsingSampleData(true);
    }
  }, [data, error]);

  // Helper function to get item info or placeholder
  const getItemInfo = (items: SalesItem[], defaultName: string): { name: string, imageUrl: string } => {
    if (items && items.length > 0) {
      return {
        name: items[0].name,
        imageUrl: items[0].pictureUrl
      };
    }
    return {
      name: defaultName,
      imageUrl: "" // Empty string will trigger the onError handler
    };
  };

  // Extracting values from the data with fallbacks
  const profitToday = metricsData?.profitMetricsToday?.[0]?.profit || "0";
  const profitSevenDays = metricsData?.profitMetricsSevenDays?.[0]?.profit || "0";
  const profitYTD = metricsData?.profitMetricsOneYear?.[0]?.profit || "0";
  
  const successfulOrdersToday = metricsData?.successfulOrdersToday?._count?.completed || 0;
  const totalOrdersToday = metricsData?.totalOrdersToday || 0;
  
  const successfulOrdersSevenDays = metricsData?.successfulOrdersSevenDays?._count?.completed || 0;
  const totalOrdersSevenDays = metricsData?.totalOrdersSevenDays || 0;
  
  const successfulOrdersYTD = metricsData?.successfulOrdersOneYear?._count?.completed || 0;
  const totalOrdersYTD = metricsData?.totalOrdersOneYear || 0;

  return (
    <div className="p-6">
      {/* Header Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-2xl font-medium text-gray-800">
          Productivity Metrics
          {isUsingSampleData && <span className="text-xs text-gray-500 block mt-1">(Sample Data)</span>}
        </h1>
      </div>
      
      {isPending ? (
        <div className="bg-white rounded-lg shadow-sm p-6 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profits Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-base font-medium text-blue-700 mb-4">Profits</h2>
            <h3 className="text-gray-700 mb-4">Net Profit</h3>
            <div className="grid mobile:grid-cols-1 mobile-m:grid-cols-1 tablet:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-green-600">
                  ${parseFloat(profitToday).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
                <span className="text-sm text-gray-500 mt-1">Today</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-blue-600">
                  ${parseFloat(profitSevenDays).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
                <span className="text-sm text-gray-500 mt-1">Last 7 Days</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-purple-600">
                  ${parseFloat(profitYTD).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
                <span className="text-sm text-gray-500 mt-1">YTD</span>
              </div>
            </div>
          </div>

          {/* Total Order Metrics Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-base font-medium text-blue-700 mb-4">Total Order Metrics</h2>
            <div className="grid mobile:grid-cols-1 grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-5xl font-bold text-green-600">{totalOrdersToday}</span>
                <span className="text-sm text-gray-500 mt-1">Today</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl font-bold text-blue-600">{totalOrdersSevenDays}</span>
                <span className="text-sm text-gray-500 mt-1">7 Days</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl font-bold text-purple-600">
                  {totalOrdersYTD >= 1000 ? `${(totalOrdersYTD / 1000).toFixed(1)}k` : totalOrdersYTD}
                </span>
                <span className="text-sm text-gray-500 mt-1">YTD</span>
              </div>
            </div>
          </div>

          {/* Successful Order Metrics Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-base font-medium text-blue-700 mb-4">Successful Order Metrics</h2>
            <div className="grid mobile:grid-cols-1 grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  <span className="text-green-600">{successfulOrdersToday}</span>
                  <span className="text-gray-600">/{totalOrdersToday}</span>
                </span>
                <span className="text-sm text-gray-500 mt-1">Today</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  <span className="text-blue-600">{successfulOrdersSevenDays}</span>
                  <span className="text-gray-600">/{totalOrdersSevenDays}</span>
                </span>
                <span className="text-sm text-gray-500 mt-1">7 Days</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  <span className="text-purple-600">
                    {successfulOrdersYTD >= 1000 ? `${(successfulOrdersYTD / 1000).toFixed(1)}k` : successfulOrdersYTD}
                  </span>
                  <span className="text-gray-600">/
                    {totalOrdersYTD >= 1000 ? `${(totalOrdersYTD / 1000).toFixed(1)}k` : totalOrdersYTD}
                  </span>
                </span>
                <span className="text-sm text-gray-500 mt-1">YTD</span>
              </div>
            </div>
          </div>

          {/* Best/Worst Sellers Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-base font-medium text-blue-700 mb-4">Best/Worst Sellers</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center"></div>
              <div className="text-center font-medium text-gray-700">Today</div>
              <div className="text-center font-medium text-gray-700">Last 7 Days</div>
              <div className="text-center font-medium text-gray-700">YTD</div>

              {/* Best Sellers Row */}
              <div className="font-medium text-green-600 flex items-center">Best Sellers</div>
              {[
                getItemInfo(metricsData?.bestSellingItemToday || [], "No Data"),
                getItemInfo(metricsData?.bestSellingItemLastSevenDays || [], "No Data"),
                getItemInfo(metricsData?.bestSellingItemYearToDate || [], "No Data")
              ].map((item, index) => (
                <div key={`best-${index}`} className="flex flex-col items-center">
                  <div className="mobile:w-10 mobile:h-10 tablet:w-20 tablet:h-20 bg-gray-100 rounded-md overflow-hidden">
                    {item.imageUrl ? (
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                        onError={() => {}} 
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">
                        {item.name !== "No Data" ? item.name.substring(0, 1) : "N/A"}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 mt-1">{item.name}</span>
                </div>
              ))}

              {/* Worst Sellers Row */}
              <div className="font-medium text-red-600 flex items-center">Worst Sellers</div>
              {[
                getItemInfo(metricsData?.worstSellingItemToday || [], "No Data"),
                getItemInfo(metricsData?.worstSellingItemLastSevenDays || [], "No Data"),
                getItemInfo(metricsData?.worstSellingItemYearToDate || [], "No Data")
              ].map((item, index) => (
                <div key={`worst-${index}`} className="flex flex-col items-center">
                  <div className="mobile:w-10 mobile:h-10 tablet:w-20 tablet:h-20 bg-gray-100 rounded-md overflow-hidden">
                    {item.imageUrl ? (
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        onError={() => {}} 
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">
                        {item.name !== "No Data" ? item.name.substring(0, 1) : "N/A"}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 mt-1">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductivityMetricsComponent;