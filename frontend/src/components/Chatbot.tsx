// Fix for src/components/Chatbot.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import the chatbot configuration
import { QAPair } from '../app/configs/chatbotConfig';
import { useChatbot } from '../app/configs/chatbot-context';

// Define the structure for chat messages
type Message = {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
};

export default function Chatbot() {
  const { config } = useChatbot();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: config.initialGreeting,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset messages when config changes
  useEffect(() => {
    // Only reset if there's just one message (the greeting)
    if (messages.length === 1) {
      setMessages([{
        id: 1,
        text: config.initialGreeting,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [config.initialGreeting, messages.length]);

  // Auto-scroll to the bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to match user input with predefined questions
  const findBestMatch = (input: string): QAPair | null => {
    // Convert input to lowercase for case-insensitive matching
    const normalizedInput = input.toLowerCase();
    
    // First, try to find exact question matches
    for (const qa of config.qaPairs) {
      if (normalizedInput.includes(qa.question.toLowerCase())) {
        return qa;
      }
    }
    
    // If no exact match, try to find keyword matches
    for (const qa of config.qaPairs) {
      if (qa.keywords.some(keyword => normalizedInput.includes(keyword.toLowerCase()))) {
        return qa;
      }
    }
    
    return null;
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    
    // Find a matching response
    const match = findBestMatch(inputValue);
    
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: match 
          ? match.answer 
          : config.fallbackResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 500); // Slight delay to make the interaction feel more natural
  };

  return (
    <>
      {/* Chat button */}
      <div className="fixed top-24 right-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed top-24 right-16 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden flex flex-col border border-gray-200"
          style={{ maxHeight: 'calc(100vh - 48px)' }}
        >
          {/* Chat header */}
          <div className="bg-blue-600 text-white p-4">
            <h3 className="font-semibold">Restaurant Assistant</h3>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: '70vh' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Question suggestions */}
          <div className="p-2 bg-gray-50 border-t border-gray-200 overflow-x-auto whitespace-nowrap">
            {config.qaPairs.map((qa, index) => (
              <button
                key={index}
                onClick={() => {
                  // Set the input value
                  setInputValue(qa.question);
                  
                  // Automatically send the question
                  const userMessage: Message = {
                    id: messages.length + 1,
                    text: qa.question,
                    sender: 'user',
                    timestamp: new Date()
                  };
                  
                  setMessages(prevMessages => [...prevMessages, userMessage]);
                  
                  // Add bot response after a short delay
                  setTimeout(() => {
                    const botMessage: Message = {
                      id: messages.length + 2,
                      text: qa.answer,
                      sender: 'bot',
                      timestamp: new Date()
                    };
                    
                    setMessages(prevMessages => [...prevMessages, botMessage]);
                  }, 500);
                }}
                className="inline-block mr-2 mb-2 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100"
              >
                {qa.question}
              </button>
            ))}
          </div>

          {/* Chat input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                placeholder="Type your question..."
                className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}