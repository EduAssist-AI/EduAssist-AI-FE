import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | EduAssist AI',
  description: 'Sign in to your EduAssist AI account to access AI-powered video analysis, smart summaries, RAG system, and quiz generation tools.',
  keywords: 'login, sign in, authentication, EduAssist AI, AI tools, video analysis, learning platform',
  openGraph: {
    title: 'Login | EduAssist AI',
    description: 'Sign in to your EduAssist AI account to access AI-powered video analysis, smart summaries, RAG system, and quiz generation tools.',
    type: 'website',
    url: 'https://eduassist-ai.com/login',
  },
  twitter: {
    card: 'summary',
    title: 'Login | EduAssist AI',
    description: 'Sign in to your EduAssist AI account to access AI-powered video analysis, smart summaries, RAG system, and quiz generation tools.',
  },
};

const LoginPage = () => {
  return (
    <LoginForm />
  );
};

export default LoginPage;