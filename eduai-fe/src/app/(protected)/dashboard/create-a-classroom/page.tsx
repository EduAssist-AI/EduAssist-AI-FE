"use client";

import React, { useState } from 'react';
import DashboardHeader from '@/components/ui/DashboardHeader';
import Input from '@/components/forms/Input';
import Button from '@/components/forms/Button';
import { Metadata } from 'next';

const CreateClassroomPage = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com'
  });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    inviteCode: ''
  });

  const handleLogout = () => {
    console.log('Logout clicked');
    // Handle logout logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating classroom:', formData);
    // Handle classroom creation logic here
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <DashboardHeader user={user} onLogout={handleLogout} />
      
      <main className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Classroom</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="name"
              name="name"
              type="text"
              label="Classroom Name"
              placeholder="e.g. Computer Science 101"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            
            <div className="mb-4">
              <label 
                htmlFor="description" 
                className="block text-sm font-medium text-[var(--foreground)] mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[var(--background)] text-[var(--foreground)] border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)]"
                placeholder="Describe your classroom and its purpose..."
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
            <Input
              id="inviteCode"
              name="inviteCode"
              type="text"
              label="Invite Code (Optional)"
              placeholder="e.g. CS101-FALL23"
              value={formData.inviteCode}
              onChange={handleInputChange}
            />
            
            <div className="flex space-x-4 pt-4">
              <Button type="submit" variant="primary">
                Create Classroom
              </Button>
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateClassroomPage;