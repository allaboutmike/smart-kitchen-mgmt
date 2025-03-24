'use client'
import {useState} from 'react'

export default function useSelection(selection: string = "none") {
    const [currentSelection, setCurrentSelection] = useState(selection)
    const isCurrentSelection = (passedValue: string)=>{
        return currentSelection.toLowerCase() === passedValue.toLowerCase().trimStart() 
    }
  return {currentSelection, setCurrentSelection, isCurrentSelection}
}
