export type ProjectCategory = 
  | 'shipped-commercial' 
  | 'vr-applications' 
  | 'open-source' 
  | 'tools';

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
  videoPreviewUrl?: string;
  thumbnailUrl?: string;
  cartridgeVisual: ProjectCartridgeVisual;
  links: ProjectLink[];
  featured?: boolean;
}
