import React from 'react';
import { ChatMessage } from '../../api/modules';

interface ChatHistoryProps {
  chatHistory: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatHistory }) => {
  if (!chatHistory || chatHistory.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        <p>No chat history available</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto max-h-[60vh]">
      <div className="space-y-4 p-4">
        {chatHistory.map((chat, index) => (
          <div 
            key={index} 
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {chat.role}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(chat.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="mb-2">
              <p className="font-medium text-gray-800 dark:text-white">Q: {chat.query}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">A: {chat.response}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;