"use client"

import React from 'react';
import Link from 'next/link';

const PortalSelection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <div className="flex flex-col items-center flex-grow justify-center">
        <div className="text-center mb-16">
          <div className="text-4xl font-bold mb-2">Chicken Queen</div>
          <div className="text-xl mb-8">Management Center</div>
          
          <div className="text-sm mb-8">Select a Portal</div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 w-full max-w-lg px-4">
          <Link href="/pos">
            <div className="bg-blue-500 rounded-lg p-8 h-32 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-xl">
              <div className="text-white text-2xl font-bold">POS</div>
            </div>
          </Link>
          
          <Link href="/dashboard">
            <div className="bg-blue-500 rounded-lg p-8 h-32 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-xl">
              <div className="text-white text-2xl font-bold text-center">Admin Dashboard</div>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="mt-auto w-full py-8 text-sm text-center text-gray-600">
        Dine Flow - Restaurant Management Solution
      </div>
    </div>
  );
};

export default PortalSelection;