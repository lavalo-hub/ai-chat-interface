import React, { useState } from 'react';
import { FiCopy, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { Message } from '../types';
import { motion } from 'framer-motion';
import copy from 'copy-to-clipboard';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  const handleCopy = () => {
    copy(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-xl px-4 py-3 rounded-lg group ${
          message.role === 'user'
            ? 'bg-accent text-white rounded-br-none'
            : 'bg-dark-light text-white rounded-bl-none'
        }`}
      >
        {message.role === 'assistant' ? (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : 'text';
                  return !inline ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={language}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-dark-light/50 px-2 py-1 rounded" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        ) : (
          <p>{message.content}</p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          {message.role === 'assistant' && (
            <>
              <button
                onClick={handleCopy}
                title="Copy"
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <FiCopy size={16} />
              </button>
              <button
                onClick={() => setLiked(true)}
                title="Like"
                className={`p-1 rounded transition-colors ${
                  liked === true ? 'bg-green-500/20 text-green-400' : 'hover:bg-white/10'
                }`}
              >
                <FiThumbsUp size={16} />
              </button>
              <button
                onClick={() => setLiked(false)}
                title="Dislike"
                className={`p-1 rounded transition-colors ${
                  liked === false ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/10'
                }`}
              >
                <FiThumbsDown size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
