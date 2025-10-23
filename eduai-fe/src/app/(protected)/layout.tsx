import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | EduAssist AI',
  description: 'Your EduAssist AI dashboard where you can manage classrooms, videos, and learning materials.',
};

const ProtectedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {children}
    </div>
  );
};

export default ProtectedLayout;