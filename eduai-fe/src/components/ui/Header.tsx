"use client";

import Link from 'next/link';
import Button from '../forms/Button';

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated = false, onLogout }) => {
  return (
    <header className="py-6 px-8 bg-[var(--background)] border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-[var(--color-primary)]">
          EduAssist AI
        </div>
        
        <div className="flex space-x-3">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/home" className="text-[var(--foreground)] hover:text-[var(--color-primary)]">
                Dashboard
              </Link>
              <Button onClick={onLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;