import React from 'react'
interface WasteRowProps{
    name: string;
    quantity: number;
    costPerUnit: number;
    wasteReason: string;
}
export default function GridWasteRow({name, quantity, costPerUnit, wasteReason}: WasteRowProps) {
  return (   
        <div className="grid-waste-rows">
          <div>{name}</div>
          <div>{quantity}</div>
          <div>{costPerUnit}</div>
          <div>{wasteReason}</div>
        </div>        
  )
}
