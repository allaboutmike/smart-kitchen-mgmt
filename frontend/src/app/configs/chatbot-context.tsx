'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import defaultChatbotConfig, { ChatbotConfig } from './chatbotConfig';

// Create context
type ChatbotContextType = {
  config: ChatbotConfig;
  updateConfig: (newConfig: ChatbotConfig) => void;
  resetToDefault: () => void;
};

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

// Provider component
export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ChatbotConfig>(defaultChatbotConfig);

  // Load config from localStorage on initial render
  useEffect(() => {
    const savedConfig = localStorage.getItem('dineflow-chatbot-config');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error('Error loading chatbot config:', e);
      }
    }
  }, []);

  // Update config and save to localStorage
  const updateConfig = (newConfig: ChatbotConfig) => {
    setConfig(newConfig);
    localStorage.setItem('dineflow-chatbot-config', JSON.stringify(newConfig));
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  // Reset to default config
  const resetToDefault = () => {
    setConfig(defaultChatbotConfig);
    localStorage.removeItem('dineflow-chatbot-config');
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <ChatbotContext.Provider value={{ config, updateConfig, resetToDefault }}>
      {children}
    </ChatbotContext.Provider>
  );
}

// Custom hook for using the chatbot context
export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
}