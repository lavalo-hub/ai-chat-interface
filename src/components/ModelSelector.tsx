import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useChatStore } from '../store/chatStore';
import { motion, AnimatePresence } from 'framer-motion';

const MODELS = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Most capable, best for complex tasks',
    icon: '⚡',
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Faster, optimized for speed',
    icon: '🚀',
  },
  {
    id: 'gpt-3.5',
    name: 'GPT-3.5',
    description: 'Fast and efficient',
    icon: '✨',
  },
  {
    id: 'claude-3',
    name: 'Claude 3',
    description: 'Alternative AI model',
    icon: '🤖',
  },
];

const ModelSelector: React.FC = () => {
  const { selectedModel, setSelectedModel } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);

  const currentModel = MODELS.find((m) => m.id === selectedModel);

  return (
    <div className="relative w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-dark-light hover:bg-dark-light/70 text-white rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          <span>{currentModel?.icon}</span>
          <div className="text-left">
            <p className="text-sm font-medium">{currentModel?.name}</p>
            <p className="text-xs text-gray-400">{currentModel?.description}</p>
          </div>
        </div>
        <FiChevronDown
          size={18}
          className={`transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-dark-light rounded-lg shadow-lg z-50 overflow-hidden"
          >
            {MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  setSelectedModel(model.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-dark-light/50 transition-colors ${
                  selectedModel === model.id ? 'bg-accent/20' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{model.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{model.name}</p>
                    <p className="text-xs text-gray-400">{model.description}</p>
                  </div>
                  {selectedModel === model.id && (
                    <div className="ml-auto w-2 h-2 bg-accent rounded-full" />
                  )}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModelSelector;
