import { TransmissionItem } from './types';

export const TRANSMISSIONS: TransmissionItem[] = [
  {
    id: 'medium-technical-articles',
    title: 'Technical Post-Mortems & Game Design Breakdowns on Medium',
    platform: 'Medium',
    date: 'Ongoing',
    summary: 'Authoring deep-dive English articles exploring mobile game engineering, architecture post-mortems, and telemetry-driven game design insights.',
    url: 'https://medium.com/@alirezaft',
    tags: ['Game Development', 'Technical Writing', 'Post-Mortems', 'Architecture'],
  },
  {
    id: 'university-workshops',
    title: 'Unity Engine & Game Design Workshops at Ferdowsi University',
    platform: 'University Workshop',
    date: '2020 – 2021',
    summary: 'Conducted hands-on workshops instructing engineering students on game loop design, physics simulation in Unity, and clean C# programming conventions.',
    tags: ['Teaching', 'Unity', 'Mentoring', 'Game Design'],
  },
  {
    id: 'computer-lab-ta',
    title: 'Teaching Assistant (TA) for Computer Lab Courses',
    platform: 'University Workshop',
    date: '2019 – 2021',
    summary: 'Assisted undergraduate computer engineering students with programming assignments, lab exercises, and computer network labs.',
    tags: ['Teaching Assistant', 'Computer Engineering', 'Computer Networks'],
  },
];
