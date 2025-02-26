"use client";
import { useState, useEffect } from "react";

export default function Footer() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);
  return (
    <footer className="absolute bottom-[10px] text-[#638DE5] right-[50px]">
      <span>
        <pre>{date.toLocaleString()}</pre>
      </span>
    </footer>
  );
}
