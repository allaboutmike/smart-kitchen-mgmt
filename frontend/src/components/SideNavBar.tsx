"use client";
import React from 'react'
import {svgIcons} from "../app/svgIcons";
import {useRouter, usePathname} from 'next/navigation';
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
  const pageNow = usePathname()
  console.log(pageNow)
  const canDisplay =()=>{
    switch(pageNow){
      case "/pos": return false; break;
      case "/select-portal": return false; break;
      case "/": return false; break;
      default: return true;
    }
  }
  const buttonNames = ["Home", "Menu Manager", "Order Tracking", "Inventory Tracker", "Productivity Metrics", "Settings"]
  const buttonIcons = [svgIcons.home, svgIcons.menuManager, svgIcons.orderTracking,
    svgIcons.inventory, svgIcons.productivity, svgIcons.settings]
  const buttonStyle = styles["side-nav-bar-button"]
  return (
    
      <>
        { canDisplay() && <div className={`${styles["side-nav-bar"]} dock`}>      
          {buttonNames.map((buttonName, buttonIndex)=>{
            return <SelectableButton 
                key={buttonIndex}
                buttonClassName={buttonStyle} 
                svgIcon={buttonIcons[buttonIndex]} 
                selected={isCurrentSelection(buttonName)} 
                setCurrentSelection={updateCurrentSelection} 
                text={buttonName}
              />
            }
          )}
        </div>}
      </>
      
  )
}
