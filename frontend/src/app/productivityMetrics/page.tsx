import GridWasteMetrics from '@/components/GridWasteMetrics'
import ToastMessageNotification from '@/components/ToastMessageNotification'
import React from 'react'

export default function ProductivityMetricsPage() {
  return (
    <div className="main-container">
      <GridWasteMetrics />
      <ToastMessageNotification 
        alertMessage='An impressive alert message'
        alertName={"alert alert-info"}
      />
      <ToastMessageNotification 
        alertMessage='An impressive alert message'
        alertName={"alert alert-error"}
      />
      <ToastMessageNotification 
        alertMessage='An impressive alert message'
        alertName={"alert alert-success"}
      />
      <ToastMessageNotification 
        alertMessage='An impressive alert message'
        alertName={"alert alert-warning"}
      />
    </div>
  )
}
