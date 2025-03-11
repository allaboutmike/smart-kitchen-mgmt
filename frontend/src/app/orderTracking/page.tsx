"use client";
import React from "react";
import OrderTrackingMenu from "@/components/OrderTrackingMenu";
import { useFetch } from "@/customHooks/useFetch";
import useSelection from "@/customHooks/useSelection"
import OrderReceiptManager, { Order } from "@/components/OrderReceiptManager";
import { SelectionObject } from "@/components/SelectionObject";

export default function OrderTrackingPage() {
  const { data: orders } = useFetch<Order[]>("/orders?");
  const {isCurrentSelection, setCurrentSelection} =useSelection()
  console.table(orders)
  const selObject: SelectionObject={
    setCurrentSelection: setCurrentSelection,
    isCurrentSelection: isCurrentSelection
  }
  
  
  return (
    <div className="main-container">
      <OrderTrackingMenu {...selObject}/>
      <div className="order-tracking-main-container">        
          <h1>{orders? "Orders": "No Orders"}</h1>
          <div className={"scrollable-orders-container"}>
            {(orders && orders.length) &&
              orders.map((order)=>{
                return <OrderReceiptManager key={order.id} order={order}/>
              })
            }
          </div>        
      </div>
    </div>
  );
}
