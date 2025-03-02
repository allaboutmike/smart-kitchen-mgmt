import React from "react";
import { RowType } from "./Row";
import DataTable, { TableInfo } from "./DataTable";

export default function GridWasteMetrics() {
  const data: TableInfo = {
    tableTitle: "Waste Metrics",
    headCellNames: ["Name", "Quantity", "Cost Per Unit", "Waste Reason"],
    rowData: {
      name: "name",
      quantity: 1,
      costPerUnit: 20,
      wasteReason: "Reason",
    } as RowType,
  };
  return <DataTable {...data} />;
}
