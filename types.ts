export interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
}

export interface DownloadLink {
  provider: 'Mega' | 'Google Drive' | 'MediaFire' | 'PixelDrain' | 'Telegram' | 'Direct Link';
  name: string;
  url: string;
  size?: string;
  fastSpeed?: boolean;
}

export interface SceneTimestamp {
  timestamp: string;
  description: string;
}

export interface ScenePack {
  id: string;
  title: string;
  dramaName: string;
  episode: string;
  quality: '1080p FHD' | '4K UHD' | '60FPS' | 'LOG / Flat' | 'Raw Clips';
  fps: string;
  codec: string;
  size: string;
  duration: string;
  coverUrl: string;
  videoPreviewUrl?: string;
  categories: string[];
  downloadLinks: DownloadLink[];
  sceneBreakdown?: SceneTimestamp[];
  description: string;
  downloadCount: number;
  totalViews: number;
  featured: boolean;
  dramaYear: number;
  actorTags: string[];
  createdAt: string;
  rating: number;
  ratingCount: number;
}

export interface Comment {
  id: string;
  scenePackId: string;
  author: string;
  avatarUrl?: string;
  text: string;
  rating: number;
  createdAt: string;
}

export interface ScenePackRequest {
  id: string;
  dramaName: string;
  notes: string;
  requestedBy: string;
  status: 'pending' | 'completed' | 'rejected';
  createdAt: string;
}

export interface AdConfig {
  enabled: boolean;
  showAdPlaceholders: boolean;
  downloadTimerSeconds: number;
  monetagHeaderScript: string;
  inPagePushScript: string;
  nativeBannerScript: string;
  directLinkUrl: string;
}

export interface FilterOptions {
  search: string;
  category: string;
  quality: string;
  fps: string;
  sortBy: 'latest' | 'popular' | 'views' | 'rating' | 'title';
  year: string;
}

export type ViewMode = 'home' | 'pack' | 'categories' | 'bookmarks' | 'requests' | 'admin';
