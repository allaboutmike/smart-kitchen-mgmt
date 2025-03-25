import React from 'react';
import IngredientInventoryContainer from '@/components/IngredientInventoryContainer';

export default function InventoryTrackerPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <IngredientInventoryContainer />
    </div>
  );
}