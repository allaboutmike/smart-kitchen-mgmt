'use client'
import { useRef } from "react";
import styles from "../styles/SideNavBar.module.css"
interface SelectableButtonProps {
    svgIcon?: React.ReactNode;
    text: string;
    setCurrentSelection: (selection: string) => void;
    selected: boolean;
    buttonClassName: string;
}
export default function SelectableButton({svgIcon, buttonClassName, text, setCurrentSelection, selected}: SelectableButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  if(buttonRef.current)
  {
    if(selected)
    {
      buttonRef.current.style.backgroundColor = "var(--foreground)";      
      buttonRef.current.style.color = "white"; 
    }else{
      buttonRef.current.style.backgroundColor = "white";
      buttonRef.current.style.color = "unset";
    }
  }
  return (
    <button className={buttonClassName} ref={buttonRef} onClick={() => {
      if(!selected) setCurrentSelection(text);
    }}>
      {svgIcon && svgIcon}
      <div className={styles["selectable-button-text"]}>{text}</div>
    </button>
  )
}