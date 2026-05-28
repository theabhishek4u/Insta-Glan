'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export default function Tabs({ tabs, activeTab, onTabChange, className = '' }: TabsProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-1.5 p-1.5 bg-surface-light-secondary/80 dark:bg-white/[0.02] border border-border-light dark:border-border-dark/60 rounded-2xl backdrop-blur-xl shadow-premium-glow/5 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            relative flex items-center gap-2 px-5 py-2.5
            text-sm font-medium rounded-xl
            transition-colors duration-300
            cursor-pointer
            ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary hover:bg-surface-light-tertiary dark:hover:bg-surface-dark-tertiary'
            }
          `}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 gradient-primary rounded-xl"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {tab.icon}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
