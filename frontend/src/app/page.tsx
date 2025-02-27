import GridWasteMetrics from "@/components/GridWasteMetrics";
import RestaurantMenuContainer from "@/components/RestaurantMenuContainer";
import SideNavBar from "@/components/SideNavBar";

export default function Home() {
  return (
    <div className="main-container"> 
      <RestaurantMenuContainer/>
      <GridWasteMetrics />
      <GridWasteMetrics />
      <SideNavBar />
    </div>
  );
}
