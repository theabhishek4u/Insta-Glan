'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  hover = true,
  gradient = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
      className={`
        relative overflow-hidden
        rounded-2xl
        bg-white/70 dark:bg-white/[0.03]
        border border-border-light dark:border-border-dark
        backdrop-blur-xl
        shadow-card
        ${hover ? 'hover:shadow-card-hover hover:border-primary-200 dark:hover:border-primary-800 cursor-pointer' : ''}
        transition-all duration-300
        ${gradient ? 'gradient-border' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
