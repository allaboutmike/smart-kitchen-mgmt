interface RowProps{
    name: string;
    thresholdQuantity: number;
    costPerUnit: number;
    shelfLife: string;
}
export default function WasteRow({name, thresholdQuantity, costPerUnit, shelfLife}: RowProps) {
  return (   
        <div className="row-element">
          <div>{name}</div>
          <div>{thresholdQuantity}</div>
          <div>{costPerUnit}</div>
          <div>{shelfLife}</div>
        </div>        
  )
}