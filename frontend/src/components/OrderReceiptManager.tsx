"use client";
import InteractableOrderItem, { ItemDetails } from "./InteractableOrderItem";
import {useState} from "react";
import { useMutation } from "@/customHooks/useMutation";
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
  toggleOrderDetails?: ()=> void;
};
export type AddedItem = {
  price: number;
  quantity: number;
  productId: string;
  productName: string;
  ingredients: { [key: string]: boolean };
  notes: string;
};
export interface MenuItem {
  name: string;
  price: number;
  quantity: number;
  customizationdetail: string | null
}
export interface OrderItem {
  orderitemid: number;
  served: boolean;
  servedtimestamp: string;
  returned: boolean;
  menuitems: MenuItem;
}

export interface OrderDetails {
  order: Order;
}
export default function OrderReceiptManager(orderDetails: Order) {
  const { updateData } = useMutation("PUT", `orders/${orderDetails.orderid}`);
  const [orderStatus, setOrderStatus] = useState(orderDetails.completed);
  const toggleOrderStatus = async () => {
    setOrderStatus(!orderStatus);
    const res = await updateData();
    if (!res.success) {
      setOrderStatus(!orderStatus);
    }
  }
  const tempTotalCost = orderDetails.orderitems?.reduce((prevVal, currVal)=>{
    return prevVal + parseFloat(currVal.menuitems.price.toString())
  }, 0).toFixed(2)
  

  const formatDate = (dateString: Date | '') => {

    if (dateString) {
      const dateFormatOptions: Intl.DateTimeFormatOptions = {
        month: 'short', day: '2-digit', year: 'numeric'
      }
      return dateString.toLocaleDateString('default', dateFormatOptions)
    }
    return ""
  }
  const timeStamp = orderDetails.ordertimestamp ? new Date(orderDetails.ordertimestamp) : "";
  return (
    <div className={`${styles["current-order-items-manager"]} carousel-item`}>
      <button className={`${styles["order-status-toggle-button"]}`} onClick={() => toggleOrderStatus()}>Toggle Order Status</button>
      <span className={`${styles["order-status"]}`}>{orderStatus ? "Completed" : "In Progress"}</span>
      <span className={`${styles["order-details-container-bg"]} `}></span>
      <div className={styles["order-header-group"]}>
        <span className="flex justify-between align-center">
          <div className={styles["order-id"]}>Order: #{orderDetails.orderid}</div>
          {!orderDetails.completed && <OrderStatusNotifier orderComplete ={orderDetails.completed}/>}
        </span>
        <span className={styles["line-separator"]}></span>
      </div>

      <div className={styles["order-items-container"]}>
        {
          orderDetails.orderitems && orderDetails.orderitems.map((details, index) => {
            const itemDetails: ItemDetails = {
              name: details.menuitems.name,
              price: details.menuitems.price,
              quantity: details.menuitems.quantity,
            }
            console.log(`details.menuitems.quantity ${details.menuitems.quantity}`)
            return <InteractableOrderItem key={index} {...itemDetails} />
          })
        }
      </div>
      <div className={styles["order-total-container"]}>
        <span className={styles["line-separator"]}></span>
        <div className={styles["order-total-group"]}>
          <span>Total</span>
          <span className={styles["order-total-value"]}>${tempTotalCost}</span>
        </div>
        <span className="flex self-start text-black text-[1.6rem]">{formatDate(timeStamp)}</span>
      </div>
    </div>
  );
}
