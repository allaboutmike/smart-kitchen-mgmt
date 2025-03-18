"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '../../assets/chicken-queen-high-resolution-logo.png';
import Chicken from '../../assets/fashion-chicken.png';

const ProfileSettings: React.FC = () => {
  // Mock data for the profile - using a ref instead since we're not updating it
  const [profile] = useState({
    accountNumber: 'A802JDJKH20978D',
    name: 'Chicken Queen',
    address: 'P. Sherman, 42 Wallaby Way, Sydney',
    brandColors: ['#B10DC9', '#FFFF00', '#F6D0C7', '#FFAAAA', '#D0D5ED', '#F0EAB6', '#E38200'],
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
    <div className="w-full max-w-[1000px] mx-auto flex flex-col min-h-screen bg-gray-50 p-3 sm:p-6">
      {/* Account Number Header */}
      <div className="text-right mb-4">
        <p className="text-xs sm:text-sm md:text-base text-gray-700">Account Number: {profile.accountNumber}</p>
      </div>

      {/* Navigation Tabs - Horizontally scrollable on mobile */}
      <div className="flex justify-start sm:justify-center mb-6 overflow-x-auto pb-2">
        <div className="bg-white rounded-md shadow-sm inline-flex whitespace-nowrap">
          {['Profile Settings', 'Staff and Team', 'Key Inventory'].map((tab) => (
            <button
              key={tab}
              className={`px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base ${
                activeTab === tab
                  ? 'text-blue-600 font-medium bg-blue-50'
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-blue-500 mb-4 sm:mb-6">Profile Settings</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">Name:</label>
                <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200 text-blue-600 text-sm md:text-base">
                  {profile.name}
                </div>
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">Address:</label>
                <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200 text-blue-600 text-sm md:text-base">
                  {profile.address}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Brand Colors Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">Brand Colors:</label>
                <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {profile.brandColors.map((color, index) => (
                    <ColorCircle key={index} color={color} />
                  ))}
                </div>
              </div>

              {/* Hex Code Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">Hex Code:</label>
                <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200 text-blue-600 text-sm md:text-base">
                  {profile.hexCode}
                </div>
              </div>

              {/* Logo Upload Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">Logo:</label>
                <div className="flex flex-col sm:flex-row items-center sm:items-start">
                  <div className="w-24 h-24 bg-white flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden">
                    <Image 
                      src={Logo} 
                      alt="Chicken Queen Logo" 
                      width={80} 
                      height={80} 
                      className="object-contain"
                    />
                  </div>
                  <button className="mt-3 sm:mt-0 sm:ml-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs sm:text-sm w-full sm:w-auto">
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Customer Support Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-blue-500 mb-3 sm:mb-4">Need Assistance?</h2>
          
          {/* Flex container */}
          <div className="flex flex-col-reverse md:flex-row">
            {/* Right half */}
            <div className="w-full md:w-1/2 md:pl-4 mt-4 md:mt-0">
              <h3 className="font-bold text-gray-700 mb-2 text-sm md:text-base">Your Customer Support Rep</h3>
              <p className="mb-1 text-xs sm:text-sm md:text-base">{profile.customerSupportRep.name}</p>
              <p className="mb-1 text-blue-600 text-xs sm:text-sm md:text-base">{profile.customerSupportRep.email}</p>
              <p className="mb-3 text-xs sm:text-sm md:text-base">{profile.customerSupportRep.phone}</p>
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs sm:text-sm w-full sm:w-auto">
                Contact Now
              </button>
            </div>
            
            {/* Left half */}
            <div className="w-full md:w-1/2 md:border-r md:border-gray-200 flex justify-center md:justify-end">
              <div className="w-32 h-32 bg-white flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden">
                <Image 
                  src={Chicken} 
                  alt="Chicken CEO" 
                  width={112} 
                  height={112} 
                  className="object-contain" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;