"use client";
import { useState, useEffect } from "react";

export default function Footer() {
   
  const [formattedDate, setFormattedDate] = useState("");
  const updateDate =()=>{
    const date = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    });    
    const newStringDate = formatter.format(date).replace(" at", "")
    setFormattedDate(newStringDate)
  } 
  useEffect(() => {
    const timer = setInterval(updateDate, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <footer className="footer-component">
      <span>{formattedDate}</span>
    </footer>
  );
}
