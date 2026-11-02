export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  bulletPoints: string[];
  technologies: string[];
  keyMetricHighlight?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  field: string;
  highlights: string[];
}

export interface TransmissionItem {
  id: string;
  title: string;
  platform: 'Medium' | 'University Workshop' | 'Community Talk';
  date: string;
  summary: string;
  url?: string;
  tags: string[];
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'email' | 'medium' | 'itch' | 'resume';
  label: string;
  url: string;
  handle: string;
}

export interface ProfileBio {
  fullName: string;
  callsign: string;
  headline: string;
  currentRole: string;
  location: string;
  summary: string;
  corePillars: { title: string; description: string }[];
}
