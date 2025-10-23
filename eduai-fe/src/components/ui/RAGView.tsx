import React, { useState } from 'react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: string;
}

interface RAGViewProps {
  classroomName: string;
  initialMessages: ChatMessage[];
  title: string;
}

const RAGView: React.FC<RAGViewProps> = ({ classroomName, initialMessages, title }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage: ChatMessage = {
        id: (messages.length + 1).toString(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputValue('');
      
      // Simulate a response after a delay
      setTimeout(() => {
        const responseMessage: ChatMessage = {
          id: (messages.length + 2).toString(),
          text: `Based on the notes, ${inputValue} is an important concept. The detailed explanation can be found in the transcript.`,
          sender: 'system',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prevMessages => [...prevMessages, responseMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex-1 bg-[var(--background)] rounded-xl border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] p-4 flex flex-col">
        <div className="flex-1 mb-4 overflow-auto">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div 
                className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'bg-[var(--color-primary)] text-white rounded-br-none' 
                    : 'bg-[var(--color-neutral-light)] dark:bg-[var(--color-neutral-dark)] rounded-bl-none'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <div className="flex">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about the notes or transcripts..." 
              className="flex-1 px-4 py-2 border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] rounded-l-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[var(--background)] text-[var(--foreground)]"
            />
            <button 
              onClick={handleSendMessage}
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-r-md hover:bg-[var(--color-secondary)]"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RAGView;