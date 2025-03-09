import ToastMessageNotification from '@/components/ToastMessageNotification'
import React from 'react'

export default function SettingsPage() {
  return (
    <>
      <div className="main-container">Settings</div>
      <ToastMessageNotification alertName= "info"  alertMessage='some message'/>
      <ToastMessageNotification alertName= {"warning"}  alertMessage='some message'/>
      <ToastMessageNotification alertName= {"success"}  alertMessage='some message'/>
      <ToastMessageNotification alertName= {"error"}  alertMessage='some message'/>
    </>
  )
}
