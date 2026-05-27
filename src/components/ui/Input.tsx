'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
  rightElement?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, rightElement, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <div className={`
          relative flex items-center
          bg-white/80 dark:bg-white/5
          border ${error ? 'border-red-400 dark:border-red-500' : 'border-border-light dark:border-border-dark'}
          rounded-2xl
          transition-all duration-300
          focus-within:border-primary-400 focus-within:shadow-glow-sm
          hover:border-primary-300 dark:hover:border-primary-600
          backdrop-blur-xl
          ${className}
        `}>
          {icon && (
            <span className="pl-5 text-text-light-tertiary dark:text-text-dark-tertiary flex-shrink-0">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`
              w-full px-5 py-4
              bg-transparent
              text-text-light-primary dark:text-text-dark-primary
              placeholder:text-text-light-tertiary dark:placeholder:text-text-dark-tertiary
              outline-none
              text-base md:text-lg
              ${icon ? 'pl-3' : ''}
              ${rightElement ? 'pr-3' : ''}
            `}
            {...props}
          />
          {rightElement && (
            <div className="pr-3 flex-shrink-0 flex items-center gap-2">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400 dark:text-red-400 pl-2 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
