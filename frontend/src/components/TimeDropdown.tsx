"use client";
import React, { useState } from "react";
import DataTable, { TableInfo } from "./DataTable";
import { RowType } from "./Row";

const orderTimeFrames = [
  "Last Hour",
  "Last 12 Hours",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "All",
];

type faker = {
  time: string;
  total: number;
  returned: boolean;
  orderId: string;
};

function parseDate(order: faker) {
  //const orderDate
}

const dummyData = [
  {
    time: "2025-03-12T20:30:00Z", // 8:30pm
    total: 120.5,
    returned: false,
    orderId: "ORD12345",
  },
  {
    time: "2025-03-09T23:15:00Z",
    total: 85.75,
    returned: true,
    orderId: "ORD12346",
  },
  {
    time: "2025-03-07T10:00:00Z",
    total: 200.0,
    returned: false,
    orderId: "ORD12347",
  },
  {
    time: "2025-03-05T10:45:00Z",
    total: 50.25,
    returned: true,
    orderId: "ORD12348",
  },
  {
    time: "2025-03-01T11:30:00Z",
    total: 175.9,
    returned: false,
    orderId: "ORD12349",
  },
  {
    time: "2025-02-28T12:15:00Z",
    total: 95.6,
    returned: true,
    orderId: "ORD12350",
  },
  {
    time: "2025-02-21T13:00:00Z",
    total: 300.45,
    returned: false,
    orderId: "ORD12351",
  },
  {
    time: "2025-02-14T13:45:00Z",
    total: 65.3,
    returned: true,
    orderId: "ORD12352",
  },
  {
    time: "2025-01-28T14:30:00Z",
    total: 110.8,
    returned: false,
    orderId: "ORD12353",
  },
  {
    time: "2025-01-28T15:15:00Z",
    total: 250.2,
    returned: true,
    orderId: "ORD12354",
  },
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

function filterByDate(timeRange: string, dummyData: faker[]) {
  const timeFilter = timeRanges.get(timeRange) || new Date(0);
  const filtered = dummyData.filter((order) => {
    return new Date(order.time).getTime() > timeFilter.getTime();
  });
  return filtered;
}

export default function TimeDropdown() {
    console.log(new Date(dummyData[0].time).toLocaleString("en-US"));
    console.log(filterByDate(orderTimeFrames[2], dummyData))

  return (
    <div className="dropdown-container">
      Completed Orders
      {orderTimeFrames.map((timeFrame: string, index) => {
        const { time, total, returned, orderId } = dummyData[index];
        const data: TableInfo = {
          tableTitle: timeFrame,
          headCellNames: ["Time", "Total", "Returned", "OrderId"], // Ask Deja if we should include headings or not
          rowData: {
            columnNames: [
              time,
              total,
              returned ? "RETURNED" : "NOT RETURNED",
              orderId,
            ],
          } as RowType,
        };
        return <DataTable key={index} {...data} />;
      })}
    </div>
  );
}

{
  /* <div
            className="collapse collapse-arrow bg-base-100 border border-base-300"
            key={index}
          >
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold">{timeFrame}</div>
            <div className="collapse-content text-sm">
              {filterByDate(timeFrame, dummyData).map((receipt) => {
                return (
                  <div key={receipt.orderId}>
                    {`${receipt.time} $${receipt.total} ${
                      receipt.returned ? "RETURNED" : "NOT RETURNED"
                    } ID:${receipt.orderId} View Details`}
                  </div>
                );
              })}
            </div>
          </div> */
}
