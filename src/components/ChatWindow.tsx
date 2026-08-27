import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiMenu, FiMic, FiPaperclip } from 'react-icons/fi';
import { useChatStore } from '../store/chatStore';
import { Message } from '../types';
import MessageBubble from './MessageBubble';
import { motion } from 'framer-motion';

const ChatWindow: React.FC = () => {
  const {
    conversations,
    currentConversationId,
    toggleSidebar,
    addMessage,
    isLoading,
    selectedModel,
  } = useChatStore();

  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConversation = conversations.find(
    (c) => c.id === currentConversationId
  );
  const messages = currentConversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'assistant',
        content: `This is a simulated response from ${selectedModel}. Connect a real API to get actual AI responses.`,
        timestamp: new Date(),
      };
      addMessage(assistantMessage);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-dark">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-dark-light">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-dark-light rounded-lg transition-colors"
        >
          <FiMenu size={24} className="text-white" />
        </button>
        <h2 className="text-white font-semibold">
          {currentConversation?.title || 'New Chat'}
        </h2>
        <div className="w-10" />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-2">ChatGPT</h1>
            <p className="text-gray-400 mb-8">Start a new conversation</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {[
                'Explain quantum computing',
                'Write a Python function',
                'Help me debug code',
                'Create a business plan',
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInputValue(prompt)}
                  className="p-4 bg-dark-light hover:bg-dark-light/70 rounded-lg text-left text-white transition-colors"
                >
                  <p className="font-medium">{prompt}</p>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2"
          >
            <div className="flex-1 bg-dark-light rounded-lg p-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse-slow" />
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse-slow" />
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse-slow" />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-dark-light">
        <div className="flex gap-3 mb-3 text-xs text-gray-500">
          <span>Free Research Preview</span>
        </div>
        <div className="flex gap-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message ChatGPT..."
            className="flex-1 bg-dark-light text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            rows={3}
          />
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-3 rounded-lg transition-colors ${
                isRecording
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-dark-light hover:bg-dark-light/70 text-gray-400'
              }`}
            >
              <FiMic size={18} />
            </button>
            <button className="p-3 bg-dark-light hover:bg-dark-light/70 text-gray-400 rounded-lg transition-colors">
              <FiPaperclip size={18} />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="p-3 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
