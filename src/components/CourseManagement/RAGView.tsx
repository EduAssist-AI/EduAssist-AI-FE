import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axiosInstance from '../../api/axios';
import { moduleApi, type ChatMessage as ModuleChatMessage } from '../../api/modules';

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
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { token } = useAuth();

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
          sender: 'system' as 'user' | 'system', // Explicitly type the sender
          timestamp: new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      
      setMessages(prev => [...initialMessages, ...formattedMessages]);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
          llm_prompt_template: "You are an AI assistant for educational content. Answer questions based on the provided context."
        });
      } else if (moduleId) {
        // If we have a moduleId, we can use the module-specific chat endpoint
        response = await axiosInstance.post(`/api/v1/modules/${moduleId}/chat`, {
          message: inputMessage,
          llm_prompt_template: "You are an AI assistant for educational content. Answer questions based on the provided context."
        });
      } else {
        // Fallback to general RAG endpoint
        response = await axiosInstance.post('/rag/generate-prompt', {
          message: inputMessage,
          llm_prompt_template: "You are an AI assistant for educational content. Answer questions based on the provided context.",
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
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-800 flex-1 min-h-0" style={{ height: '600px' }}>
        <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
          <div className="space-y-4 overflow-y-auto" style={{ maxHeight: '580px', overflowY: 'scroll', height: '600px' }}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.message}</div>
                <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {msg.timestamp}
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
        <div className="flex max-w-4xl mx-auto">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default RAGView;