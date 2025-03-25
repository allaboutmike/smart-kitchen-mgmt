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
        <span className={styles["order-item-name"]}>{itemDetails.name}</span>
      </span>
      <span className={styles["remove-and-price-group"]}>
        <span className={styles["order-item-price"]}>${itemDetails.price}</span>        
        {itemDetails.quantity && <span>{itemDetails.quantity}</span>}        
      </span>
    </div>
  );
}
