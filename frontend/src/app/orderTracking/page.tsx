"use client";
import React from "react";
import OrderTrackingMenu from "@/components/OrderTrackingMenu";
import { useFetch } from "@/customHooks/useFetch";
import useSelection from "@/customHooks/useSelection"
import OrderReceiptManager, { Order } from "@/components/OrderReceiptManager";
import { SelectionObject } from "@/components/SelectionObject";

export default function OrderTrackingPage() {
  const {currentSelection, isCurrentSelection, setCurrentSelection} =useSelection()
  let fetchString = "/orders?"
  if(!isCurrentSelection("none")){
    const showCompletedOrders = isCurrentSelection("Completed Orders")
    fetchString = `/orders?completed=${showCompletedOrders}&orderItemsDetails=true`
  }
  const { data } = useFetch<{ orders: Order[] }>(fetchString);
  const selObject: SelectionObject={ setCurrentSelection: setCurrentSelection,
    isCurrentSelection: isCurrentSelection
  }
  return (
    <div className="main-container">
      <h1 className="text-3xl font-bold text-center my-[0.5rem]">Order Tracking</h1>
      <OrderTrackingMenu {...selObject}/>
      <div className="flex order-tracking-main-container max-w-[80dvw] justify-center mt-[20px] ">
          {currentSelection != "none" && <div key={currentSelection} className="carousel p-[2rem] carousel-start rounded-box bg-neutral
          px-[1rem] gap-[1rem]  max-w-[80%]">
            {
              (data?.orders && data.orders.length) &&
                data?.orders.map((order)=>{
                  return <OrderReceiptManager key={order.orderid} {...order} />
                })
            }
          </div>  }      
      </div>
    </div>
  );
}
