import React from 'react';

interface FormContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ 
  title, 
  subtitle, 
  children, 
  footer 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-neutral-light)] dark:bg-[var(--background)]">
      <div className="w-full max-w-md p-8 space-y-8 bg-[var(--background)] rounded-lg shadow-md border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">{title}</h2>
          <p className="mt-2 text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">
            {subtitle}
          </p>
        </div>
        
        <div className="mt-8">
          {children}
        </div>
        
        {footer && (
          <div className="text-center mt-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormContainer;