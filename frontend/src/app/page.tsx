import SideNavBar from "@/components/SideNavBar";
import svgIcons from "./svgIcons";
import SideNavBarButton from "@/components/SideNavBarButton";
import FoodSellerMetricContainer from "@/components/FoodSellerMetricContainer";
export default function Home() {
  return (
    <div className="main-container"> 
      <SideNavBar>
        <SideNavBarButton svgIcon={svgIcons.home} text="Home" />
        <SideNavBarButton svgIcon={svgIcons.menuManager} text="Menu Manager" />
        <SideNavBarButton svgIcon={svgIcons.orderTracking} text="Order Tracking" />
        <SideNavBarButton svgIcon={svgIcons.inventory} text="Inventory Tracker" />
        <SideNavBarButton svgIcon={svgIcons.productivity} text="Productivity Metrics" />
        <SideNavBarButton svgIcon={svgIcons.settings} text="Settings" />
      </SideNavBar>
    </div>
  );
}
