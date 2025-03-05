'use client'
import SelectableButton from "./SelectableButton";
import useSelection from "@/customHooks/useSelection";

export default function OrderTrackingMenu() {
  const { setCurrentSelection, isCurrentSelection } = useSelection();

  return (
    <div className="order-tracking-button-container">
      <SelectableButton
        buttonClassName="order-tracking-button selection-button"
        setCurrentSelection={setCurrentSelection}
        text="Current Orders"
        selected={isCurrentSelection("Current Orders")}
      />
      <SelectableButton
        buttonClassName="order-tracking-button selection-button"
        setCurrentSelection={setCurrentSelection}
        text="Completed Orders"
        selected={isCurrentSelection("Completed Orders")}
      />
    </div>
  );
}
