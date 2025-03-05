import DataTable, { TableInfo } from "./DataTable";
import { RowType } from "./Row";

export default function ProductInventoryContainer() {
  const data: TableInfo = {
    tableTitle: "Product Inventory Overview",
    headCellNames: [
      "Name",
      "Threshold Quantity",
      "Cost Per Unit",
      "Shelf Life",
    ],
    rowData: {
      name: "name",
      thresholdQuantity: 1,
      costPerUnit: 20,
      shelfLife: "Reason",
    } as RowType,
  };
  return <DataTable {...data} />;
}
