"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '../../assets/chicken-queen-high-resolution-logo.png';
import Chicken from '../../assets/fashion-chicken.png';
import NavigationTabs from './NavigationTabs';

interface ProfileSettingsProps {
  hideNavigation?: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ hideNavigation = false }) => {
  // Mock data for the profile
  const [profile] = useState({
    accountNumber: 'A802JDJKH20978D',
    name: 'Chicken Queen',
    address: 'P. Sherman, 42 Wallaby Way, Sydney',
    brandColors: ['#74C3C8', '#F6EAB6', '#F6D0C7', '#FFAAAA', '#D0D5ED', '#FFFF00', '#B10DC9'],
    hexCode: '74C3C8',
    customerSupportRep: {
      name: 'Tabitha Hill',
      email: 'T.Hill@OurCompany.com',
      phone: '(770)554-9089'
    }
  });

  const [activeTab, setActiveTab] = useState('Profile Settings');

  // Color circles component
  const ColorCircle: React.FC<{ color: string }> = ({ color }) => (
    <div
      className="h-6 w-6 rounded-full inline-block mr-1"
      style={{ backgroundColor: color }}
    ></div>
  );

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col bg-gray-50">
      {!hideNavigation && (
        <>
          {/* Account Number Header */}
          <div className="text-right p-4">
            <p className="text-sm text-gray-700">Account Number: {profile.accountNumber}</p>
          </div>

          {/* Navigation Tabs */}
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}

      {/* Main Content with Header & Logo Area */}
      <div className="px-4 pb-8">
        <div className="flex justify-between items-start mb-6 w-full">
          <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
          
          {/* Logo Section - Right-aligned */}
          <div className="flex flex-col items-end">
            <div className="w-40 h-40 bg-gray-100 flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden">
              <Image
                src={Logo}
                alt="Chicken Queen Logo"
                width={160}
                height={160}
                className="object-cover w-full h-full"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
        
        {/* Main Form Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          {/* Form Fields */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">Name:</label>
            <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 text-base w-full">
              {profile.name}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">Address:</label>
            <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 text-base w-full">
              {profile.address}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">Brand Colors:</label>
            <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 w-full">
              {profile.brandColors.map((color, index) => (
                <ColorCircle key={index} color={color} />
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Hex Code:</label>
            <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 text-base w-full">
              {profile.hexCode}
            </div>
          </div>
        </div>

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
              <p className="mb-1 text-gray-800">{profile.customerSupportRep.name}</p>
              <p className="mb-1 text-blue-600">{profile.customerSupportRep.email}</p>
              <p className="mb-3 text-gray-800">{profile.customerSupportRep.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;