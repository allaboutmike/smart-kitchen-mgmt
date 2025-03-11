"use client";
import React from "react";
import OrderTrackingMenu from "@/components/OrderTrackingMenu";
import { useFetch } from "@/customHooks/useFetch";
import OrderReceiptManager, { Order } from "@/components/OrderReceiptManager";

export default function OrderTrackingPage() {
  const { data: orders } = useFetch<Order[]>("/orders?");
  console.table(orders)

  return (
    <div className="main-container">
      <OrderTrackingMenu />
      <div className="order-tracking-main-container">        
          <h1>{orders? "Orders": "No Orders"}</h1>
          <div className={"scrollable-orders-container"}>
            {(orders && orders.length > 0) &&
              orders.map((order)=>{
                return <OrderReceiptManager 
                key={order.id} 
                order={order} 
              />
              })
            }
          </div>        
      </div>
    </div>
  );
}
