export type RobotMood = 
  | 'idle' 
  | 'happy' 
  | 'thinking' 
  | 'fed' 
  | 'curious' 
  | 'surprised'
  | 'overclocked';

export type DialogueCategory = 
  | 'idle' 
  | 'feeding' 
  | 'project-commentary' 
  | 'nav-hint' 
  | 'easter-egg';

export interface RobotDialogueItem {
  id: string;
  category: DialogueCategory;
  text: string;
  mood: RobotMood;
  soundCue?: 'chirp' | 'crunch' | 'cheer' | 'glitch' | 'scan';
  relatedProjectId?: string;
}
