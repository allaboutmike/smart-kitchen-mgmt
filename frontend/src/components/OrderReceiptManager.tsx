"use client";
import InteractableOrderItem, { ItemDetails } from "./InteractableOrderItem";
import React from "react";
import OrderStatusNotifier from "./OrderStatusNotifier";
import styles from "../styles/OrderReceiptManager.module.css"
export type Order = {
  orderid: string;
  orderitems: OrderItem[];
  completed: boolean;
  total: number;
  timePlaced: string;
  ordertimestamp: string;
  completedTimeStamp: string | null;
};
export type AddedItem = {
  price: number;
  quantity: number;
  productId: string;
  productName: string;
  ingredients: { [key: string]: boolean };
  notes: string;
};
export interface MenuItem{
  name: string;
  price: number;
  customizationdetail: string| null
}
export interface OrderItem{
  orderitemid: number;
  served: boolean;
  servedtimestamp: string;
  returned: boolean;
  menuitems: MenuItem;
}

export interface OrderDetails{
  order: Order;
}
export default function OrderReceiptManager(orderDetails: Order) {
    
  const formatDate =(dateString: Date | '')=>{
    
    if(dateString){
      const dateFormatOptions: Intl.DateTimeFormatOptions = {
        month: 'short', day: '2-digit', year: 'numeric'
      }
       return dateString.toLocaleDateString('default', dateFormatOptions)
    }
    return ""
  }
  const timeStamp = orderDetails.completedTimeStamp? new Date(orderDetails.completedTimeStamp): "";
  return (
    <div className={`${styles["current-order-items-manager"]} carousel-item`}>
      <div className={styles["order-header-group"]}>
        <span className="flex justify-between align-center">
          <div className={styles["order-id"]}>Order: #{orderDetails.orderid}</div>
          {orderDetails.completed && <OrderStatusNotifier orderComplete ={orderDetails.completed}/>}
        </span>
        <span className={styles["line-separator"]}></span>
      </div>

      <div className={styles["order-items-container"]}>
        {
          orderDetails.orderitems && orderDetails.orderitems.map((details, index)=>{
            const itemDetails: ItemDetails={
              name: details.menuitems.name,
              price: details.menuitems.price
            }
            return <InteractableOrderItem key={index} {...itemDetails}/>
          })
        }
      </div>
      <div className={styles["order-total-container"]}>
      <span className={styles["line-separator"]}></span>
        <div className={styles["order-total-group"]}>
          <span>Total</span>
          <span className={styles["order-total-value"]}>${65.08}</span>
        </div>        
        <span className="flex self-start text-black text-[1.6rem]">{formatDate(timeStamp)}</span>
      </div>
    </div>
  );
}
