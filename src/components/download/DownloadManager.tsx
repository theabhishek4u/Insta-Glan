'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import { motion, AnimatePresence } from 'framer-motion';
import { Download, Trash2, RotateCcw, Clock, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDownloadStore } from '@/store/downloadStore';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function DownloadManager() {
  const { downloadHistory, clearHistory } = useDownloadStore();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (downloadHistory.length === 0) return null;

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full gradient-primary text-white shadow-glow-md flex items-center justify-center hover:shadow-glow-lg transition-shadow cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Download history"
        id="download-history-toggle"
      >
        <Download className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-bold">
          {downloadHistory.length}
        </span>
      </motion.button>

      {/* Slide-in Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-surface-light dark:bg-surface-dark border-l border-border-light dark:border-border-dark shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border-light dark:border-border-dark">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary-500" />
                  <h3 className="font-bold font-display text-lg">Download History</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    icon={<Trash2 className="w-4 h-4" />}
                    className="!text-red-400 hover:!text-red-300"
                  >
                    Clear
                  </Button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-light-tertiary dark:hover:bg-surface-dark-tertiary transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {downloadHistory.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface-light-secondary dark:bg-surface-dark-secondary border border-border-light dark:border-border-dark"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-surface-light-tertiary dark:bg-surface-dark-tertiary">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-light-tertiary">
                          <Download className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">@{item.username}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge type={item.type} className="!text-[10px] !px-2 !py-0.5" />
                        <span className="text-xs text-text-light-tertiary dark:text-text-dark-tertiary">
                          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    {item.status === 'failed' && (
                      <button className="text-red-400 hover:text-red-300 cursor-pointer" aria-label="Retry">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
