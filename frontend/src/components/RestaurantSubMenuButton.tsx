"use client";
import React from 'react'
import {useRef} from 'react';
interface RestaurantSubMenuButtonProps{
    text: string;
    setCurrentSelection: (selection: string) => void;
    selected: boolean;
}
export default function RestaurantSubMenuButton({text, setCurrentSelection, selected}: RestaurantSubMenuButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    if(buttonRef.current)
    {
        if(selected)
        {
            buttonRef.current.style.backgroundColor = "var(--foreground)";      
            buttonRef.current.style.color = "var(--background)"; 
        }else{
            buttonRef.current.style.backgroundColor = "initial";
            buttonRef.current.style.color = "var(--foreground)";
        }
    }
  return (
    <button ref={buttonRef} className="restaurant-sub-menu-button" onClick={() => {
      setCurrentSelection(text.trimStart());
      }}
      >{text}</button>
  )
}
