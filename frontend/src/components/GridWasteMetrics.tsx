import React from 'react'
import WasteRow from './WasteRow'
export default function GridWasteMetrics() {
  return (
    <div className="grid-metrics">
        <div className="metrics-title">Waste Metrics</div>
        <div className ="metrics-cells-container">
              <div className="row-element">
                  <div>Name</div>
                  <div>Quantity</div>
                  <div>Cost Per Unit</div>
                  <div>Waste Reason</div>
              </div>
            
            {
                Array.from({ length: 60 }).map((_, index) => {
                    return <WasteRow key={index} name="name" quantity={index*10} costPerUnit={index} wasteReason="reason" />
                })
            }
        </div>
    </div>
  )
}

