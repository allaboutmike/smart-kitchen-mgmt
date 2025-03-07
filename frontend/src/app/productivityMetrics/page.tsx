import GridWasteMetrics from '@/components/GridWasteMetrics'
import ToastMessageNotification from '@/components/ToastMessageNotification'
import React from 'react'

export default function ProductivityMetricsPage() {
  return (
    <div className="main-container">
      <GridWasteMetrics />
      <ToastMessageNotification 
        alertMessage='An impressive alert message'
        alertName='-info'
      />
      <ToastMessageNotification 
        alertMessage='An impressive alert message'
        alertName='-error'
      />
      <ToastMessageNotification 
        alertMessage='An impressive alert message'
        alertName='-success'
      />
      <ToastMessageNotification 
        alertMessage='An impressive alert message'
        alertName='-warning'
      />
    </div>
  )
}
