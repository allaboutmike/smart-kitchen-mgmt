"use client";
import React from "react";
// import OrderTrackingMenu from "@/components/OrderTrackingMenu";
// import { useFetch } from "@/customHooks/useFetch";
// import useSelection from "@/customHooks/useSelection"
// import OrderReceiptManager, { Order } from "@/components/OrderReceiptManager";
// import { SelectionObject } from "@/components/SelectionObject";

export default function OrderTrackingPage() {
  // the orders coming from the backend look something like this {
  //   "orderid": 54,
  //     "ordertimestamp": "2025-01-15T13:09:19.000Z",
  //       "completed": false,
  //         "completedTimeStamp": null
  // }, types do not match the only properties the orders have are the ones above 
  // const { data } = useFetch<{ orders: Order[] }>("/orders?completed=false");
  // const {isCurrentSelection, setCurrentSelection} =useSelection()
  // console.table(orders)
  // const selObject: SelectionObject={
  //   setCurrentSelection: setCurrentSelection,
  //   isCurrentSelection: isCurrentSelection
  // }


  return (
    <div className="main-container">
      {/* <OrderTrackingMenu {...selObject}/>
      <div className="order-tracking-main-container">        
          <h1>{orders? "Orders": "No Orders"}</h1>
          <div className={"scrollable-orders-container"}>
            {(orders && orders.length) &&
              orders.map((order)=>{
                return <OrderReceiptManager key={order.id} order={order}/>
              })
            }
          </div>        
      </div> */}
    </div>
  );
}
