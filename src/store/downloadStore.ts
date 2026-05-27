'use client';

import { create } from 'zustand';
import type { MediaResponse, DownloadHistoryItem, DownloadStatus } from '@/types';
import { fetchInstagramMedia } from '@/lib/api';
import { isValidInstagramUrl, sanitizeUrl, getErrorMessage } from '@/lib/validators';

interface DownloadStore {
  url: string;
  status: DownloadStatus;
  mediaData: MediaResponse | null;
  downloadHistory: DownloadHistoryItem[];
  error: string;
  setUrl: (url: string) => void;
  fetchMedia: () => Promise<void>;
  clearMedia: () => void;
  addToHistory: (item: DownloadHistoryItem) => void;
  clearHistory: () => void;
  retryDownload: () => Promise<void>;
}

function loadHistory(): DownloadHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('insta-glan-history');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: DownloadHistoryItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('insta-glan-history', JSON.stringify(history.slice(0, 50)));
  } catch {
    // Silently fail if localStorage is full
  }
}

export const useDownloadStore = create<DownloadStore>((set, get) => ({
  url: '',
  status: 'idle',
  mediaData: null,
  downloadHistory: loadHistory(),
  error: '',

  setUrl: (url: string) => set({ url }),

  fetchMedia: async () => {
    const { url } = get();
    const sanitizedUrl = sanitizeUrl(url);

    if (!isValidInstagramUrl(sanitizedUrl)) {
      set({
        status: 'error',
        error: 'Please enter a valid Instagram public URL.',
        mediaData: null,
      });
      return;
    }

    set({ status: 'loading', error: '', mediaData: null });

    try {
      const data = await fetchInstagramMedia(sanitizedUrl);
      set({ status: 'success', mediaData: data });

      // Add to history
      const historyItem: DownloadHistoryItem = {
        id: Date.now().toString(),
        url: sanitizedUrl,
        type: data.type,
        username: data.username,
        thumbnail: data.thumbnail,
        timestamp: new Date().toISOString(),
        status: 'completed',
      };
      const newHistory = [historyItem, ...get().downloadHistory].slice(0, 50);
      set({ downloadHistory: newHistory });
      saveHistory(newHistory);
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      set({
        status: 'error',
        error: getErrorMessage(error?.code || 'API_FAILURE'),
      });
    }
  },

  clearMedia: () => set({ status: 'idle', mediaData: null, error: '', url: '' }),

  addToHistory: (item: DownloadHistoryItem) => {
    const newHistory = [item, ...get().downloadHistory].slice(0, 50);
    set({ downloadHistory: newHistory });
    saveHistory(newHistory);
  },

  clearHistory: () => {
    set({ downloadHistory: [] });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('insta-glan-history');
    }
  },

  retryDownload: async () => {
    const { url } = get();
    if (url) {
      await get().fetchMedia();
    }
  },
}));
