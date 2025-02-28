import React from "react";

export default function OrderTrackingButton() {
  return (
    <div className="order-tracking-button-container">
      <button className="order-tracking-button">Current Orders</button>
      <button className="order-tracking-button">Completed Orders</button>
    </div>
  );
}
