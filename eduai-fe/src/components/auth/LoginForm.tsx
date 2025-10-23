"use client";

import React from 'react';
import Input from '@/components/forms/Input';
import Button from '@/components/forms/Button';
import Checkbox from '@/components/forms/Checkbox';
import FormContainer from '@/components/forms/FormContainer';

const LoginForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted');
  };

  return (
    <FormContainer 
      title="Login" 
      subtitle="Sign in to your account"
      footer={
        <p className="text-sm text-[var(--foreground)]">
          Don&apos;t have an account?{' '}
          <a href="/register" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)]">
            Sign up
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
        
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          required
        />
        
        <div className="flex items-center justify-between">
          <Checkbox
            id="remember-me"
            name="remember-me"
            label="Remember me"
          />
          
          <div className="text-sm">
            <a href="/forgot-password" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)]">
              Forgot password?
            </a>
          </div>
        </div>
        
        <Button type="submit" fullWidth variant="primary">
          Sign in
        </Button>
      </form>
    </FormContainer>
  );
};

export default LoginForm;