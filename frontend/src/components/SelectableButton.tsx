import { useRef } from "react";
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
      buttonRef.current.style.color = "var(--background)"; 
    }else{
      buttonRef.current.style.backgroundColor = "initial";
      buttonRef.current.style.color = "var(--foreground)";
    }
  }
  return (
    <button className={buttonClassName} ref={buttonRef} onClick={() => {
      setCurrentSelection(text);
    }}>
      {svgIcon && svgIcon}
      <div>{text}</div>
    </button>
  )
}