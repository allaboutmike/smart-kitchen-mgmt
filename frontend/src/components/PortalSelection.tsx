"use client"

import React from 'react';
import Link from 'next/link';

const PortalSelection: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <header className="flex flex-col items-center flex-grow justify-center">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-2">Chicken Queen</h1>
          <p className="text-xl mb-8">Management Center</p>
          
          <h2 className="text-sm mb-8">Select a Portal</h2>
        </div>
        
        <nav className="grid grid-cols-2 gap-8 w-full max-w-lg px-4">
          <Link href="/pos">
            <article className="bg-blue-500 rounded-lg p-8 h-32 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-xl">
              <h3 className="text-white text-2xl font-bold">POS</h3>
            </article>
          </Link>
          
          <Link href="/dashboard">
            <article className="bg-blue-500 rounded-lg p-8 h-32 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-xl">
              <h3 className="text-white text-2xl font-bold text-center">Admin Dashboard</h3>
            </article>
          </Link>
        </nav>
      </header>
      
      <footer className="mt-auto w-full py-8 text-sm text-center text-gray-600">
        Dine Flow - Restaurant Management Solution
      </footer>
    </main>
  );
};

export default PortalSelection;