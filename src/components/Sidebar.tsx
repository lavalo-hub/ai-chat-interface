import React from 'react';
import { FiPlus, FiMenu, FiX, FiTrash2, FiSettings } from 'react-icons/fi';
import { useChatStore } from '../store/chatStore';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const {
    conversations,
    currentConversationId,
    sidebarOpen,
    toggleSidebar,
    createConversation,
    setCurrentConversation,
    deleteConversation,
  } = useChatStore();

  return (
    <motion.div
      animate={{ x: sidebarOpen ? 0 : -320 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen w-80 bg-dark-lighter border-r border-dark-light z-40"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-light">
          <h1 className="text-xl font-bold text-white">ChatGPT</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-dark-light rounded-lg transition-colors"
          >
            <FiX size={20} className="text-white" />
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={createConversation}
          className="m-4 flex items-center justify-center gap-2 w-full px-4 py-3 bg-dark-light hover:bg-accent rounded-lg transition-colors text-white font-medium"
        >
          <FiPlus size={18} />
          New Chat
        </button>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-2">
          {conversations.length > 0 ? (
            <div className="space-y-2">
              {conversations.map((conv) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
                    currentConversationId === conv.id
                      ? 'bg-dark-light'
                      : 'hover:bg-dark-light'
                  }`}
                  onClick={() => setCurrentConversation(conv.id)}
                >
                  <div className="flex-1 overflow-hidden">
                    <p className="text-white truncate text-sm font-medium">
                      {conv.title}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {formatDistanceToNow(new Date(conv.updatedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.id);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/20 rounded"
                  >
                    <FiTrash2 size={16} className="text-red-400" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-500">
              <p className="text-sm text-center">No conversations yet</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-dark-light p-4 space-y-2">
          <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-dark-light rounded-lg transition-colors text-white text-sm">
            <FiSettings size={16} />
            Settings
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
