"use client";

import React from 'react';
import Header from '@/components/ui/Header';
import Hero from '@/components/ui/Hero';
import Features from '@/components/ui/Features';
import HowItWorks from '@/components/ui/HowItWorks';
import CTA from '@/components/ui/CTA';
import Link from 'next/link';
import { VideoIcon, NoteIcon, BrainIcon, QuizIcon, ClassroomIcon } from '@/components/ui/Icons';

const Home: React.FC = () => {
  const handleGetStarted = () => {
    // Handle get started button click
    alert('Redirecting to registration/login page');
  };

  const features = [
    {
      title: "Video Processing",
      description: "Upload your educational videos and our AI will process them to extract key information, generate transcripts, and identify important segments.",
      icon: <VideoIcon className="w-10 h-10" />
    },
    {
      title: "Smart Summaries",
      description: "Get concise, well-structured notes that capture the essence of your video content, making it easier to review and understand.",
      icon: <NoteIcon className="w-10 h-10" />
    },
    {
      title: "RAG System",
      description: "Interact with your video content through our Retrieval-Augmented Generation system that answers questions based on detailed notes and transcripts.",
      icon: <BrainIcon className="w-10 h-10" />
    },
    {
      title: "Quiz Generator",
      description: "Automatically generate quizzes from your videos to test your knowledge and reinforce learning with AI-generated questions.",
      icon: <QuizIcon className="w-10 h-10" />
    },
    {
      title: "Classroom Management",
      description: "Create and manage classrooms to organize your videos and track your learning progress across different subjects or courses.",
      icon: <ClassroomIcon className="w-10 h-10" />
    },
    {
      title: "Personalized Learning",
      description: "Get personalized recommendations and insights based on your learning patterns and quiz performance.",
      icon: <BrainIcon className="w-10 h-10" />
    }
  ];

  const steps = [
    {
      title: "Create Classroom",
      description: "Start by creating a classroom for your course, subject, or learning group. Add your fellow students or keep it for yourself."
    },
    {
      title: "Upload Videos",
      description: "Upload your educational videos to the classroom. Our AI will process each video automatically and prepare study materials."
    },
    {
      title: "Learn & Interact",
      description: "Access AI-generated summaries, engage with the RAG system to ask questions about the content, and take quizzes to test your knowledge."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      
      <main>
        <Hero 
          title="Transform Your Learning Experience"
          subtitle="AI-Powered Video Analysis & Study Tools"
          description="Upload educational videos and get AI-generated summaries, interactive Q&A, and personalized quizzes to enhance your learning."
          ctaText="Get Started"
          onCtaClick={handleGetStarted}
        />
        
        <Features features={features} />
        
        <HowItWorks steps={steps} />
        
        <CTA 
          title="Ready to Revolutionize Your Learning?"
          description="Join thousands of students and educators who are transforming how they learn with our AI tools."
          buttonLabel="Start Learning Today"
          onButtonClick={handleGetStarted}
        />
      </main>
    </div>
  );
};

export default Home;