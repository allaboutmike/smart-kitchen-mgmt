"use client"

import React from 'react';
import Link from 'next/link';

const SplashScreen: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white text-gray-800">
      <header className="text-6xl font-bold mb-4">
        Dine Flow <h1 className="inline-block">🍽️</h1>
      </header>
      <p className="text-xl mb-8">Restaurant Management Solutions</p>
      <Link href="/select-portal">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
          Get Started
        </button>
      </Link>
    </main>
  );
};

export default SplashScreen;