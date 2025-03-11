"use client";
import SelectableButton from "./SelectableButton";
import useSelection from "@/customHooks/useSelection";
import styles from "../styles/OrderTrackingMenu.module.css"
import selectionButtonStyles from "../styles/SelectableButton.module.css"

export default function OrderTrackingMenu() {
  const { setCurrentSelection, isCurrentSelection } = useSelection();

  return (
    <div className={styles["order-tracking-button-container"]}>
      <SelectableButton
        buttonClassName={`${selectionButtonStyles["order-tracking-button"]} ${selectionButtonStyles["selection-button"]}`}
        setCurrentSelection={setCurrentSelection}
        text="Current Orders"
        selected={isCurrentSelection("Current Orders")}
      />
      <SelectableButton
        buttonClassName={`${selectionButtonStyles["order-tracking-button"]} ${selectionButtonStyles["selection-button"]}`}
        setCurrentSelection={setCurrentSelection}
        text="Completed Orders"
        selected={isCurrentSelection("Completed Orders")}
      />
    </div>
  );
}
