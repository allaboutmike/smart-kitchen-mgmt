"use client";
import { useState } from 'react';
import React from 'react'
import svgIcons from "../app/svgIcons";
import SideNavBarButton from "@/components/SideNavBarButton";
import {useRouter} from 'next/navigation';
export default function SideNavBar() {
  const [currentSelection, setCurrentSelection] = useState("none");
  const router = useRouter();
  const updateCurrentSelection =(passedSelection: string)=>{    
    setCurrentSelection(passedSelection);
    switch(passedSelection){      
      case "Home": {router.push("/");break;}
      case "Menu Manager": {router.push("/menuManagement");break;}
      case "Order Tracking": {router.push("/orderTracking");break;}
      case "Inventory Tracker": {router.push("/inventoryTracker");break;}
      case "Productivity Metrics": {router.push("/productivityMetrics");break;}
      case "Settings": {router.push("/settings");break;}
    }    
  }
 
  return (
    <div className="side-nav-bar">      
        <SideNavBarButton svgIcon={svgIcons.home} selected={currentSelection === "Home"} setCurrentSelection={updateCurrentSelection} text="Home"/>
        <SideNavBarButton svgIcon={svgIcons.menuManager} selected={currentSelection === "Menu Manager"} setCurrentSelection={updateCurrentSelection} text="Menu Manager"/>
        <SideNavBarButton svgIcon={svgIcons.orderTracking} selected={currentSelection === "Order Tracking"} setCurrentSelection={updateCurrentSelection} text="Order Tracking"/>
        <SideNavBarButton svgIcon={svgIcons.inventory} selected={currentSelection === "Inventory Tracker"} setCurrentSelection={updateCurrentSelection} text="Inventory Tracker"/>
        <SideNavBarButton svgIcon={svgIcons.productivity} selected={currentSelection === "Productivity Metrics"} setCurrentSelection={updateCurrentSelection} text="Productivity Metrics"/>
        <SideNavBarButton svgIcon={svgIcons.settings} selected={currentSelection === "Settings"} setCurrentSelection={updateCurrentSelection} text="Settings"/>      
    </div>
  )
}
