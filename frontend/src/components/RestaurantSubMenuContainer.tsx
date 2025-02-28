"use client";
import React from 'react'
import RestaurantSubMenuButton from './RestaurantSubMenuButton';

export default function RestaurantSubMenuContainer() {
    // const [selectedItem, setSelectedItem] = React.useState("none");
    // const menuItems = "Popular, Lunch, Dinner, Breakfast,  Desserts, Appetizers, Side Dishes, Beverages".split(",")
    
  return (
    <div className="restaurant-sub-menu-container">{
        menuItems.map((menuItem, index) => {
            return <RestaurantSubMenuButton selected={selectedItem === menuItem} setCurrentSelection={setSelectedItem} text={menuItem} key={index}/>
        }
      )
    }</div>
  )
}
