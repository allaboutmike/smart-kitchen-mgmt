"use client";
import React, { useEffect, useState } from "react";
import {svgIcons} from "@/app/svgIcons";
import styles from "../styles/OrderStatusNotifier.module.css"
export default function OrderStatusNotifier() {
  //Need to add state logic for the change in image
  //onClick will change the checkmark used
  //But to go from empty checkmark to green checkmark without completed, isn't that based on the order status? So I could use an if statement for that or a conditional render?

  const [orderReady, setOrderReady] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOrderReady((prevVal) => !prevVal);
    }, 4000);
  }, []);

  return (
    <>
      <div
        onClick={() => {
          setOrderComplete((prevVal) => !prevVal);
        }}
        className={styles["order-status"]}
      >
        {!orderReady ? svgIcons.emptyCheckMark : svgIcons.greenCheckMark}
        {orderComplete && <span className={styles["order-complete"]}>Complete</span>}
      </div>
    </>
  );
}
