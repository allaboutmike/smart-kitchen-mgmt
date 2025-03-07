import React from 'react'
import { notificationIcons } from '@/app/svgIcons'
interface AlertNameProp{
    alertName: "alert alert-info"| "alert alert-success" | "alert alert-error" | "alert alert-warning"
    alertMessage: string,
}
export default function ToastMessageNotification({alertName, alertMessage}: AlertNameProp) {
    let icon;
    switch(alertName){
        case "alert alert-info": icon = notificationIcons.info; break;
        case "alert alert-error": icon =  notificationIcons.error; break;
        case "alert alert-success": icon = notificationIcons.success; break;
        case "alert alert-warning": icon = notificationIcons.warning; break;
        default: console.error("notification icon not found");
    }
    const passedClass = "alert alert"+alertName
  return (
    <div role="alert" className={passedClass}>
        {icon && icon}
        <span>{alertMessage}</span>
    </div>
  )
}




