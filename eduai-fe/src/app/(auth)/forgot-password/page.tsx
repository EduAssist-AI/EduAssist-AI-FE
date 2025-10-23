import React from 'react';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password | EduAssist AI',
  description: 'Reset your password for EduAssist AI. Enter your email to receive a password reset link.',
  keywords: 'forgot password, reset password, account recovery, EduAssist AI',
  openGraph: {
    title: 'Forgot Password | EduAssist AI',
    description: 'Reset your password for EduAssist AI. Enter your email to receive a password reset link.',
    type: 'website',
    url: 'https://eduassist-ai.com/forgot-password',
  },
  twitter: {
    card: 'summary',
    title: 'Forgot Password | EduAssist AI',
    description: 'Reset your password for EduAssist AI. Enter your email to receive a password reset link.',
  },
};

const ForgotPasswordPage = () => {
  return (
    <ForgotPasswordForm />
  );
};

export default ForgotPasswordPage;