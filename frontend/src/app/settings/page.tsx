"use client";

import React, { useState } from "react";
import ProfileSettings from "@/components/ProfileSettings";
import StaffDirectory from "@/components/StaffDirectory";
import KeyInventory from "@/components/KeyInventory";
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
        return <KeyInventory hideNavigation={true} />;
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