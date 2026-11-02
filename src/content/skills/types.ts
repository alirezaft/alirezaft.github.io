export type ComponentRole = 
  | 'main-cpu'        // Huge central processor: core engine & language
  | 'heavy-ic'        // Large QFP / IC: architectural patterns, tools, optimization
  | 'medium-ic'       // SOIC / DIP package: platforms, SDKs, telemetry, git
  | 'passive-module'; // Crystal oscillator, regulator, capacitor: workflows, agile, mentoring

export type SkillImportanceLevel = 1 | 2 | 3 | 4; // 1: Vital / Crucial, 4: Supporting

export type SkillCategory = 
  | 'engine-core'
  | 'architecture'
  | 'optimization'
  | 'tooling-sdks'
  | 'design-analytics'
  | 'workflow';

export interface HardwareSpecs {
  frequencyOrRating: string; // e.g. "5.2 GHz / C# 12", "99.9% Uptime", "Zero GC"
  footprint: string;         // e.g. "BGA-1155", "QFP-144", "SOIC-28", "SMD-0805"
  pinCount: number;
  status: 'active' | 'boosted' | 'online';
}

export interface SkillChip {
  id: string;
  name: string;
  componentRole: ComponentRole;
  importanceLevel: SkillImportanceLevel;
  category: SkillCategory;
  summary: string;
  realWorldImpact: string;
  linkedProjectIds: string[];
  specs: HardwareSpecs;
  circuitColor: string;
}
