"use client";
import React from "react";
import OrderTrackingMenu from "@/components/OrderTrackingMenu";
import { useFetch } from "@/customHooks/useFetch";

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
              <div key={order?.id}>
                <p>{order?.items[0].productName}</p>
                <p>{order?.status}</p>
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


type Order = {
  id: string;
  items: Item[];
  status: string;
  total: number;
  timePlaced: string;
};

type Item = {
  productId: string;
  productName: string;
  ingredients: { [key: string]: boolean };
  notes: string;
};
