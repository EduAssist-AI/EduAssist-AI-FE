import React from 'react';

interface SourceChatViewProps {
  classroomName: string;
}

const SourceChatView: React.FC<SourceChatViewProps> = ({ classroomName }) => {
  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Source Chat</h2>
      <p className="text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] mb-6">
        Interact with the Source Chat to ask questions about original source materials.
      </p>
      <div className="flex-1 bg-[var(--background)] rounded-xl border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] p-4 flex flex-col">
        <div className="flex-1 mb-4 overflow-auto">
          <div className="mb-4">
            <div className="bg-[var(--color-neutral-light)] dark:bg-[var(--color-neutral-dark)] p-3 rounded-lg max-w-[80%] mb-2">
              <p>Hello! I&apos;m your AI assistant for {classroomName}. How can I help you today?</p>
            </div>
          </div>
          <div className="mb-4 text-right">
            <div className="bg-[var(--color-primary)] text-white p-3 rounded-lg max-w-[80%] ml-auto">
              <p>What are the key concepts in the introduction video?</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="bg-[var(--color-neutral-light)] dark:bg-[var(--color-neutral-dark)] p-3 rounded-lg max-w-[80%] mb-2">
              <p>The introduction video covers fundamental programming principles, including variables, control structures, functions, and basic algorithms.</p>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex">
            <input 
              type="text" 
              placeholder="Ask a question about the notes or transcripts..." 
              className="flex-1 px-4 py-2 border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] rounded-l-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[var(--background)] text-[var(--foreground)]"
            />
            <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-r-md hover:bg-[var(--color-secondary)]">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceChatView;