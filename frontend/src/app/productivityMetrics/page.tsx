"use client";

import React, { useState } from 'react';
import WasteTrackingTable from '@/components/WasteContainer';
import ProductivityNavigationTabs from '@/components/ProductivityNavigationTabs';

// This would be your actual component for the Productivity Metrics tab
const ProductivityMetricsComponent = () => <div className="p-4">Productivity Metrics Content</div>;

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
    <div className="main-container">
      <div className="w-full max-w-[1000px] mx-auto flex flex-col bg-gray-50">
        {/* Account Number Header */}
        <div className="text-right p-4">
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