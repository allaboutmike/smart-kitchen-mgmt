"use client";

import React, { useState } from 'react';
import WasteTrackingTable from '@/components/WasteContainer';
import ProductivityNavigationTabs from '@/components/ProductivityNavigationTabs';
import ProductivityMetricsComponent from '@/components/ProductivityMetrics';

export default function ProductivityMetricsPage() {
  const [activeTab, setActiveTab] = useState('Productivity Metrics');

  // Function to render the appropriate component based on active tab
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'Productivity Metrics':
        return <ProductivityMetricsComponent />;
      case 'Waste Metrics':
        return <WasteTrackingTable />;
      default:
        return <ProductivityMetricsComponent />;
    }
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-8">
      <div className="w-full max-w-[1000px] mx-auto pt-6 px-6">
        {/* Account Number Header */}
        <div className="text-right mb-6">
          <p className="text-sm text-gray-700">Account Number: A802JDJKH20978D</p>
        </div>

        {/* Navigation Tabs */}
        <ProductivityNavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Render the active component */}
        {renderActiveComponent()}
      </div>
    </div>
  );
}