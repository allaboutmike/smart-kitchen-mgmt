"use client";
import React, { useEffect, useState } from "react";
import svgIcons from "@/app/svgIcons";

export default function CheckMark() {
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
      >
        {!orderReady ? svgIcons.emptyCheckMark : svgIcons.greenCheckMark}
        {orderComplete && <span>Complete</span>}
      </div>
    </>
  );
}
