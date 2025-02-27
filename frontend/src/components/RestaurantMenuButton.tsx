"use client";
import React from 'react'
import {useRef} from 'react';
interface RestaurantMenuButtonProps{
    text: string;
    setCurrentSelection: (selection: string) => void;
    selected: boolean;
}
export default function RestaurantMenuButton({text, setCurrentSelection, selected}: RestaurantMenuButtonProps) {
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
    <button ref={buttonRef} className="restaurant-menu-button" onPointerDown={() => {
      setCurrentSelection(text);
      console.log(text)}}
      >{text}</button>
  )
}
