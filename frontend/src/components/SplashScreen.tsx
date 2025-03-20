"use client"

import React from 'react';
import Link from 'next/link';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800">
      <div className="text-6xl font-bold mb-4">
        Dine Flow <span className="inline-block">🍽️</span>
      </div>
      <div className="text-xl mb-8">Restaurant Management Solutions</div>
      <Link href="/select-portal">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default SplashScreen;