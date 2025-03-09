import React from 'react'
import { notificationIcons } from '@/app/svgIcons'
interface AlertNameProp{
    alertName: "info"| "success" | "error" | "warning"
    alertMessage: string,
}
export default function ToastMessageNotification({alertName, alertMessage}: AlertNameProp) {
    let icon;
    let passedClass = "";
    switch(alertName){
        case "info": icon = notificationIcons.info;  passedClass= "alert alert-info"; break;
        case "error": icon =  notificationIcons.error;  passedClass= "alert alert-error"; break;
        case "success": icon = notificationIcons.success;  passedClass= "alert alert-success"; break;
        case "warning": icon = notificationIcons.warning;  passedClass= "alert alert-warning"; break;
        default: console.error("notification icon not found");
    }    
  return (
    <div role="alert" className={passedClass}>
        {icon && icon}
        <span>{alertMessage}</span>
    </div>
  )
}
