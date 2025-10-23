import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | EduAssist AI',
  description: 'Create an account on EduAssist AI to access AI-powered video analysis, smart summaries, RAG system, and quiz generation tools.',
  keywords: 'register, sign up, create account, EduAssist AI, AI tools, video analysis, learning platform',
  openGraph: {
    title: 'Register | EduAssist AI',
    description: 'Create an account on EduAssist AI to access AI-powered video analysis, smart summaries, RAG system, and quiz generation tools.',
    type: 'website',
    url: 'https://eduassist-ai.com/register',
  },
  twitter: {
    card: 'summary',
    title: 'Register | EduAssist AI',
    description: 'Create an account on EduAssist AI to access AI-powered video analysis, smart summaries, RAG system, and quiz generation tools.',
  },
};

const RegisterPage = () => {
  return (
    <RegisterForm />
  );
};

export default RegisterPage;