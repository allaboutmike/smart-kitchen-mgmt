import React from "react";
import styles from "../styles/OrderDetailsScreen.module.css";
import { Order } from "./OrderReceiptManager";
import scrollBarToggle from "./scrollBarToggle";

export interface OrderDetails{
  order: Order | null,
  updateOrderDetailsScreen: (order: Order | null) => void
}

export default function OrderDetailsScreen(orderDetails: OrderDetails) {
  const oDetails = orderDetails.order  
  const disableModal =()=>{
    scrollBarToggle(true)
    orderDetails.updateOrderDetailsScreen(null)
  }
  scrollBarToggle(false)
  const orderTotal = oDetails?.orderitems.reduce((acc, curr)=>{ return acc + parseFloat(curr.menuitems.price.toString())},0)
  const tax = parseFloat(((Math.random() * 10) + 1).toFixed(2));
  const finalPrice = orderTotal? (tax + orderTotal).toFixed(2): 0;
  const orderTimeStamp = new Date(oDetails?.ordertimestamp || "").toLocaleString("en-US", { timeZone: "UTC" })
  return (
    <>
      <span className={styles["order-details-container-bg"]} onClick={()=>{        
        disableModal()
      }}></span>
      <dialog className={styles["order-details-container"]} 
      onLoadStart={(e)=> e.currentTarget.focus()}
      onKeyDown={(e)=> {
        if(e.key ===  'Escape') disableModal()
      }}
      >      
        <h1 className={styles["order-details-title"]}>Order Details</h1>
        <button className={styles["exit-button"]}
        onClick={disableModal}
        >Exit</button>
        <span className= {styles["info-panels-container"]}>        
          <span className={styles["full-order-details-container"]}>
            <span className={styles["order-details-header"]}>
              <p>Chicken Queen</p>
              <p>Order #{oDetails?.orderid}</p>
              <p>Order Date: {orderTimeStamp.split(",")[0]}</p>
            </span>
            <span className={styles["items-list-container"]}>
              {oDetails?.orderitems && oDetails?.orderitems.map((elem, index)=>{
                  return(
                      <ul key={index}>
                      <li>Order Name {elem.menuitems.name}</li>
                          <li>${Number(elem.menuitems.price).toFixed(2)}</li>
                      </ul>
                  )
              })}
            </span>
            <span className={styles["purchase-cost-details"]}>
              <p>Subtotal: ............${orderTotal? orderTotal.toFixed(2): 0}</p>
              <p>Tax: ............${tax}</p>
              <p>Total: ............${finalPrice}</p>
            </span>
            <span className={styles["message-and-payment-method-container"]}>
              <p>Payment Method:</p>
              <select name="payment-method" id={styles["payment-method"]}>
                <option className={styles["option-selection"]} value="credit-card">Credit Card (**** 2394)</option>
                <option className={styles["option-selection"]} value="Debit-debit">Debit Card (**** 4596)</option>
                <option className={styles["option-selection"]} value="cash">Cash</option>
                <option className={styles["option-selection"]} value="payPal">PayPal</option>
              </select>
              <p>{`Thank you for choosing Chicken Queen Chicken! Have a great day! 👑🐔`}</p>
            </span>
          </span>
          <span className={styles["modify-order-container"]}>
            <h2 className={styles["modify-order-button"]}>Modify Order</h2>
            <span className={styles["current-state-container"]}>
              <span>Current State: {orderDetails.order?.completed? "Completed": "In Progress"}</span>
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
            <button className={styles["print-receipt-button"]}
              onClick={()=> window.print()}
            >
              Print Receipt
            </button>
          </span>
        </span>
      </dialog>
    </>
    
  );
}