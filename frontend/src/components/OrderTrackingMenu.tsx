import SelectableButton from "./SelectableButton";
import {SelectionObject} from "./SelectionObject"
import styles from "../styles/OrderTrackingMenu.module.css"
import selectionButtonStyles from "../styles/SelectableButton.module.css"

export default function OrderTrackingMenu(selectionObject:SelectionObject) {
  return (
    <div className={styles["order-tracking-button-container"]}>
      <SelectableButton
        buttonClassName={`${selectionButtonStyles["order-tracking-button"]} ${selectionButtonStyles["selection-button"]}`}
        setCurrentSelection={selectionObject.setCurrentSelection}
        text="Current Orders"
        selected={selectionObject.isCurrentSelection("Current Orders")}
      />
      <SelectableButton
        buttonClassName={`${selectionButtonStyles["order-tracking-button"]} ${selectionButtonStyles["selection-button"]}`}
        setCurrentSelection={selectionObject.setCurrentSelection}
        text="Completed Orders"
        selected={selectionObject.isCurrentSelection("Completed Orders")}
      />
    </div>
  );
}
