"use client";
import React, { useState } from "react";
import { Order } from "@/components/OrderReceiptManager";
import { svgIcons } from "@/app/svgIcons";
import styles from "@/styles/TimeDropdown.module.css";

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
    "Last Hour": new Date(now.getTime() - 1 * 60 * 60 * 1000),
    "Last 12 Hours": new Date(now.getTime() - 12 * 60 * 60 * 1000),
    Yesterday: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    "Last 7 Days": new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    "Last 30 Days": new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    All: new Date(0),
  })
);

function filterByDate(timeRange: string, orderData: Order[]) {
  const timeFilter = timeRanges.get(timeRange) || new Date(0);
  const filtered = orderData.filter((order) => {
    return new Date(order.ordertimestamp).getTime() > timeFilter.getTime();
  });
  return filtered.sort(
    (a, b) =>
      new Date(b.ordertimestamp).getTime() -
      new Date(a.ordertimestamp).getTime()
  );
}

export interface TimeDropdownProps {
  orders: Order[] | undefined;
  setOrderDetails: (order: Order) => void;
}

export default function TimeDropdown(orderData: TimeDropdownProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const orders = orderData?.orders;
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
    <div className={`${styles["dropdown-container"]}`}>
      <h2 className={`${styles["page-heading"]}`}>
        Completed Orders
      </h2>
      {orderTimeFrames.map((timeFrame: string, index) => {
        const filteredOrders = orders ? filterByDate(timeFrame, orders) : [];
        return (
          <div
            key={index}
            className={`${styles["table-container"]}  ${
              currentIndex === index
                ? ""
                : "drop-shadow-[0_4px_4px_var(--drop-shadow-color)]"
            }`}
          >
            <table className={`${styles["dropdown-table"]} `}>
              <thead className={`${styles["table-head"]}`}>
                <tr>
                  <th
                    onClick={() => {
                      setCurrentIndex((prevIndex) =>
                        prevIndex !== index ? index : -1
                      );
                    }}
                    className={`${styles["table-title"]}`}
                  >
                    {timeFrame}
                    <span
                      className={`${
                        currentIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      {svgIcons.dropdownIcon}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody
                className={`${
                  currentIndex === index && filteredOrders.length > 5
                    ? `${styles["table-body"]}`
                    : ""
                } `}
              >
                {filteredOrders &&
                  filteredOrders.map((order: Order, orderIndex) => {
                    return (
                      <tr
                        key={orderIndex}
                        className={`${currentIndex === index ? `${styles["table-row-format"]}` : `${styles["hide-data"]}`}  ${orderIndex % 2 ? "bg-slate-200" : ""} `}
                      >
                        <td className={`${styles["order-data"]}`}>
                          {formatDate(new Date(order.ordertimestamp))}
                        </td>
                        <td className={`${styles["dividers"]}`}></td>
                        <td className={`${styles["order-data"]}`}>
                          {(order.orderitems ?? [])
                            .reduce(
                              (prev, curr) =>
                                prev + Number(curr.menuitems?.price ?? 0),
                              0
                            )
                            .toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                        </td>
                        <td className={`${styles["dividers"]}`}></td>
                        <td className={`${styles["order-data"]}`}>
                          {(order.orderitems ?? []).some(
                            (item) => item?.returned === true
                          )
                            ? "ITEMS RETURNED"
                            : "NO RETURNS"}
                        </td>
                        <td className={`${styles["dividers"]}`}></td>
                        <td className={`${styles["order-data"]}`}>ID: {order.orderid}</td>
                        <td className={`${styles["dividers"]}`}></td>
                        <td className={`${styles["order-data"]}`}>
                          <button
                            id={order.orderid}
                            onClick={() => {
                              orderData.setOrderDetails(order);
                            }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                {index === currentIndex && !filteredOrders.length && (
                  <tr>
                    <td className={`${styles["empty-state"]}`}>No orders to display.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
