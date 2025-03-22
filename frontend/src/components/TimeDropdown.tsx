"use client";
import React, { useState } from "react";
import { Order } from "@/components/OrderReceiptManager";
import { svgIcons } from "@/app/svgIcons";

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
    <div className="dropdown-container flex flex-col gap-[40px] text-black mb-16">
      <h2 className="text-[32px] text-[#6785FF] font-semibold mb-[-1.25rem] mt-[2rem]">Completed Orders</h2>
      {orderTimeFrames.map((timeFrame: string, index) => {
        const filteredOrders = orders ? filterByDate(timeFrame, orders) : [];
        return (
          <table key={index} className={`border border-[2.5px] border-black w-[751px] text-[1rem] ${currentIndex === index ?"": "drop-shadow-[0_4px_4px_rgb(0,0,0,0.25)]"} cursor-pointer`}>
            <thead className="bg-white hover:bg-slate-200">
              <tr>
                <th
                  onClick={() => {
                    setCurrentIndex((prevIndex) =>
                      prevIndex !== index ? index : -1
                    );
                  }}
                  className="border border-b-black flex p-[12.64px] justify-between items-center h-[64.64px]"
                >
                  {timeFrame}<span className={`${currentIndex === index ? "rotate-180" : ""}`}>{svgIcons.dropdownIcon}</span>
                </th>
              </tr>
            </thead>
            <tbody className={`${currentIndex === index && filteredOrders.length > 5 ? "block h-[20rem] overflow-y-auto" : ""} `}>
              {filteredOrders &&
                filteredOrders.map((order: Order, orderIndex) => {
                  return (
                    <tr
                      key={orderIndex}
                      className={`${
                        currentIndex === index ? "visible" : "hidden"
                          } ${orderIndex % 2 ? "bg-slate-200": ""} grid grid-flow-col grid-cols-[1fr_10px_1fr_10px_1fr_10px_1fr_10px_1fr] auto-cols-fr border border-b-[1px] border-black py-[10px] justify-items-center text-center h-[58px] items-center`}
                    >
                          <td className="w-[100%]">{formatDate(new Date(order.ordertimestamp))}</td>
                          <td className="w-[0.5px] h-[35px] bg-stone-500"></td>
                      <td className="w-[100%]">
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
                          <td className="w-[0.5px] h-[35px] bg-stone-500"></td>
                      <td className="w-[100%]">
                        {(order.orderitems ?? []).some(
                          (item) => item?.returned === true
                        )
                          ? "ITEMS RETURNED"
                          : "NO RETURNS"}
                          </td>
                          <td className="w-[0.5px] h-[35px] bg-stone-500"></td>
                          <td className="w-[100%]">ID: {order.orderid}</td>
                          <td className="w-[0.5px] h-[35px] bg-stone-500"></td>
                      <td className="w-[100%]">
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
                  <td className="text-center">No orders to display.</td>
                </tr>
              )}
            </tbody>
          </table>
        );
      })}
    </div>
  );
}
