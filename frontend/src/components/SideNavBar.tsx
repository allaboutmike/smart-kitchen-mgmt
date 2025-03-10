"use client";
import React from 'react'
import {svgIcons} from "../app/svgIcons";
import {useRouter} from 'next/navigation';
import useSelection from '@/customHooks/useSelection';
import SelectableButton from './SelectableButton';
import styles from '../styles/SideNavBar.module.css'
export default function SideNavBar() {
  const {setCurrentSelection, isCurrentSelection} = useSelection()
  const router = useRouter();
  const updateCurrentSelection =(passedSelection: string)=>{    
    setCurrentSelection(passedSelection);
    switch(passedSelection){      
      case "Home": {router.push("/");break;}
      case "Menu Manager": {router.push("/menuManagement");break;}
      case "Order Tracking": {router.push("/orderTracking");break;}
      case "Inventory Tracker": {router.push("/inventoryTracker");break;}
      case "Productivity Metrics": {router.push("/productivityMetrics");break;}
      case "Settings": {router.push("/settings");break;}
    }    
  }
 
  return (
    <div className={styles["side-nav-bar"]}>      
        <SelectableButton buttonClassName={styles["side-nav-bar-button"]} svgIcon={svgIcons.home} selected={isCurrentSelection("Home")} setCurrentSelection={updateCurrentSelection} text="Home"/>
        <SelectableButton buttonClassName={styles["side-nav-bar-button"]} svgIcon={svgIcons.menuManager} selected={isCurrentSelection("Menu Manager")} setCurrentSelection={updateCurrentSelection} text="Menu Manager"/>
        <SelectableButton buttonClassName={styles["side-nav-bar-button"]} svgIcon={svgIcons.orderTracking} selected={isCurrentSelection("Order Tracking")} setCurrentSelection={updateCurrentSelection} text="Order Tracking"/>
        <SelectableButton buttonClassName={styles["side-nav-bar-button"]} svgIcon={svgIcons.inventory} selected={isCurrentSelection("Inventory Tracker")} setCurrentSelection={updateCurrentSelection} text="Inventory Tracker"/>
        <SelectableButton buttonClassName={styles["side-nav-bar-button"]} svgIcon={svgIcons.productivity} selected={isCurrentSelection("Productivity Metrics")} setCurrentSelection={updateCurrentSelection} text="Productivity Metrics"/>
        <SelectableButton buttonClassName={styles["side-nav-bar-button"]} svgIcon={svgIcons.settings} selected={isCurrentSelection("Settings")} setCurrentSelection={updateCurrentSelection} text="Settings"/>      
    </div>
  )
}
