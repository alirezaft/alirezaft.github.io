import { Project } from './types';

export const projectKinectVision: Project = {
  id: 'kinect-interactive-vision',
  title: 'Kinect Vision Interactive Game',
  subtitle: 'Gesture-Controlled Computer Vision Game Built for Education',
  category: 'vr-applications',
  shelfRow: 2,
  slotIndex: 1,
  year: '2020 – 2021',
  role: 'Developer & Teaching Assistant',
  company: 'Ferdowsi University of Mashhad',
  statsBadge: 'University Exhibition',
  overview: 'Interactive motion-capture game powered by Microsoft Kinect and Unity, built to demonstrate computer vision and real-time skeleton tracking principles to university engineering students.',
  responsibilities: [
    'Integrated Kinect depth camera SDK with custom Unity skeletal joint remapping.',
    'Programmed responsive body gesture recognition algorithms for player input.',
    'Showcased live in university computer labs and student game development workshops.',
  ],
  techTags: ['Unity', 'C#', 'Computer Vision', 'Kinect SDK', 'Motion Tracking'],
  cartridgeVisual: {
    primaryColor: '#0a1d2e',
    accentColor: '#00c2ff',
    glowColor: 'rgba(0, 194, 255, 0.5)',
    serialNumber: 'ROM-KIN-02',
  },
  links: [
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/alirezaft',
      type: 'external',
    },
  ],
};
