"use client";
import React from 'react'
import RestaurantMenuButton from './RestaurantMenuButton'

export default function RestaurantMenuContainer() {
    const [selectedItem, setSelectedItem] = React.useState("none");
    const menuItems = "Popular, Lunch, Dinner, Breakfast,  Desserts, Appetizers, Side Dishes, Beverages".split(",")
    
  return (
    <div className="restaurant-menu-container">{
        menuItems.map((menuItem, index) => {
            return <RestaurantMenuButton selected={selectedItem === menuItem} setCurrentSelection={setSelectedItem} text={menuItem} key={index}/>
        })
    }</div>
  )
}
