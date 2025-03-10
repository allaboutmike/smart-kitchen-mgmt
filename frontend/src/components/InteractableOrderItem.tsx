"use client";
import { useState } from "react";
import styles from "../styles/InteractableOrderItem.module.css"
interface InteractableOrderItemProps {
  name: string;
  price: number;
  orderIndex: number;
  removeItem?: (orderIndex: number) => void;
  isJustReceipt: boolean;
}
export default function InteractableOrderItem({
  name,
  orderIndex,
  price,
  removeItem,
  isJustReceipt,
}: InteractableOrderItemProps) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className={styles["interactable-order-item"]}>
      <div className={styles["order-item-top-group"]}>
        <div className={styles["order-item-name"]}>{name}</div>
        <div className={styles["order-item-quantity-group-menu"]}>
          <div className={styles["order-item-quantity"]}>Qty {quantity}</div>
          {!isJustReceipt && (
            <>
              <button
                className={`${styles["order-item-button"]} ${styles["decrease-buton"]}`}
                onClick={() =>
                  setQuantity((currQuantity) => {
                    return currQuantity - 1 > 0 ? currQuantity - 1 : 1;
                  })
                }
              >
                -
              </button>
              <button
                className={`${styles["order-item-button"]} ${styles["increase-buton"]}`}
                onClick={() => setQuantity((currQuantity) => currQuantity + 1)}
              >
                +
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles["remove-and-price-group"]}>
        <div className={styles["order-item-price"]}>${price * quantity}</div>
        {!isJustReceipt && (
          <button
            className={styles["order-item-remove-button"]}
            onClick={() => removeItem !== undefined && removeItem(orderIndex)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
