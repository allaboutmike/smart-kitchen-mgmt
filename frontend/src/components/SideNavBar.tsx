"use client";
import { useEffect, useState } from 'react';
import React from 'react'
import svgIcons from "../app/svgIcons";
import SideNavBarButton from "@/components/SideNavBarButton";
import {useRouter} from 'next/navigation';
export default function SideNavBar() {
  const [currentSelection, setCurrentSelection] = useState("none");
  const router = useRouter();
  useEffect(() => {
    switch(currentSelection) {
      case "Home": {router.push("/");break;}
      case "Menu Manager": {router.push("/menuManagement");break;}
      case "Order Tracking": {router.push("/orderTracking");break;}
      case "Inventory Tracker": {router.push("/inventoryTracker");break;}
      case "Productivity Metrics": {router.push("/productivityMetrics");break;}
      case "Settings": {router.push("/settings");break;}
    }
  }, [currentSelection]);
  return (
    <div className="side-nav-bar">      
        <SideNavBarButton svgIcon={svgIcons.home} selected={currentSelection === "Home"} setCurrentSelection={setCurrentSelection} text="Home"/>
        <SideNavBarButton svgIcon={svgIcons.menuManager} selected={currentSelection === "Menu Manager"} setCurrentSelection={setCurrentSelection} text="Menu Manager"/>
        <SideNavBarButton svgIcon={svgIcons.orderTracking} selected={currentSelection === "Order Tracking"} setCurrentSelection={setCurrentSelection} text="Order Tracking"/>
        <SideNavBarButton svgIcon={svgIcons.inventory} selected={currentSelection === "Inventory Tracker"} setCurrentSelection={setCurrentSelection} text="Inventory Tracker"/>
        <SideNavBarButton svgIcon={svgIcons.productivity} selected={currentSelection === "Productivity Metrics"} setCurrentSelection={setCurrentSelection} text="Productivity Metrics"/>
        <SideNavBarButton svgIcon={svgIcons.settings} selected={currentSelection === "Settings"} setCurrentSelection={setCurrentSelection} text="Settings"/>      
    </div>
  )
}
