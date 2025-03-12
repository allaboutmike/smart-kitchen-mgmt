import styles from "../styles/DataTable.module.css"
export type RowType ={
  name: string,
  thresholdQuantity?: number,
  quantity?: number,
  costPerUnit?: number,
  shelfLife?: string,
  wasteReason?: string,
  columnNames?: string[]
}

export default function Row(rowInfo:RowType) {
  return (   
        <tr className={styles["row-element"]}>
          {!rowInfo.columnNames && <td>{rowInfo.name}</td>}
          {!rowInfo.columnNames && (rowInfo.quantity || rowInfo.thresholdQuantity) && <td>{rowInfo.thresholdQuantity? rowInfo.thresholdQuantity: rowInfo.quantity}</td>}
          {!rowInfo.columnNames && <td>{rowInfo.costPerUnit}</td>}
      {!rowInfo.columnNames && (rowInfo.shelfLife || rowInfo.wasteReason) && <td>{rowInfo.shelfLife ? rowInfo.shelfLife : rowInfo.wasteReason}</td>}
      {rowInfo.columnNames && rowInfo.columnNames.map((columnName, index) => {
        return (
          <td key={index}>{columnName}</td>
        )
      })}
        </tr>        
  )
}