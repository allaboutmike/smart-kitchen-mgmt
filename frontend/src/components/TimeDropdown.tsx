"use client";
import React, { useState } from "react";
import { useFetch } from "@/customHooks/useFetch";
import { Order } from "@/components/OrderReceiptManager";
import OrderDetailsScreen from "./OrderDetailsScreen";

const orderTimeFrames = [
  "Last Hour",
  "Last 12 Hours",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "All",
];

const now = new Date();
const timeRanges = new Map(
  Object.entries({
    "Last Hour": new Date(now.getTime() - 7 * 60 * 60 * 1000), // 1 hour ago
    "Last 12 Hours": new Date(now.getTime() - 18 * 60 * 60 * 1000), // 12 hours ago
    Yesterday: new Date(now.getTime() - 30 * 60 * 60 * 1000), // 24 hours ago
    "Last 7 Days": new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    "Last 30 Days": new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    All: new Date(0), // All-time (epoch start)
  })
);

function filterByDate(timeRange: string, orderData: Order[]) {
  const timeFilter = timeRanges.get(timeRange) || new Date(0);
  const filtered = orderData.filter((order) => {
    return new Date(order.ordertimestamp).getTime() > timeFilter.getTime();
  });
  return filtered;
}

export default function TimeDropdown() {
  const { data } = useFetch<{ orders: Order[] }>(
    "/orders?completed=true&orderItemsDetails=true"
  );
  const [toggle, setToggle] = useState(false);
  console.log("data:", data?.orders[0]);
  const orders = data?.orders;

  const formatDate = (dateString: Date | "") => {
    if (dateString) {
      const dateFormatOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
      };
      return dateString.toLocaleTimeString("default", dateFormatOptions);
    }
    return "";
  };

  return (
    <>
      <div className="dropdown-container">
        Completed Orders
        {orderTimeFrames.map((timeFrame: string, index) => {
          return (
            <table key={index}>
              <thead>
                <tr>
                  <th onClick={() => !setToggle}>{timeFrame}</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  filterByDate(timeFrame, orders).map(
                    (order: Order, orderIndex) => {
                      return (
                        <tr key={orderIndex}>
                          <td>{formatDate(new Date(order.ordertimestamp))}</td>
                          <td>{order.total || "BLOCKED"}</td>
                              <td>{(order.orderitems.some((item) => item.returned === true)) ? "ITEMS RETURNED" : "NO RETURNS"}</td>
                          <td>ID: {order.orderid}</td>
                          <td>
                            <button onClick={() => <OrderDetailsScreen />}>
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          );
        })}
      </div>
    </>
  );
}