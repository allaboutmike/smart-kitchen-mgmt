"use client";
import React from 'react'
import {useRef} from 'react';

interface SideNavBarButtonProps {
    svgIcon: React.ReactNode;
    text: string;
    setCurrentSelection: (selection: string) => void;
    selected: boolean;
}
export default function SideNavBarButton({svgIcon, text, setCurrentSelection, selected}: SideNavBarButtonProps) {
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
    <button className="side-nav-bar-button" ref={buttonRef} onPointerDown={() => {
      setCurrentSelection(text);
    }}>
      {svgIcon}
      <div>{text}</div>
    </button>
  )
}
