"use client";
import { useState, useEffect } from "react";

export default function Footer() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(() => new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <footer className="footer-component">
      <span>{<pre>{date.toLocaleString()}</pre>}</span>
    </footer>
  );
}
