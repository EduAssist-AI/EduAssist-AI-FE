"use client";

import React, { useState } from 'react';
import ClassroomPageHeader from '@/components/ui/ClassroomPageHeader';
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon, UploadIcon } from '@/components/ui/Icons';
import Card from '@/components/ui/Card';
import Button from '@/components/forms/Button';
import QuizView from '@/components/ui/QuizView';
import RAGView from '@/components/ui/RAGView';
import NotesView from '@/components/ui/NotesView';
import ResourceItem from '@/components/ui/ResourceItem';
import UploadModal from '@/components/ui/UploadModal';

// Define the ChatMessage interface
interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: string;
}

interface ClassroomPageProps {
  params: {
    id: string;
  };
}

const ClassroomPage = ({ params }: ClassroomPageProps) => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com'
  });

  const [leftColumnExpanded, setLeftColumnExpanded] = useState(true);
  const [rightColumnExpanded, setRightColumnExpanded] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // State to manage which view is active in the center column
  const [activeView, setActiveView] = useState<'quiz' | 'source' | 'notes' >('quiz');

  const handleLogout = () => {
    console.log('Logout clicked');
    // Handle logout logic here
  };

  const toggleLeftColumn = () => {
    setLeftColumnExpanded(!leftColumnExpanded);
  };

  const toggleRightColumn = () => {
    setRightColumnExpanded(!rightColumnExpanded);
  };

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file.name, file.size, file.type);
    // Handle the selected file here
    // For now, we'll just log the file info and close the modal
    // In a real implementation, you would upload the file to a server
    setIsUploadModalOpen(false);
  };

  const handleResourceClick = (id: string) => {
    console.log(`Resource ${id} clicked`);
    // Handle resource click logic here
  };

  // Mock classroom data
  const classroom = {
    id: params.id,
    name: 'Computer Science 101',
    description: 'Introduction to programming concepts and algorithms',
    sourceCount: 12,
    lastUpdated: 'May 15, 2023'
  };

  // Define chat messages data for different views
  const sourceChatMessages: ChatMessage[] = [
    {
      id: '1',
      text: `Hello! I'm your AI assistant for ${classroom.name}. How can I help you today?`,
      sender: 'system',
      timestamp: '10:00 AM'
    },
    {
      id: '2',
      text: 'What are the key concepts in the introduction video?',
      sender: 'user',
      timestamp: '10:01 AM'
    },
    {
      id: '3',
      text: 'The introduction video covers fundamental programming principles, including variables, control structures, functions, and basic algorithms.',
      sender: 'system',
      timestamp: '10:01 AM'
    }
  ];

 

  // Function to render the active view in the center column
  const renderActiveView = () => {
    switch (activeView) {
      case 'quiz':
        return <QuizView classroomName={classroom.name} />;
      case 'source':
        return <RAGView classroomName={classroom.name} initialMessages={sourceChatMessages} title="Source Chat" />;
      case 'notes':
        return <NotesView classroomName={classroom.name} />;
      // case 'chat':
      //   return <RAGView classroomName={classroom.name} initialMessages={chatMessages} title="Notes Chat" />;
      default:
        return (
          <div className="p-6">
            <p className="text-center py-10 text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">
              Select a feature from the right column to view its content.
            </p>
          </div>
        );
    }
  };

  // Mock resources data
  const mockResources = [
    {
      id: '1',
      title: 'Introduction to Programming',
      type: 'video',
      duration: '12:45',
      uploadDate: 'May 10, 2023'
    },
    {
      id: '2',
      title: 'Data Structures',
      type: 'video',
      duration: '25:30',
      uploadDate: 'May 12, 2023'
    },
    {
      id: '3',
      title: 'Algorithms Overview',
      type: 'pdf',
      size: '5.2MB',
      uploadDate: 'May 14, 2023'
    },
    {
      id: '4',
      title: 'Variables and Data Types',
      type: 'video',
      duration: '18:22',
      uploadDate: 'May 15, 2023'
    },
    {
      id: '5',
      title: 'Control Structures',
      type: 'ppt',
      size: '3.1MB',
      uploadDate: 'May 15, 2023'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <ClassroomPageHeader 
        user={user} 
        onLogout={handleLogout}
        classroomName={classroom.name}
        classroomDescription={classroom.description}
      />
      
      <main className="flex flex-1 overflow-hidden">
        {/* Left Column - Resources */}
        <div 
          className={`bg-[var(--background)] border-r border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] flex flex-col transition-all duration-300 ${
            leftColumnExpanded ? 'w-64' : 'w-16'
          }`}
        >
          <div className="p-4 border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] flex items-center justify-between">
            {leftColumnExpanded && <h2 className="text-lg font-semibold">Resources</h2>}
            <button 
              onClick={toggleLeftColumn}
              className="p-1 rounded hover:bg-[var(--color-neutral-light)] dark:hover:bg-[var(--color-neutral-dark)]"
            >
              {leftColumnExpanded ? <ChevronLeftIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
          
          {leftColumnExpanded && (
            <div className="p-4 flex-1 overflow-auto">
              <div className="mb-6">
                <Button 
                  variant="primary" 
                  fullWidth
                  className="flex items-center justify-center"
                  onClick={handleUploadClick}
                >
                  <UploadIcon className="w-5 h-5 mr-2" />
                  Upload Resource
                </Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Uploaded Resources</h3>
                <div className="space-y-2">
                  {mockResources.map((resource) => (
                    <ResourceItem
                      key={resource.id}
                      id={resource.id}
                      title={resource.title}
                      type={resource.type}
                      duration={resource.duration}
                      size={resource.size}
                      uploadDate={resource.uploadDate}
                      onClick={() => handleResourceClick(resource.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Center Column - Viewer Section */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            {renderActiveView()}
          </div>
        </div>
        
        {/* Right Column - Feature Cards */}
        <div 
          className={`bg-[var(--background)] border-l border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] flex flex-col transition-all duration-300 ${
            rightColumnExpanded ? 'w-80' : 'w-16'
          }`}
        >
          <div className="p-4 border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] flex items-center justify-between">
            {rightColumnExpanded && <h2 className="text-lg font-semibold">Features</h2>}
            <button 
              onClick={toggleRightColumn}
              className="p-1 rounded hover:bg-[var(--color-neutral-light)] dark:hover:bg-[var(--color-neutral-dark)]"
            >
              {rightColumnExpanded ? <ChevronRightIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
          
          {rightColumnExpanded && (
            <div className="p-4 flex-1 overflow-auto">
              <div className="space-y-4">
                <Card
                  title="Quiz Generator"
                  description="Generate and take AI-powered quizzes based on classroom videos and notes."
                  onClick={() => setActiveView('quiz')}
                  className="cursor-pointer hover:shadow-md"
                />
                
                <Card
                  title="Source Chat"
                  description="Ask questions and interact with the AI trained on sources."
                  onClick={() => setActiveView('source')}
                  className="cursor-pointer hover:shadow-md"
                />
                
                <Card
                  title="Summary Notes"
                  description="Access AI-generated summaries for each video in the classroom."
                  onClick={() => setActiveView('notes')}
                  className="cursor-pointer hover:shadow-md"
                />
                
                {/* <Card
                  title="Chat with Notes"
                  description="Ask questions and interact with the AI trained on classroom notes."
                  onClick={() => setActiveView('chat')}
                  className="cursor-pointer hover:shadow-md"
                /> */}
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Upload Modal */}
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={handleCloseModal} 
        onFileSelect={handleFileSelect} 
      />
    </div>
  );
};

export default ClassroomPage;