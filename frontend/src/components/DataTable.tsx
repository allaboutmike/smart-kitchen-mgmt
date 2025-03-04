import React from "react";
import Row, { RowType } from "./Row";
export type TableInfo = {
  tableTitle: string;
  headCellNames: string[];
  rowData: RowType;
};
export default function DataTable(tableInfo: TableInfo) {
  return (
    <div className="grid-metrics">
      <span className="metrics-title">{tableInfo.tableTitle}</span>
      <table className="metrics-cells-container">
        <thead >
          <tr className="row-element">
            {tableInfo.headCellNames.map((entry: string, index: number) => {
              return <th key={index}>{entry}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 60 }).map((_, index) => {
            return <Row key={index} {...tableInfo.rowData} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
