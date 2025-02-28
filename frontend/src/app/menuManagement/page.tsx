import RestaurantFoodMenuContainer from '@/components/RestaurantFoodMenuContainer'
import RestaurantSubMenuButton from '@/components/RestaurantSubMenuButton'
import RestaurantSubMenuContainer from '@/components/RestaurantSubMenuContainer'
import React from 'react'

export default function page() {
  return (
    <div className="main-container">
      <RestaurantSubMenuContainer />
      <RestaurantFoodMenuContainer />
    </div>
  )
}
