"use client";
import { useState, useEffect } from "react";

export default function Footer() {
  const [date, setDate] = useState(new Date());

  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(() => new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <footer className="footer-component">
      <span>{<pre>{formatter.format(date).replace(" at", "")}</pre>}</span>
    </footer>
  );
}
