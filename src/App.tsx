import React, { useEffect } from 'react';
import { useChatStore } from './store/chatStore';
import { Sidebar, ChatWindow } from './components';
import { motion } from 'framer-motion';

function App() {
  const { conversations, currentConversationId, createConversation, darkMode } =
    useChatStore();

  // Create initial conversation if none exists
  useEffect(() => {
    if (conversations.length === 0) {
      createConversation();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex h-screen ${darkMode ? 'bg-dark' : 'bg-white'}`}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-80">
        <ChatWindow />
      </div>
    </motion.div>
  );
}

export default App;
