import React from "react";
import Row, { RowType } from "./Row";
import styles from "../styles/DataTable.module.css"
export type TableInfo = {
  tableTitle: string;
  headCellNames: string[];
  rowData: RowType;
};
export default function DataTable(tableInfo: TableInfo) {
  return (
    <div className={styles["grid-metrics"]}>
      <span className={styles["metrics-title"]}>{tableInfo.tableTitle}</span>
      <table className={styles["metrics-cells-container"]}>
        <thead className={styles["thead-container"]}>
          <tr className={styles["row-element"]}>
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
