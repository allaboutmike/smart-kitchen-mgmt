"use client";
import { useState } from 'react';
import React from 'react'
import svgIcons from "../app/svgIcons";
import SideNavBarButton from "@/components/SideNavBarButton";
export default function SideNavBar() {
  const [currentSelection, setCurrentSelection] = useState("Home");
  const updatedText = currentSelection;
  return (
    <div className="side-nav-bar">      
        <SideNavBarButton svgIcon={svgIcons.home} currentText={updatedText} setCurrentSelection={setCurrentSelection} text="Home" />
        <SideNavBarButton svgIcon={svgIcons.menuManager} currentText={updatedText} setCurrentSelection={setCurrentSelection} text="Menu Manager" />
        <SideNavBarButton svgIcon={svgIcons.orderTracking} currentText={updatedText} setCurrentSelection={setCurrentSelection} text="Order Tracking" />
        <SideNavBarButton svgIcon={svgIcons.inventory} currentText={updatedText} setCurrentSelection={setCurrentSelection} text="Inventory Tracker" />
        <SideNavBarButton svgIcon={svgIcons.productivity} currentText={updatedText} setCurrentSelection={setCurrentSelection} text="Productivity Metrics" />
        <SideNavBarButton svgIcon={svgIcons.settings} currentText={updatedText} setCurrentSelection={setCurrentSelection} text="Settings" />      
    </div>
  )
}
