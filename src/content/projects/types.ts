export type ProjectCategory =
  | 'shipped-commercial'
  | 'vr-applications'
  | 'open-source'
  | 'tools'
  | 'indie';

export interface CategoryShelfInfo {
  id: ProjectCategory;
  name: string;
  shelfRow: number; // 1 to 4
  description: string;
  accentColor: string;
  glowColor: string;
}

export type ProjectLinkType =
  | 'google-play'
  | 'github'
  | 'itch'
  | 'medium'
  | 'webgl'
  | 'external';

export interface ProjectLink {
  label: string;
  url: string;
  type: ProjectLinkType;
}

export interface ProjectCartridgeVisual {
  primaryColor: string;
  accentColor: string;
  glowColor: string;
  stripeColor?: string;
  serialNumber: string;
}

export type ProjectMediaType = 'image' | 'video' | 'gif';

export interface ProjectMediaItem {
  id: string;
  type: ProjectMediaType;
  url: string;
  thumbnailUrl?: string; // Optional poster for video or small preview
  title?: string;
  caption?: string;
  alt?: string;
  aspectRatio?: string; // e.g. '16/9', '4/3', '1/1'
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  shelfRow: number; // 1: Shipped Commercial, 2: VR & Apps, 3: Open Source, 4: Tools
  slotIndex: number; // 0, 1, 2...
  year: string;
  role: string;
  company: string;
  statsBadge: string; // e.g. "50M+ Downloads", "65+ Stars"
  overview: string;
  responsibilities: string[];
  techTags: string[];
  thumbnailUrl?: string; // Primary card & rack thumbnail
  media?: ProjectMediaItem[]; // Rich media carousel items (images, gifs, clips)
  videoPreviewUrl?: string;
  cartridgeVisual: ProjectCartridgeVisual;
  links: ProjectLink[];
  featured?: boolean;
}
