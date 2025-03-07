import React from 'react'
import { notificationIcons } from '@/app/svgIcons'
interface AlertNameProp{
    alertName: "-info"| "-success" | "-error" | "-warning"
    alertMessage: string,
}
export default function ToastMessageNotification({alertName, alertMessage}: AlertNameProp) {
    let icon;
    switch(alertName){
        case "-info": icon = notificationIcons.info; break;
        case "-error": icon =  notificationIcons.error; break;
        case "-success": icon = notificationIcons.success; break;
        case "-warning": icon = notificationIcons.warning; break;
        default: console.error("notification icon not found");
    }
  return (
    <div role="alert" className={`alert alert${alertName}`}>
        {icon && icon}
        <span>{alertMessage}</span>
    </div>
  )
}




