"use client";

import React from 'react';
import Input from '@/components/forms/Input';
import Button from '@/components/forms/Button';
import FormContainer from '@/components/forms/FormContainer';

const ForgotPasswordForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Forgot password submitted');
  };

  return (
    <FormContainer 
      title="Forgot Password" 
      subtitle="Enter your email to reset your password"
      footer={
        <p className="text-sm text-[var(--foreground)]">
          Remember your password?{' '}
          <a href="/login" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)]">
            Back to login
          </a>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          required
        />
        
        <Button type="submit" fullWidth variant="primary">
          Send Reset Link
        </Button>
      </form>
    </FormContainer>
  );
};

export default ForgotPasswordForm;