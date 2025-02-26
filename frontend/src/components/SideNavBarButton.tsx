"use client";
import React from 'react'
import {useEffect, useRef} from 'react';

interface SideNavBarButtonProps {
    svgIcon: React.ReactNode;
    text: string;
    setCurrentSelection: (selection: string) => void;
    currentText: string;
}
export default function SideNavBarButton({svgIcon, text, setCurrentSelection, currentText}: SideNavBarButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if(!buttonRef.current) return;
    if(currentText == text){
      buttonRef.current.style.backgroundColor = "var(--foreground)";      
      buttonRef.current.style.color = "var(--background)";   
    }else{
      buttonRef.current.style.backgroundColor = "initial";
      buttonRef.current.style.color = "var(--foreground)";
    }

  }, [currentText, text]);
  return (
    <button className="side-nav-bar-button" ref={buttonRef} onPointerDown={() => {
      setCurrentSelection(text);
    }}>
      {svgIcon}
      <div>{text}</div>
    </button>
  )
}
