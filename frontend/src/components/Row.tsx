export type RowType ={
  name: string,
  thresholdQuantity?: number,
  quantity?: number,
  costPerUnit: number,
  shelfLife?: string,
  wasteReason?: string
}

export default function Row(rowInfo:RowType) {
  return (   
        <tr className="row-element">
          <td>{rowInfo.name}</td>
          {(rowInfo.quantity || rowInfo.thresholdQuantity) && <td>{rowInfo.thresholdQuantity? rowInfo.thresholdQuantity: rowInfo.quantity}</td>}
          <td>{rowInfo.costPerUnit}</td>
          {(rowInfo.shelfLife || rowInfo.wasteReason) && <td>{rowInfo.shelfLife? rowInfo.shelfLife: rowInfo.wasteReason}</td>}
        </tr>        
  )
}