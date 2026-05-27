export type ContentType = 'reel' | 'video' | 'photo' | 'carousel' | 'story' | 'profile_picture';

export interface MediaItem {
  url: string;
  type: 'video' | 'image';
  quality: 'hd' | 'sd';
  width: number;
  height: number;
  thumbnail?: string;
}

export interface MediaResponse {
  type: ContentType;
  thumbnail: string;
  username: string;
  caption: string;
  media: MediaItem[];
  timestamp: string;
  profilePicture?: string;
}

export interface DownloadHistoryItem {
  id: string;
  url: string;
  type: ContentType;
  username: string;
  thumbnail: string;
  timestamp: string;
  status: 'completed' | 'failed';
}

export interface ApiErrorResponse {
  error: string;
  code: 'INVALID_URL' | 'PRIVATE_CONTENT' | 'RATE_LIMITED' | 'API_FAILURE' | 'NOT_FOUND';
  message: string;
}

export type DownloadStatus = 'idle' | 'loading' | 'success' | 'error';

export interface CategoryTab {
  id: ContentType;
  label: string;
  icon: string;
  description: string;
}
