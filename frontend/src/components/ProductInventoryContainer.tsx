import React from 'react'
import Row from './Row'

export default function ProductInventoryContainer() {
  return (
    <div className="grid-metrics">
        <div className="metrics-title">Product Inventory Overview</div>                
            <div className="metrics-cells-container">
                <div className="row-element">
                    <div>Name</div>
                    <div>Threshold Quantity</div>
                    <div>Cost Per Unit</div>
                    <div>Shelf Life</div>
                </div>            
                {
                    Array.from({ length: 60 }).map((_, index) => {
                        return <Row key={index} name="name" thresholdQuantity={index*10} costPerUnit={index} shelfLife="reason" />
                    })
                }   
            </div>           
    </div>
  )
}
