"use client";
import MenuManagementContainer, {MenuItemType} from '@/components/MenuManagementContainer'
import React from 'react'
import { useFetch } from "@/customHooks/useFetch";
export default function MenuManagementPage() {
    
  const fetchString = "menuItems";
  const { data } = useFetch<{ menuItems: MenuItemType[] }>(fetchString);
  
  console.log(data?.menuItems);

  if (data?.menuItems && data.menuItems.length) {
    return (
      <div className="main-container h-full max-h-screen overflow-hidden">
        <MenuManagementContainer menuItems={data?.menuItems}/>
      </div>
    )
  };
}
