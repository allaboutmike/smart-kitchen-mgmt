// Fix for src/app/chatbot-admin/page.tsx

"use client";

import React, { useState } from 'react';
import { QAPair } from '../configs/chatbotConfig';
import { useChatbot } from '../configs/chatbot-context';

export default function ChatbotAdmin() {
  const { config, updateConfig, resetToDefault } = useChatbot();
  const [newQA, setNewQA] = useState<QAPair>({
    question: '',
    answer: '',
    keywords: []
  });
  const [keywordsInput, setKeywordsInput] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  // Save config using context
  const saveConfig = () => {
    updateConfig(config);
    setSaveStatus('Changes saved!');
    setTimeout(() => setSaveStatus(''), 3000);
  };
  
  // Reset to default config
  const handleResetConfig = () => {
    if (window.confirm('Are you sure you want to reset all chatbot settings to default?')) {
      resetToDefault();
      setSaveStatus('Reset to default configuration!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // Handle updating greeting and fallback message
  const handleConfigChange = (field: 'initialGreeting' | 'fallbackResponse', value: string) => {
    updateConfig({
      ...config,
      [field]: value
    });
  };

  // Handle updating an existing QA pair
  const handleQAChange = (index: number, field: keyof QAPair, value: string | string[]) => {
    const updatedQAs = [...config.qaPairs];
    
    if (field === 'keywords' && typeof value === 'string') {
      updatedQAs[index][field] = value.split(',').map(kw => kw.trim());
    } else {
      updatedQAs[index][field] = value as never; // Type assertion to avoid explicit 'any'
    }
    
    updateConfig({
      ...config,
      qaPairs: updatedQAs
    });
  };

  // Handle adding a new QA pair
  const handleAddQA = () => {
    if (newQA.question.trim() === '' || newQA.answer.trim() === '') {
      alert('Please provide both a question and an answer');
      return;
    }

    const keywordsArray = keywordsInput.split(',').map(kw => kw.trim()).filter(kw => kw !== '');
    
    updateConfig({
      ...config,
      qaPairs: [...config.qaPairs, {
        ...newQA,
        keywords: keywordsArray
      }]
    });
    
    // Reset form
    setNewQA({
      question: '',
      answer: '',
      keywords: []
    });
    setKeywordsInput('');
  };

  // Handle removing a QA pair
  const handleRemoveQA = (index: number) => {
    const updatedQAs = [...config.qaPairs];
    updatedQAs.splice(index, 1);
    
    updateConfig({
      ...config,
      qaPairs: updatedQAs
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Chatbot Configuration</h1>
      
      {saveStatus && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {saveStatus}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Initial Greeting Message</label>
          <textarea
            value={config.initialGreeting}
            onChange={(e) => handleConfigChange('initialGreeting', e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Fallback Response (when no match found)</label>
          <textarea
            value={config.fallbackResponse}
            onChange={(e) => handleConfigChange('fallbackResponse', e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Question & Answer Pairs</h2>
        
        {config.qaPairs.map((qa, index) => (
          <div key={index} className="border-b pb-6 mb-6">
            <div className="mb-3">
              <label className="block text-gray-700 mb-2">Question</label>
              <input
                type="text"
                value={qa.question}
                onChange={(e) => handleQAChange(index, 'question', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="mb-3">
              <label className="block text-gray-700 mb-2">Answer</label>
              <textarea
                value={qa.answer}
                onChange={(e) => handleQAChange(index, 'answer', e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            
            <div className="mb-3">
              <label className="block text-gray-700 mb-2">Keywords (comma separated)</label>
              <input
                type="text"
                value={qa.keywords.join(', ')}
                onChange={(e) => handleQAChange(index, 'keywords', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
            
            <button
              onClick={() => handleRemoveQA(index)}
              className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Q&A Pair</h2>
        
        <div className="mb-3">
          <label className="block text-gray-700 mb-2">Question</label>
          <input
            type="text"
            value={newQA.question}
            onChange={(e) => setNewQA({...newQA, question: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Enter a frequently asked question"
          />
        </div>
        
        <div className="mb-3">
          <label className="block text-gray-700 mb-2">Answer</label>
          <textarea
            value={newQA.answer}
            onChange={(e) => setNewQA({...newQA, answer: e.target.value})}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Enter the answer to this question"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Keywords (comma separated)</label>
          <input
            type="text"
            value={keywordsInput}
            onChange={(e) => setKeywordsInput(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="word1, word2, word3"
          />
          <p className="text-sm text-gray-500 mt-1">
            Add keywords that might appear in user questions related to this topic
          </p>
        </div>
        
        <button
          onClick={handleAddQA}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Q&A Pair
        </button>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={handleResetConfig}
          className="bg-gray-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-gray-700"
        >
          Reset to Default
        </button>
        
        <button
          onClick={saveConfig}
          className="bg-green-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}