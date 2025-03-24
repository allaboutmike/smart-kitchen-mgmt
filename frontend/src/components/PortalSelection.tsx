"use client"

import React from 'react';
import Link from 'next/link';

const PortalSelection: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <header className="flex flex-col items-center justify-center w-full py-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-serif mb-2">Chicken Queen</h1>
          <p className="text-2xl mb-6">Management Center</p>
          <h2 className="text-3xl mb-8">Select a Portal</h2>
        </div>

        <nav className="grid grid-cols-2 gap-8 w-full max-w-lg px-4 mb-8">
          <Link href="/pos">
            <article className="bg-blue-950 rounded-lg p-8 h-32 flex items-center justify-center cursor-pointer hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-xl group">
              <h3 className="text-white text-2xl font-bold group-hover:text-blue-950 transition-colors duration-300">POS</h3>
            </article>
          </Link>

          <Link href="/dashboard">
            <article className="bg-blue-950 rounded-lg p-8 h-32 flex items-center justify-center cursor-pointer hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-xl group">
              <h3 className="text-white text-2xl text-center font-bold group-hover:text-blue-950 transition-colors duration-300">Admin Dashboard</h3>
            </article>
          </Link>
        </nav>
      </header>

      <footer className="w-full py-8 text-sm text-center text-gray-600">
        <p>Dine Flow - Restaurant Management Solution</p>
      </footer>
    </main>
  );
};

export default PortalSelection;