"use client";
import {useState} from "react"
import {svgIcons} from "@/app/svgIcons";
import styles from "../styles/OrderStatusNotifier.module.css"
interface NotificationProp{
  orderComplete: boolean;
}
export default function OrderStatusNotifier({orderComplete}:NotificationProp) {
  const [showText, setShowText] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setShowText((prevVal) => !prevVal);
        }}
        className={styles["order-status"]}
      >
        {orderComplete && svgIcons.greenCheckMark}
        {showText && <span className={styles["order-complete"]}>Complete</span>}
      </div>
    </>
  );
}
