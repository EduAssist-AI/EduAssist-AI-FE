"use client";

import Link from 'next/link';
import Button from '@/components/forms/Button';
import { UserIcon, ChevronDownIcon, ArrowLeftIcon } from '@/components/ui/Icons';
import { useState, useRef, useEffect } from 'react';

interface ClassroomPageHeaderProps {
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;
  classroomName: string;
  classroomDescription: string;
}

const ClassroomPageHeader: React.FC<ClassroomPageHeaderProps> = ({ 
  user, 
  onLogout,
  classroomName,
  classroomDescription
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-[var(--background)] border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)]">
      {/* Top navigation bar */}
      <div className="py-4 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-[var(--color-primary)]">
          EduAssist AI
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-[var(--foreground)] hover:text-[var(--color-primary)]">
            Dashboard
          </Link>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--color-neutral-light)] dark:bg-[var(--color-neutral-dark)] flex items-center justify-center">
                <UserIcon className="text-[var(--color-primary)] w-6 h-6" />
              </div>
              <ChevronDownIcon 
                className={`w-4 h-4 text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] transition-transform duration-200 ${
                  isDropdownOpen ? 'transform rotate-180' : ''
                }`} 
              />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[var(--background)] rounded-md shadow-lg border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] z-50">
                <div className="p-4 border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)]">
                  <div className="font-medium text-[var(--foreground)]">{user.name}</div>
                  <div className="text-sm text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">{user.email}</div>
                </div>
                <div className="p-2">
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-[var(--foreground)] hover:bg-[var(--color-neutral-light)] dark:hover:bg-[var(--color-neutral-dark)] rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Classroom header */}
      <div className="py-6 px-6 border-t border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--foreground)]">{classroomName}</h1>
            <p className="text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">
              {classroomDescription}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClassroomPageHeader;