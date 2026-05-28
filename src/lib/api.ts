import axios from 'axios';
import type { MediaResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { data } = error.response;
      return Promise.reject({
        code: data?.code || 'API_FAILURE',
        message: data?.message || 'Something went wrong. Please try again.',
      });
    }
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        code: 'API_FAILURE',
        message: 'Request timed out. Please try again.',
      });
    }
    return Promise.reject({
      code: 'API_FAILURE',
      message: 'Network error. Please check your connection.',
    });
  }
);

export async function fetchInstagramMedia(url: string): Promise<MediaResponse> {
  const response = await apiClient.post<MediaResponse>('/api/download', { url });
  return response.data;
}

export function getProxyUrl(mediaUrl: string): string {
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001').replace(/\/+$/, '');
  return `${baseUrl}/api/proxy?url=${encodeURIComponent(mediaUrl)}`;
}

export async function downloadMedia(mediaUrl: string, filename: string): Promise<void> {
  const proxyUrl = getProxyUrl(mediaUrl);
  const link = document.createElement('a');
  link.href = proxyUrl;
  link.download = filename;
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default apiClient;
