import React from 'react'
interface WasteRowProps{
    name: string;
    quantity: number;
    costPerUnit: number;
    wasteReason: string;
}
export default function WasteRow({name, quantity, costPerUnit, wasteReason}: WasteRowProps) {
  return (   
        <div className="row-element">
          <div>{name}</div>
          <div>{quantity}</div>
          <div>{costPerUnit}</div>
          <div>{wasteReason}</div>
        </div>        
  )
}
