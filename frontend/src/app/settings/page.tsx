"use client";

import React, { useState } from "react";
import ProfileSettings from "@/components/ProfileSettings";
import StaffDirectory from "@/components/StaffDirectory";
import NavigationTabs from "@/components/NavigationTabs";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile Settings');
  const [accountNumber] = useState('A802JDJKH20978D');

  // Function to render the appropriate component based on active tab
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'Profile Settings':
        return <ProfileSettings hideNavigation={true} />;
      case 'Staff and Team':
        return <StaffDirectory hideNavigation={true} />;
      case 'Key Inventory':
        return (
          <div className="px-4 pb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Key Inventory</h1>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p>Key Inventory content will go here.</p>
            </div>
          </div>
        );
      default:
        return <ProfileSettings hideNavigation={true} />;
    }
  };

  return (
    <div className="main-page">
      <div className="w-full max-w-[1000px] mx-auto flex flex-col bg-gray-50">
        {/* Account Number Header */}
        <div className="text-right p-4">
          <p className="text-sm text-gray-700">Account Number: {accountNumber}</p>
        </div>

        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Render the active component */}
        {renderActiveComponent()}
      </div>
    </div>
  );
}
