import { AnimatePresence, motion } from 'framer-motion';
import { useUI } from '../../../context';
import RecruiterHeader from './RecruiterHeader';
import RecruiterTabs from './RecruiterTabs';
import RecruiterProjectsView from './RecruiterProjectsView';
import RecruiterSkillsView from './RecruiterSkillsView';
import RecruiterCareerView from './RecruiterCareerView';
import RecruiterTransmissionsView from './RecruiterTransmissionsView';

export default function RecruiterGrid() {
  const { activeRecruiterTab } = useUI();

  return (
    <div className="absolute inset-0 z-20 overflow-y-auto bg-[#050811] pointer-events-auto">
      {/* Top padding to account for fixed HUD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-16">
        {/* Recruiter Header & 1-Click Resume Download */}
        <RecruiterHeader />

        {/* Section Navigation Tabs */}
        <RecruiterTabs />

        {/* Dynamic Tab Content with Smooth Transitions */}
        <AnimatePresence mode="wait">
          {activeRecruiterTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <RecruiterProjectsView />
            </motion.div>
          )}

          {activeRecruiterTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <RecruiterSkillsView />
            </motion.div>
          )}

          {activeRecruiterTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <RecruiterCareerView />
            </motion.div>
          )}

          {activeRecruiterTab === 'transmissions' && (
            <motion.div
              key="transmissions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <RecruiterTransmissionsView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
