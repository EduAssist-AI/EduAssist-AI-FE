"use client";

import Link from 'next/link';
import Button from '@/components/forms/Button';
import { UserIcon } from '@/components/ui/Icons';

interface DashboardHeaderProps {
  user: {
    name: string;
  };
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="py-6 px-8 bg-[var(--background)] border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-[var(--color-primary)]">
          EduAssist AI
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-end">
              <span className="text-[var(--foreground)] font-medium">{user.name}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[var(--color-neutral-light)] dark:bg-[var(--color-neutral-dark)] flex items-center justify-center">
              <UserIcon className="text-[var(--color-primary)] w-6 h-6" />
            </div>
            <Button onClick={onLogout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;