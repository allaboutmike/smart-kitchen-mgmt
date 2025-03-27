'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Chatbot from './Chatbot';

export default function ChatbotWrapper() {
  const pathname = usePathname();
  
  // Function to determine if chatbot should be displayed on current page
  const canDisplay = () => {
    switch(pathname) {
      case "/pos": return false;
      case "/select-portal": return false;
      case "/": return false;
      default: return true;
    }
  };
  
  // Only render the Chatbot if canDisplay returns true
  return (
    <>
      {canDisplay() && <Chatbot />}
    </>
  );
}