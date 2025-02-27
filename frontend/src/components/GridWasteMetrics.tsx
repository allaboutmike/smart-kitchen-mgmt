import React from 'react'
import GridWasteRow from './GridWasteRow'
export default function GridWasteMetrics() {
  return (
    <div className="grid-waste-metrics">
        <div className="waste-metrics-title">Waste Metrics</div>
        <div className ="waste-metrics-cells-container">
              <div className="grid-waste-rows">
                  <div>Name</div>
                  <div>Quantity</div>
                  <div>Cost Per Unit</div>
                  <div>Waste Reason</div>
              </div>
            
            {
                Array.from({ length: 60 }).map((_, index) => {
                    return <GridWasteRow key={index} name="name" quantity={index*10} costPerUnit={index} wasteReason="reason" />
                })
            }
        </div>
    </div>
  )
}

