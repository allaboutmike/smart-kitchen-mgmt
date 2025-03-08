"use client";
import { useState } from "react";
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
    <div className="interactable-order-item">
      <div className="order-item-top-group">
        <div className="order-item-name">{name}</div>
        <div className="order-item-quantity-group-menu">
          <div className="order-item-quantity">Qty {quantity}</div>
          {!isJustReceipt && (
            <>
              <button
                className="order-item-button decrease-buton"
                onClick={() =>
                  setQuantity((currQuantity) => {
                    return currQuantity - 1 > 0 ? currQuantity - 1 : 1;
                  })
                }
              >
                -
              </button>
              <button
                className="order-item-button increase-button"
                onClick={() => setQuantity((currQuantity) => currQuantity + 1)}
              >
                +
              </button>
            </>
          )}
        </div>
      </div>
      <div className="remove-and-price-group">
        <div className="order-item-price">${price * quantity}</div>
        {!isJustReceipt && (
          <button
            className="order-item-remove-button"
            onClick={() => removeItem !== undefined && removeItem(orderIndex)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
