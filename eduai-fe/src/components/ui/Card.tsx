import React from 'react';

interface CardProps {
  title: string;
  description: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  footer, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`bg-[var(--background)] rounded-xl border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] shadow-sm transition-shadow ${className}`}>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">{title}</h3>
        <p className="text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] mb-4 h-12 overflow-hidden">
          {description}
        </p>
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)]">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;