import styles from "../styles/InteractableOrderItem.module.css"
export interface ItemDetails{
  name: string;
  quantity: number;
  price: number;
}
export default function InteractableOrderItem(itemDetails: ItemDetails) {
  return (
    <div className={styles["interactable-order-item"]}>
      <span className={styles["order-item-top-group"]}>
        <p className={styles["order-item-name"]}>{itemDetails.name}</p>
      </span>
      <span className={styles["remove-and-price-group"]}>
        <p className={styles["order-item-price"]}>${(itemDetails.price * itemDetails.quantity).toFixed(2)}</p>        
        {itemDetails.quantity && <p>Qty {itemDetails.quantity}</p>}        
      </span>
    </div>
  );
}
