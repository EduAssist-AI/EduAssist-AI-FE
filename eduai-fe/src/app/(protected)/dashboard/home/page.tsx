"use client";

import React, { useState } from 'react';
import DashboardHeader from '@/components/ui/DashboardHeader';
import ClassroomCard from '@/components/ui/ClassroomCard';
import Button from '@/components/forms/Button';
import Link from 'next/link';

// Mock data for classrooms
const mockClassrooms = [
  {
    id: '1',
    name: 'Computer Science 101',
    description: 'Introduction to programming concepts and algorithms. This course covers fundamental programming principles, data structures, and algorithmic thinking necessary for software development.',
    sourceCount: 12,
    lastUpdated: 'May 15, 2023'
  },
  {
    id: '2',
    name: 'Mathematics Advanced',
    description: 'Advanced calculus and linear algebra concepts. This course delves into complex mathematical theories and their applications in engineering and physics.',
    sourceCount: 8,
    lastUpdated: 'May 10, 2023'
  },
  {
    id: '3',
    name: 'Biology Essentials',
    description: 'Fundamentals of biology and cellular processes. Explore the basic principles of life sciences, including genetics, evolution, and ecosystem dynamics.',
    sourceCount: 15,
    lastUpdated: 'May 5, 2023'
  }
];

const DashboardHome = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com'
  });

  const handleLogout = () => {
    console.log('Logout clicked');
    // Handle logout logic here
  };

  const handleClassroomClick = (id: string) => {
    console.log(`Classroom ${id} clicked`);
    // Handle classroom click logic here
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <DashboardHeader user={user} onLogout={handleLogout} />
      
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Classrooms</h1>
            <Link href="/dashboard/create-a-classroom">
              <Button variant="primary" size="lg">
                Create a Classroom
              </Button>
            </Link>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Existing Classrooms</h2>
            {mockClassrooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockClassrooms.map((classroom) => (
                  <ClassroomCard
                    key={classroom.id}
                    id={classroom.id}
                    name={classroom.name}
                    description={classroom.description}
                    sourceCount={classroom.sourceCount}
                    lastUpdated={classroom.lastUpdated}
                    onClick={() => handleClassroomClick(classroom.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">
                  You don't have any classrooms yet. Create your first classroom to get started!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;