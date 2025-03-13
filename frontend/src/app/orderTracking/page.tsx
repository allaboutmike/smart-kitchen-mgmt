"use client";
import React from "react";
import OrderTrackingMenu from "@/components/OrderTrackingMenu";
import { useFetch } from "@/customHooks/useFetch";
import useSelection from "@/customHooks/useSelection"
// import OrderReceiptManager, { Order } from "@/components/OrderReceiptManager";
import OrderReceiptManager, { Order } from "@/components/OrderReceiptManager";
import { SelectionObject } from "@/components/SelectionObject";

export default function OrderTrackingPage() {
  // the orders coming from the backend look something like this {
  //   "orderid": 54,
  //     "ordertimestamp": "2025-01-15T13:09:19.000Z",
  //       "completed": false,
  //         "completedTimeStamp": null
  // }, types do not match the only properties the orders have are the ones above 
  const {currentSelection, isCurrentSelection, setCurrentSelection} =useSelection()
  let fetchString = "/orders?"
  if(!isCurrentSelection("none")){
    const showCompletedOrders = isCurrentSelection("Current Orders")
    fetchString = `/orders?completed=${showCompletedOrders}&orderItemsDetails=true`
  }
  const { data } = useFetch<{ orders: Order[] }>(fetchString);
  
  
  const selObject: SelectionObject={ setCurrentSelection: setCurrentSelection,
    isCurrentSelection: isCurrentSelection
  }
  return (
    <div className="main-container">
      <OrderTrackingMenu {...selObject}/>
      <div className="flex order-tracking-main-container max-w-[80dvw] justify-center mt-[50px] ">
          {currentSelection != "none" && <div key={currentSelection} className="carousel carousel-center rounded-box bg-neutral justify-center
          px-[1rem] gap-[1rem] py-[1rem] max-w-[80%]">
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
