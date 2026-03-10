import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axiosInstance from '../../api/axios';
import { moduleApi } from '../../api/modules';
import ResourcesDropdown from './ResourcesDropdown';

interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'system';
  timestamp: string;
}

interface RAGViewProps {
  initialMessages: ChatMessage[];
  title?: string;
  moduleId?: string; // Add moduleId for module-specific chat
  videoId?: string;  // Add videoId for video-specific chat
}

const RAGView: React.FC<RAGViewProps> = ({ initialMessages, title = "Chat", moduleId, videoId }) => {
  // Function to get persistent resource IDs from localStorage
  const getPersistentResourceIds = (): string[] => {
    if (!moduleId) return [];
    const key = `selectedResources_${moduleId}`;
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading selected resources from localStorage:', error);
      return [];
    }
  };

  // Function to save resource IDs to localStorage
  const savePersistentResourceIds = (resourceIds: string[]) => {
    if (!moduleId) return;
    const key = `selectedResources_${moduleId}`;
    try {
      localStorage.setItem(key, JSON.stringify(resourceIds));
    } catch (error) {
      console.error('Error saving selected resources to localStorage:', error);
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResourceIds, setSelectedResourceIds] = useState<string[]>(() => getPersistentResourceIds());
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { token } = useAuth();

  // Update persistent storage when selectedResourceIds changes
  useEffect(() => {
    savePersistentResourceIds(selectedResourceIds);
  }, [selectedResourceIds, moduleId]);

  // Fetch existing chat history when component mounts if moduleId is provided
  useEffect(() => {
    if (moduleId && token) {
      fetchChatHistory();
    }
  }, [moduleId, token]);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatHistory = async () => {
    if (!moduleId || !token) return;
    
    try {
      const response = await moduleApi.getModuleChatHistory(moduleId);
      // Convert ModuleChatMessage[] to ChatMessage[]
      const formattedMessages = response.chatHistory.flatMap(chat => [
        {
          id: `query-${chat.timestamp}`,
          message: chat.query,
          sender: 'user' as 'user' | 'system', // Explicitly type the sender
          timestamp: new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        {
          id: `response-${chat.timestamp}`,
          message: chat.response,
          sender: 'system' as 'user' | 'system',
          timestamp: new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);

      setMessages([...initialMessages, ...formattedMessages]);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResourceSelect = (resourceId: string, selected: boolean) => {
    if (selected) {
      if (!selectedResourceIds.includes(resourceId)) {
        setSelectedResourceIds([...selectedResourceIds, resourceId]);
      }
    } else {
      setSelectedResourceIds(selectedResourceIds.filter(id => id !== resourceId));
    }
  };

  const handleApplyResources = () => {
    // Resources are already selected in state, so just close the dropdown
    setShowResourcesDropdown(false);
  };

  const handleClearResources = () => {
    setSelectedResourceIds([]);
    // Also clear from localStorage
    if (moduleId) {
      const key = `selectedResources_${moduleId}`;
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error clearing selected resources from localStorage:', error);
      }
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !token) return;

    // Add user message to the chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call the RAG API to generate a response
      let response;
      if (videoId) {
        // Use the video-specific chat endpoint if videoId is provided
        response = await axiosInstance.post(`/api/v1/videos/${videoId}/chat`, {
          message: inputMessage,
          llm_prompt_template: "You are an AI assistant for educational content. Answer questions based on the provided context.",
          resource_ids: selectedResourceIds
        });
      } else if (moduleId) {
        // If we have a moduleId, we can use the module-specific chat endpoint
        response = await axiosInstance.post(`/api/v1/modules/${moduleId}/chat`, {
          message: inputMessage,
          llm_prompt_template: "You are an AI assistant for educational content. Answer questions based on the provided context.",
          resource_ids: selectedResourceIds
        });
      } else {
        // Fallback to general RAG endpoint
        response = await axiosInstance.post('/rag/generate-prompt', {
          message: inputMessage,
          llm_prompt_template: "You are an AI assistant for educational content. Answer questions based on the provided context.",
          resource_ids: selectedResourceIds,
          context_documents: null
        });
      }

      // Add the AI response to the chat
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        message: response.data.response || response.data.rag_prompt || "I'm sorry, I couldn't generate a response right now.",
        sender: 'system',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to the chat
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        message: "Sorry, I encountered an error. Please try again.",
        sender: 'system',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 flex-1 overflow-auto min-h-0">
        <div className="flex flex-col h-full w-full">
          <div className="space-y-4 overflow-y-auto flex-1 max-w-6xl mx-auto w-full">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
            >
              <div
                className={`max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none rounded-2xl'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-bl-none rounded-2xl'
                } px-4 py-3 shadow-sm relative group`}
              >
                <div className="whitespace-pre-wrap">{msg.message}</div>
                <div className={`text-xs mt-2 flex items-center space-x-1 ${msg.sender === 'user' ? 'text-blue-100 justify-end' : 'text-gray-500 dark:text-gray-400 justify-start'}`}>
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'user' && (
                    <svg className="w-3 h-3 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isLoading}
          />
          <div className="relative">
            <button
              onClick={() => setShowResourcesDropdown(!showResourcesDropdown)}
              disabled={isLoading}
              className={`py-3 pl-3 pr-2 border-y border-l border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-l-none flex items-center justify-center transition-colors duration-200 ${showResourcesDropdown ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}`}
              title="Select Resources"
            >
              <svg
                className="w-5 h-5 text-blue-500 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {selectedResourceIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {selectedResourceIds.length}
                </span>
              )}
            </button>

            {(moduleId || videoId) && (
              <ResourcesDropdown
                isOpen={showResourcesDropdown}
                onClose={() => setShowResourcesDropdown(false)}
                moduleId={moduleId || ''}
                selectedResourceIds={selectedResourceIds}
                onResourceSelect={handleResourceSelect}
                onApply={handleApplyResources}
                onClear={handleClearResources}
              />
            )}
          </div>
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-r-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default RAGView;