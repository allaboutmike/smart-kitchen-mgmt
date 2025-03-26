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
  const [orders, setOrders] = useState<Order[] | undefined>(data?.orders)
  const [containerKey, setContainerKey] = useState<string>("20")
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
  const orderChecker =()=>{
    if(data?.orders === undefined || data.orders.length <= 0){
      return (<div>No Orders Found</div>)
    }
    return data?.orders.map((order)=> <OrderReceiptManager key={order.orderid} {...order} />)
  }

  return (
    <div className="main-container">
      <h1 className="text-3xl font-bold text-center my-[0.5rem]">Order Tracking</h1>
      <OrderTrackingMenu {...selObject} />
      <div className={orderTrackingStyles["order-tracking-container"]}>
        { (isCurrentSelection("Current Orders") && orders) && <div className={orderTrackingStyles["order-receipt-container"]}>
            {orderChecker()}
        </div>}     
        {/* {(isCurrentSelection("Current Orders") && (orders?.length === undefined || orders?.length <= 0)) && <div>No Orders Found</div>}   */}
        {isCurrentSelection("Completed Orders") && <TimeDropdown {...completedOrders} />}
      </div>      
      {currentOrderDetails && <OrderDetailsScreen {...orderDetailsObj} />}
    </div>
  );
}
