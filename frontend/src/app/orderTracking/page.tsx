"use client";
import React, { useState } from "react";
import OrderTrackingMenu from "@/components/OrderTrackingMenu";
import { useFetch } from "@/customHooks/useFetch";
import useSelection from "@/customHooks/useSelection"
import OrderReceiptManager, { Order } from "@/components/OrderReceiptManager";
import { SelectionObject } from "@/components/SelectionObject";
import OrderDetailsScreen, { OrderDetails } from "@/components/OrderDetailsScreen";
import TimeDropdown, { TimeDropdownProps } from "@/components/TimeDropdown";
import orderTrackingStyles from "../../styles/OrderTracking.module.css";
export default function OrderTrackingPage() {
  const {isCurrentSelection, setCurrentSelection } = useSelection("Current Orders")
  
  let fetchString = "orders?"
  if(!isCurrentSelection("none")){
    const showCompletedOrders = isCurrentSelection("Completed Orders")
    fetchString = `orders?completed=${showCompletedOrders}&orderItemsDetails=true`
  }
  const { data } = useFetch<{ orders: Order[] }>(fetchString);
  console.log(data)
  const selObject: SelectionObject = {
    setCurrentSelection: setCurrentSelection,
    isCurrentSelection: isCurrentSelection
  }
  const [currentOrderDetails, setCurrentOrderDetails] = useState<Order | null>(null)
  const updateOrderDetails = (order: Order | null) => {
    setCurrentOrderDetails(order)
  }
  const orderDetailsObj: OrderDetails = {
    order: currentOrderDetails,
    updateOrderDetailsScreen: updateOrderDetails
  }
  const completedOrders: TimeDropdownProps = {
    orders: data?.orders,
    setOrderDetails: setCurrentOrderDetails
  }

  return (
    <div className="main-container">
      <h1 className="text-3xl font-bold text-center my-[0.5rem]">Order Tracking</h1>
      <OrderTrackingMenu {...selObject} />
      <div className={orderTrackingStyles["order-tracking-container"]}>
      {(isCurrentSelection("Current Orders") && data) && <div className={orderTrackingStyles["order-receipt-container"]}>
        {data?.orders.map((order, index)=>{
          order.animIndex = index;
          order.animDelay = index * 0.02;
          return <OrderReceiptManager key={order.orderid} {...order} />})
        }
        </div>}      
        {isCurrentSelection("Completed Orders") && <TimeDropdown {...completedOrders} />}
      </div>      
      {currentOrderDetails && <OrderDetailsScreen {...orderDetailsObj} />}
    </div>
  );
}
