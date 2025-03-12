import React from 'react'
import SelectableButton from './SelectableButton'
import { SelectionObject } from './SelectionObject'
import styles from "../styles/CustomSelectionMenu.module.css"
export interface ButtonsInfo extends SelectionObject , SelectionObject{ 
    buttonNames: string[] 
    passedClassName?: string
    containerClassName: string
}

export default function CustomMenuSelection(menuInfo: ButtonsInfo) {
    const defaultClassName = `${styles["button-selection-element"]} ${styles["selection-button"]}`
    const finalClassName = menuInfo.passedClassName? menuInfo.passedClassName: defaultClassName
    
  return (
    <div className={menuInfo.containerClassName}>
        {menuInfo.buttonNames.map((buttonName, index)=>{
                return <SelectableButton 
                key={`${index}${buttonName}`}
                buttonClassName={finalClassName}
                setCurrentSelection={menuInfo.setCurrentSelection}
                text={buttonName}
                selected={menuInfo.isCurrentSelection(buttonName)}
                />
            })        
        }
        {menuInfo.popularName && <SelectableButton 
            buttonClassName={finalClassName}
            setCurrentSelection={menuInfo.setCurrentSelection}
            text={menuInfo.popularName}
            selected={menuInfo.isCurrentSelection(menuInfo.popularName)}
        />}
        
    </div>
  )
}
