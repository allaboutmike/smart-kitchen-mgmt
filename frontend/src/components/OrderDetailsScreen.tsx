import React from 'react'
import styles from "../styles/OrderDetailsScreen.module.css"
export default function OrderDetailsScreen() {
  return (
    <span className={styles["order-details-container"]}>
        <h1>OrderDetails</h1>
        <span className={styles["modify-order-container"]}>
            <h2>Modify Order</h2>
            <span className={styles["current-state-container"]}>
                <span>Current State: </span>
                <button>Mark As In Progress</button>
            </span>
            <span className={styles["current-state-container"]}>
                <span>Current State: </span>
                <button>MarkRefunded/Dissatisfied</button>
            </span>
            <button>Print Receipt</button>
        </span>
        <span className={styles["full-order-details-container"]}>
            <button className={styles["exit-button"]}>Exit</button>
            <span className={styles["order-details-header"]}>
                <span>Restaurant Name</span>
                <span>Order #08398</span>
                <span>Order Date</span>
            </span>
            <span className={styles["items-list-container"]}>

            </span>
            <span className={styles["purchase-cost-details"]}>
                <span>Subtotal: ............$20.00</span>
                <span>Taxt: ............$6.00</span>
                <span>Total: ............$26.00</span>
            </span>
            <span className={styles["message-and-payment-method-container"]}>
                <span>Payment Method:</span>
                <span>Credit Card(**** 2394)</span>
                <span>Message Here</span>
            </span>
        </span>
    </span>
  )
}
