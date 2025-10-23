import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <div className="flex items-center">
      <input
        {...props}
        type="checkbox"
        className={`w-4 h-4 text-[var(--color-primary)] border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] rounded focus:ring-[var(--color-primary)] bg-[var(--background)] ${props.className || ''}`}
      />
      <label 
        htmlFor={props.id} 
        className="block ml-2 text-sm text-[var(--foreground)]"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;