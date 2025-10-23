import React from 'react';

interface ChatViewProps {
  classroomName: string;
}

const ChatView: React.FC<ChatViewProps> = ({ classroomName }) => {
  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Chat with Notes</h2>
      <p className="text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] mb-6">
        Discuss and interact with the class notes in a chat format.
      </p>
      <div className="flex-1 bg-[var(--background)] rounded-xl border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] p-4 flex flex-col">
        <div className="flex-1 mb-4 overflow-auto">
          <div className="mb-4">
            <div className="bg-[var(--color-neutral-light)] dark:bg-[var(--color-neutral-dark)] p-3 rounded-lg max-w-[80%] mb-2">
              <p>Welcome to the chat for {classroomName} notes! You can discuss the material here.</p>
            </div>
          </div>
          <div className="mb-4 text-right">
            <div className="bg-[var(--color-primary)] text-white p-3 rounded-lg max-w-[80%] ml-auto">
              <p>Can someone explain the concept of recursion?</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="bg-[var(--color-neutral-light)] dark:bg-[var(--color-neutral-dark)] p-3 rounded-lg max-w-[80%] mb-2">
              <p>Recursion is when a function calls itself to solve a problem by breaking it down into smaller subproblems.</p>
            </div>
          </div>
          <div className="mb-4 text-right">
            <div className="bg-[var(--color-primary)] text-white p-3 rounded-lg max-w-[80%] ml-auto">
              <p>Thanks! Is there a practical example in the notes?</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="bg-[var(--color-neutral-light)] dark:bg-[var(--color-neutral-dark)] p-3 rounded-lg max-w-[80%] mb-2">
              <p>Yes, the notes include a factorial function example using recursion.</p>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex">
            <input 
              type="text" 
              placeholder="Discuss something about the notes..." 
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

export default ChatView;