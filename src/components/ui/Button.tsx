'use client';

import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
}

const variantStyles = {
  primary: 'gradient-primary text-white shadow-lg hover:shadow-glow-md active:scale-[0.98]',
  secondary: 'bg-surface-light-tertiary dark:bg-surface-dark-tertiary text-text-light-primary dark:text-text-dark-primary hover:bg-primary-100 dark:hover:bg-surface-dark-secondary',
  ghost: 'bg-transparent text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light-tertiary dark:hover:bg-surface-dark-tertiary',
  outline: 'border border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary hover:border-primary-400 hover:text-primary-500',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-base rounded-xl gap-2',
  lg: 'px-8 py-4 text-lg rounded-2xl gap-2.5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-semibold
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        hover:scale-[1.02] active:scale-[0.98]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
