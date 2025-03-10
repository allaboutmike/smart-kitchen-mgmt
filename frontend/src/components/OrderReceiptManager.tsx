"use client";
import InteractableOrderItem from "./InteractableOrderItem";
import React from "react";
import OrderStatusNotifier from "./OrderStatusNotifier";
import styles from "../styles/OrderReceiptManager.module.css"
export type Order = {
  id: string;
  items: AddedItem[];
  status: string;
  total: number;
  timePlaced: string;
};
export type AddedItem = {
  price: number;
  quantity: number;
  productId: string;
  productName: string;
  ingredients: { [key: string]: boolean };
  notes: string;
};
export type OrderReceiptManagerDetails = {
  order: Order;
  removeItem?: (item: AddedItem) => void;
  cancelOrder?: () => void;
};
export default function OrderReceiptManager(orderDetails: OrderReceiptManagerDetails) {
  const isJustReceipt = orderDetails.order.status !== "new";
  return (
    <div className={styles["current-order-items-manager"]}>
      <div className={styles["order-header-group"]}>
        <div className={styles["order-id"]}>Order: #{orderDetails.order.id}</div>
        {isJustReceipt && <OrderStatusNotifier />}
      </div>
      <span className={styles["line-separator"]}></span>

      <div className={styles["order-items-container"]}>
        {orderDetails.order.items.map((currentOrder, orderIndex) => {
          return (
            <InteractableOrderItem
              key={orderIndex}
              name={currentOrder.productName}
              price={currentOrder.price}
              orderIndex={orderIndex}
              removeItem={() =>
                orderDetails.removeItem !== undefined &&
                orderDetails.removeItem(currentOrder)
              }
              isJustReceipt={isJustReceipt}
            />
          );
        })}
      </div>
      <span className={styles["line-separator"]}></span>
      <div className={styles["order-total-container"]}>
        <div className={styles["order-total-group"]}>
          <div>Total</div>
          <div className={styles["order-total-value"]}>$89.99</div>
        </div>
        {!isJustReceipt && (
          <div className={styles["order-buttons-group"]}>
            <button className={`${styles["order-total-button"]} ${styles["continue-button"]}`}>
              Continue
            </button>
            <button
              className={`${styles["order-total-button"]} ${styles["cancel-button"]}`}
              onClick={orderDetails.cancelOrder}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
