import React from 'react';
import { FiMoon, FiSun, FiLogOut, FiUser } from 'react-icons/fi';
import { useChatStore } from '../store/chatStore';
import { motion } from 'framer-motion';
import ModelSelector from './ModelSelector';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useChatStore();
  const [showProfile, setShowProfile] = React.useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-dark-lighter border-b border-dark-light px-6 py-4"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white">ChatGPT</h1>

        <div className="flex items-center gap-6">
          <ModelSelector />

          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-dark-light rounded-lg transition-colors text-white"
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="p-2 hover:bg-dark-light rounded-lg transition-colors text-white"
            >
              <FiUser size={20} />
            </button>

            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-dark-light rounded-lg shadow-lg overflow-hidden z-50"
              >
                <button className="w-full text-left px-4 py-2 hover:bg-dark-light/50 text-white flex items-center gap-2">
                  <FiUser size={16} />
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-dark-light/50 text-red-400 flex items-center gap-2">
                  <FiLogOut size={16} />
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
