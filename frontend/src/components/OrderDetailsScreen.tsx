import React from "react";
import styles from "../styles/OrderDetailsScreen.module.css";
import { Order } from "./OrderReceiptManager";

export interface OrderDetails{
  order: Order | null,
  updateOrderDetailsScreen: (order: Order | null) => void
}

export default function OrderDetailsScreen(orderDetails: OrderDetails) {
  const oDetails = orderDetails.order
  const disableModal =()=>{
    orderDetails.updateOrderDetailsScreen(null)
  }
  return (
    <dialog className={styles["order-details-container"]} 
    onLoadStart={(e)=> e.currentTarget.focus()}
    onKeyDown={(e)=> {
      if(e.key ===  'Escape') disableModal()
     }}
    >
      <span className={styles["order-details-container-bg"]} onClick={disableModal}></span>
      <h1 className={styles["order-details-title"]}>Order Details</h1>
      <button className={styles["exit-button"]}
       onClick={disableModal}
       >Exit</button>
      <span className="flex gap-[1rem] mt-[40px] justify-center">        
        <span className={styles["full-order-details-container"]}>
          <span className={styles["order-details-header"]}>
            <span>Restaurant Name</span>
            <span>Order #{oDetails?.orderid}</span>
            <span>Order Date</span>
          </span>
          <span className={styles["items-list-container"]}>
            {oDetails?.orderitems && oDetails?.orderitems.map((elem, index)=>{
                return(
                    <ul key={index}>
                        <li>Order Name {elem.menuitems.name}</li>
                        <li>${elem.menuitems.price}</li>
                    </ul>
                )
            })}
          </span>
          <span className={styles["purchase-cost-details"]}>
            <span>Subtotal: ............$20.00</span>
            <span>Tax: ............$6.00</span>
            <span>Total: ............$26.00</span>
          </span>
          <span className={styles["message-and-payment-method-container"]}>
            <span>Payment Method:</span>
            <span>Credit Card(**** 2394)</span>
            <span>{`Thank you for choosing Cluckin' Good Chicken! Have a cluckin' great day! 🐔`}</span>
          </span>
        </span>
        <span className={styles["modify-order-container"]}>
          <h2 className={styles["modify-order-button"]}>Modify Order</h2>
          <span className={styles["current-state-container"]}>
            <span>Current State: </span>
            <button className="btn bg-[--foreground] border-none text-white">
              Mark As In Progress
            </button>
          </span>
          <span className={styles["current-state-container"]}>
            <span>Current State: </span>
            <button className="btn bg-[--foreground] border-none text-white">
              Mark Refunded / Dissatisfied
            </button>
          </span>
          <button className="btn w-[max-content] bg-[--foreground] border-none text-white"
            onClick={()=> window.print()}
          >
            Print Receipt
          </button>
        </span>
      </span>
    </dialog>
  );
}