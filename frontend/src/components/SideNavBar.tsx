import React from 'react'
import svgIcons from "../app/svgIcons";
import SideNavBarButton from "@/components/SideNavBarButton";
export default function SideNavBar() {
  return (
    <div className="side-nav-bar">
      <SideNavBarButton svgIcon={svgIcons.home} text="Home" />
        <SideNavBarButton svgIcon={svgIcons.menuManager} text="Menu Manager" />
        <SideNavBarButton svgIcon={svgIcons.orderTracking} text="Order Tracking" />
        <SideNavBarButton svgIcon={svgIcons.inventory} text="Inventory Tracker" />
        <SideNavBarButton svgIcon={svgIcons.productivity} text="Productivity Metrics" />
        <SideNavBarButton svgIcon={svgIcons.settings} text="Settings" />
    </div>
  )
}
