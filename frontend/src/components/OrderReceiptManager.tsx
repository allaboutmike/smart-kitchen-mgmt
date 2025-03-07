"use client";
import InteractableOrderItem from "./InteractableOrderItem";
import React from "react";
import OrderStatusNotifier from "./OrderStatusNotifier";
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
export default function OrderReceiptManager(
  orderDetails: OrderReceiptManagerDetails
) {
  const isJustReceipt = orderDetails.order.status !== "new";
  return (
    <div className="current-order-items-manager">
      <div className="order-header-group">
        <div>Order: #{orderDetails.order.id}</div>
        {!isJustReceipt && <OrderStatusNotifier />}
      </div>
      <span className="line-separator"></span>

      <div className="order-items-container">
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
      <span className="line-separator"></span>
      <div className="order-total-container">
        <div className="order-total-group">
          <div>Total</div>
          <div className="order-total-value">$89.99</div>
        </div>
        {!isJustReceipt && (
          <div className="order-buttons-group">
            <button className="order-total-button continue-button">
              Continue
            </button>
            <button
              className="order-total-button cancel-button"
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
