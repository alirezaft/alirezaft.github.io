import { RobotDialogueItem } from './types';

export const ROBOT_DIALOGUES: RobotDialogueItem[] = [
  // IDLE THOUGHTS
  {
    id: 'idle-01',
    category: 'idle',
    text: 'Scanning workspace... 0 memory leaks detected. All references nominal!',
    mood: 'idle',
    soundCue: 'scan',
  },
  {
    id: 'idle-02',
    category: 'idle',
    text: 'Did you know Alireza reduced crash & ANR rates by 30% across 50M+ active users?',
    mood: 'thinking',
    soundCue: 'chirp',
  },
  {
    id: 'idle-03',
    category: 'idle',
    text: 'I love the smell of freshly soldered copper bus traces in the morning.',
    mood: 'happy',
    soundCue: 'chirp',
  },
  {
    id: 'idle-04',
    category: 'idle',
    text: 'Clean architecture makes my servos purr. Decoupled events forever!',
    mood: 'happy',
    soundCue: 'chirp',
  },

  // FEEDING MICROCHIP RESPONSES
  {
    id: 'feed-01',
    category: 'feeding',
    text: 'CRUNCH! *BEEP BOOP* Mmm, that microchip tasted like zero-allocation C# code!',
    mood: 'fed',
    soundCue: 'crunch',
  },
  {
    id: 'feed-02',
    category: 'feeding',
    text: '*Nom nom nom* +100 microvolts! My companion joy circuits are overclocked!',
    mood: 'happy',
    soundCue: 'cheer',
  },
  {
    id: 'feed-03',
    category: 'feeding',
    text: 'Delicious! You fed me pure Verlet physics sweetness. Extra bounce enabled!',
    mood: 'fed',
    soundCue: 'crunch',
  },
  {
    id: 'feed-04',
    category: 'feeding',
    text: '*Chirp chirp!* Full battery recharge! Byte loves you, human!',
    mood: 'happy',
    soundCue: 'cheer',
  },

  // NAVIGATION HINTS
  {
    id: 'nav-01',
    category: 'nav-hint',
    text: 'Tip: Click any project cartridge on the shelf to slot it into the CRT monitor deck!',
    mood: 'curious',
    soundCue: 'chirp',
  },
  {
    id: 'nav-02',
    category: 'nav-hint',
    text: 'Need Alireza’s resume? Click the encrypted USB chip right there on the desk!',
    mood: 'thinking',
    soundCue: 'scan',
  },
  {
    id: 'nav-03',
    category: 'nav-hint',
    text: 'Recruiter in a hurry? Click "Quick View" in the top bar for instant 2D cards!',
    mood: 'curious',
    soundCue: 'chirp',
  },
  {
    id: 'nav-04',
    category: 'nav-hint',
    text: 'Hover over the circuit chips on the motherboard test-bench to see real engineering telemetry!',
    mood: 'thinking',
    soundCue: 'scan',
  },

  // PROJECT COMMENTARY
  {
    id: 'proj-bean-special',
    category: 'project-commentary',
    text: '50 Million downloads! That is an astronomical number of delivery boxes kept at 60 FPS.',
    mood: 'surprised',
    soundCue: 'cheer',
    relatedProjectId: 'mr-bean-special-delivery',
  },
  {
    id: 'proj-bean-solitaire',
    category: 'project-commentary',
    text: 'Balancing card puzzles mathematically is pure art. Alireza trimmed player churn by 10% here!',
    mood: 'thinking',
    soundCue: 'chirp',
    relatedProjectId: 'mr-bean-solitaire-adventure',
  },
  {
    id: 'proj-verlet-rope',
    category: 'project-commentary',
    text: '70+ stars on GitHub! Verlet integration means zero spring explosion glitches.',
    mood: 'happy',
    soundCue: 'chirp',
    relatedProjectId: 'unity-verlet-rope',
  },
  {
    id: 'proj-prefab-palette',
    category: 'project-commentary',
    text: 'UI Toolkit at its finest! Level designers saved 10% production time with this drag-and-drop tool.',
    mood: 'happy',
    soundCue: 'chirp',
    relatedProjectId: 'prefab-palette',
  },
  {
    id: 'proj-unity-chart',
    category: 'project-commentary',
    text: 'Real-time vector graphs inside UI Toolkit! UnityChart makes play-mode data visualization look so clean in custom inspectors.',
    mood: 'happy',
    soundCue: 'chirp',
    relatedProjectId: 'unity-chart',
  },
  {
    id: 'proj-vr-production',
    category: 'project-commentary',
    text: '90 FPS stereo rendering in VR with zero nausea: genuine engineering discipline.',
    mood: 'thinking',
    soundCue: 'scan',
    relatedProjectId: 'vr-interactive-applications',
  },

  // EASTER EGGS
  {
    id: 'easter-01',
    category: 'easter-egg',
    text: 'Pssst... if you click the [OVERCLOCK] switch on the motherboard, my fans might spin at maximum RPM!',
    mood: 'overclocked',
    soundCue: 'glitch',
  },
  {
    id: 'easter-02',
    category: 'easter-egg',
    text: 'Hey! Head pats detected! My tactile sensors give that a 10/10 rating.',
    mood: 'happy',
    soundCue: 'chirp',
  },
];

export function getRandomDialogue(category: RobotDialogueItem['category']): RobotDialogueItem {
  const matches = ROBOT_DIALOGUES.filter((d) => d.category === category);
  return matches[Math.floor(Math.random() * matches.length)];
}

export function getProjectCommentary(projectId: string): RobotDialogueItem | undefined {
  return ROBOT_DIALOGUES.find((d) => d.relatedProjectId === projectId);
}
