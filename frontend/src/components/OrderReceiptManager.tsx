"use client";
import InteractableOrderItem from "./InteractableOrderItem";
import {orderType} from "./MenuManagementContainer"
import React from "react";
export type AddedItem = {
  name: string;
  price: number;
  quantity: number;
};
export type OrderReceiptManagerDetails  = {
  orderNumber: number;
  orderAddedItems: AddedItem[];
  removeItem: (order: orderType)=> void;
  cancelOrder: ()=> void;
  isJustReceipt: boolean;
};
export default function OrderReceiptManager(orderDetails: OrderReceiptManagerDetails) {
  return (
    <div className="current-order-items-manager">
      <div className="order-header-group">
        <div>Order: #{orderDetails.orderNumber}</div>
        <span className="line-separator"></span>
      </div>
      <div className="order-items-container">
        {orderDetails.orderAddedItems.map((currentOrder, orderIndex) => {
          return (
            <InteractableOrderItem
                key={orderIndex}
                name={currentOrder.name}
                price={currentOrder.price}
                orderIndex={orderIndex}
                removeItem={()=>orderDetails.removeItem(currentOrder)}
                isJustReceipt={orderDetails.isJustReceipt}
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
        {!orderDetails.isJustReceipt && <div className="order-buttons-group">
          <button className="order-total-button continue-button">
            Continue
          </button>
          <button
            className="order-total-button cancel-button"
            onClick={orderDetails.cancelOrder}
          >
            Cancel
          </button>
        </div>}
      </div>
    </div>
  );
}
