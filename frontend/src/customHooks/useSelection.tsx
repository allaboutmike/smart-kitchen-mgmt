'use client'
import {useState} from 'react'

export default function useSelection() {
    const [currentSelection, setCurrentSelection] = useState("none")
    const isCurrentSelection = (passedValue: string)=>{
        return currentSelection.toLowerCase() === passedValue.toLowerCase().trimStart() 
    }
  return {currentSelection, setCurrentSelection, isCurrentSelection}
}
