"use client";

import React from 'react';
import Input from '@/components/forms/Input';
import Button from '@/components/forms/Button';
import FormContainer from '@/components/forms/FormContainer';

const RegisterForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration submitted');
  };

  return (
    <FormContainer 
      title="Create Account" 
      subtitle="Sign up for a new account"
      footer={
        <p className="text-sm text-[var(--foreground)]">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)]">
            Sign in
          </a>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="name"
          name="name"
          type="text"
          label="Full Name"
          placeholder="John Doe"
          required
        />
        
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          required
        />
        
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          required
        />
        
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="••••••••"
          required
        />
        
        <Button type="submit" fullWidth variant="primary">
          Sign up
        </Button>
      </form>
    </FormContainer>
  );
};

export default RegisterForm;