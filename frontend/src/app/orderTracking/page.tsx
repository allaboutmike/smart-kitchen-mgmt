"use client";
import React from "react";
import OrderTrackingMenu from "@/components/OrderTrackingMenu";

export default function OrderTrackingPage() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      // Fetching fake data from backend
      const response = await fetch("http://localhost:3001/api/orders/1");
      const data = await response.json();
      console.log(data); // Handle the fetched data
      setOrders([data.order]);
    }
    fetchData();
  }, []);

  return (
    <div className="main-container">
      <OrderTrackingMenu />
      <div>
        {orders.length ? (
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
