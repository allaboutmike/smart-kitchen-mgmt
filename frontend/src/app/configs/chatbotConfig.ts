// configs/chatbotConfig.ts

export type QAPair = {
    question: string;
    answer: string;
    keywords: string[];
  };
  
  export type ChatbotConfig = {
    initialGreeting: string;
    fallbackResponse: string;
    qaPairs: QAPair[];
  };
  
  const chatbotConfig: ChatbotConfig = {
    initialGreeting: "Hello! I'm your Dine Flow assistant. How can I help you with your restaurant management today?",
    
    fallbackResponse: "I don't have information about that yet. Please try asking about our digital ticketing, inventory management, menu engineering, or other restaurant management features.",
    
    qaPairs: [
      {
        question: "What is Dine Flow?",
        answer: "Dine Flow is a smart restaurant kitchen management system that helps streamline operations with digital ticketing, inventory management, predictive prep recommendations, menu engineering, and automatic supplier integration.",
        keywords: ["what", "about", "dine flow", "overview", "explain", "tell me about"]
      },
      {
        question: "How does the digital ticket system work?",
        answer: "Dine Flow's digital ticket system tracks orders from POS to kitchen in real-time, eliminating paper tickets and improving communication between front and back of house. Orders are automatically prioritized and timed for efficient preparation.",
        keywords: ["ticket", "digital", "order", "tracking", "pos", "kitchen"]
      },
      {
        question: "What features does the inventory management system have?",
        answer: "Our real-time inventory management automatically deducts ingredients as orders are completed, tracks stock levels, alerts on low inventory, and provides waste reduction insights. The system can also integrate with supplier APIs for automatic reordering.",
        keywords: ["inventory", "stock", "ingredient", "deduct", "track", "management", "real-time"]
      },
      {
        question: "How do predictive prep recommendations work?",
        answer: "Dine Flow analyzes historical order patterns to provide predictive prep recommendations, such as 'Prep 3 extra batches of fries between 11:30-12:30.' This helps reduce waste and ensure you're ready for rush periods.",
        keywords: ["predict", "recommendation", "prep", "pattern", "historical", "forecast"]
      },
      {
        question: "What does the menu engineering dashboard show?",
        answer: "The menu engineering dashboard displays profitability per dish, waste metrics, ingredient cost tracking, and sales performance. This helps you identify your most profitable items and optimize your menu for better margins.",
        keywords: ["menu", "engineering", "dashboard", "profit", "waste", "metrics", "cost", "tracking"]
      },
      {
        question: "How does supplier API integration work?",
        answer: "Dine Flow integrates with supplier APIs to automatically reorder ingredients when they hit threshold levels. You can set custom reorder points, receive pricing updates, and track delivery status all within the system.",
        keywords: ["supplier", "api", "integration", "reorder", "automatic", "threshold"]
      },
      {
        question: "What technologies does Dine Flow use?",
        answer: "Dine Flow is built with React, Tailwind CSS, Next.js, and TypeScript for the frontend. The backend uses Node.js, Express, and TypeScript with PostgreSQL as the database. We also use Python with libraries like NumPy and Pandas for our predictive analytics.",
        keywords: ["tech", "technology", "stack", "built", "react", "node", "database"]
      },
      {
        question: "How do I set up Dine Flow?",
        answer: "Setting up Dine Flow involves cloning the repository, installing dependencies for both frontend and backend, configuring your environment variables, and setting up the PostgreSQL database. Detailed instructions are available in our README file.",
        keywords: ["setup", "install", "configure", "setting", "start", "deployment"]
      },
      {
        question: "What API endpoints are available?",
        answer: "Dine Flow provides API endpoints for menu items, metrics (waste and productivity), orders, and inventory/stock management. These endpoints support standard CRUD operations and are fully documented.",
        keywords: ["api", "endpoint", "rest", "request", "backend", "data"]
      },
      {
        question: "How does Dine Flow help with restaurant productivity?",
        answer: "Dine Flow increases productivity by digitizing ticket management, automating inventory tracking, providing predictive prep guidance, analyzing menu performance, and streamlining supplier ordering. This reduces manual work and helps staff focus on food quality and customer service.",
        keywords: ["productivity", "efficiency", "improve", "streamline", "help", "benefit"]
      }
    ]
  };
  
  export default chatbotConfig;