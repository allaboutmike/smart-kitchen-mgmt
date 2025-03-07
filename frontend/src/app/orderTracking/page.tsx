"use client";
import React from "react";
import OrderTrackingMenu from "@/components/OrderTrackingMenu";
import { useFetch } from "@/customHooks/useFetch";
import OrderReceiptManager, { Order } from "@/components/OrderReceiptManager";

export default function OrderTrackingPage() {
  const { data: orders } = useFetch<Order[]>("/orders/1");

  return (
    <div className="main-container">
      <OrderTrackingMenu />
      <div>
        {orders && orders.length ? (
          <div>
            <h1>Orders</h1>
            {orders.map((order) => (
              <div key={order.id}>
                <OrderReceiptManager order={order} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>No Orders</h1>
          </div>
        )}
      </div>
    </div>
  );
}
