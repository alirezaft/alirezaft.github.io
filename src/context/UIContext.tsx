import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { useAudio } from '../audio';
import {
  ALL_PROJECTS,
  getProjectById,
  type Project,
  type ProjectCategory,
} from '../content/projects';
import {
  getChipById,
  type SkillChip,
} from '../content/skills';

// ---------------------------------------------------------------------------
// Types & Enums
// ---------------------------------------------------------------------------

export type ViewMode = '3d' | 'recruiter';

export type RecruiterTab = 'projects' | 'skills' | 'experience' | 'transmissions';

export interface UIState {
  // Navigation & View Mode
  viewMode: ViewMode;

  // Slide-out Project Case Study Drawer
  selectedProjectId: string | null;
  selectedProject: Project | null;
  isProjectDrawerOpen: boolean;

  // Skill Hardware Telemetry Modal
  selectedSkillId: string | null;
  selectedSkill: SkillChip | null;
  isSkillModalOpen: boolean;

  // Recruiter Quick-View Controls
  activeRecruiterTab: RecruiterTab;
  recruiterCategory: ProjectCategory | 'all';
  recruiterSearchQuery: string;
  filteredProjects: Project[];

  // Resume Download Animation State
  isResumeDownloading: boolean;
}

export interface UIActions {
  // Mode controls
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;

  // Project Drawer controls
  openProject: (projectId: string) => void;
  closeProject: () => void;

  // Skill Modal controls
  openSkill: (skillId: string) => void;
  closeSkill: () => void;

  // Recruiter Controls
  setActiveRecruiterTab: (tab: RecruiterTab) => void;
  setRecruiterCategory: (category: ProjectCategory | 'all') => void;
  setRecruiterSearchQuery: (query: string) => void;

  // Resume Action
  triggerResumeDownload: () => void;

  // Global dismiss
  closeAllOverlays: () => void;
}

export type UIContextType = UIState & UIActions;

// ---------------------------------------------------------------------------
// Context Creation
// ---------------------------------------------------------------------------

const UIContext = createContext<UIContextType | null>(null);

// ---------------------------------------------------------------------------
// Resume Path
// ---------------------------------------------------------------------------

const RESUME_DOWNLOAD_PATH = './assets/resume/Alireza_Forghani_Toosi_Resume.pdf';
const RESUME_FILE_NAME = 'Alireza_Forghani_Toosi_Resume.pdf';

// ---------------------------------------------------------------------------
// Provider Component
// ---------------------------------------------------------------------------

export function UIProvider({ children }: { children: ReactNode }) {
  const {
    playClick,
    playHover,
    playHudModeSwitch,
    playBusPulse,
  } = useAudio();

  // Core view mode: default '3d' hero
  const [viewMode, setViewModeState] = useState<ViewMode>('3d');

  // Selected project drawer state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isProjectDrawerOpen, setIsProjectDrawerOpen] = useState(false);

  // Selected skill modal state
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  // Recruiter view filter states
  const [activeRecruiterTab, setActiveRecruiterTabState] = useState<RecruiterTab>('projects');
  const [recruiterCategory, setRecruiterCategoryState] = useState<ProjectCategory | 'all'>('all');
  const [recruiterSearchQuery, setRecruiterSearchQueryState] = useState('');

  // Resume download visual surge state
  const [isResumeDownloading, setIsResumeDownloading] = useState(false);

  // Derived selected models
  const selectedProject = useMemo(() => {
    return selectedProjectId ? getProjectById(selectedProjectId) ?? null : null;
  }, [selectedProjectId]);

  const selectedSkill = useMemo(() => {
    return selectedSkillId ? getChipById(selectedSkillId) ?? null : null;
  }, [selectedSkillId]);

  // Filtered projects calculation
  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((project) => {
      // Category filter
      if (recruiterCategory !== 'all' && project.category !== recruiterCategory) {
        return false;
      }

      // Search query matching (title, subtitle, techTags, role, company, overview)
      if (recruiterSearchQuery.trim()) {
        const query = recruiterSearchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesSubtitle = project.subtitle.toLowerCase().includes(query);
        const matchesTags = project.techTags.some((tag: string) => tag.toLowerCase().includes(query));
        const matchesRole = project.role.toLowerCase().includes(query);
        const matchesCompany = project.company.toLowerCase().includes(query);
        const matchesOverview = project.overview.toLowerCase().includes(query);

        if (!matchesTitle && !matchesSubtitle && !matchesTags && !matchesRole && !matchesCompany && !matchesOverview) {
          return false;
        }
      }

      return true;
    });
  }, [recruiterCategory, recruiterSearchQuery]);

  // ---------------------------------------------------------------------------
  // Action Handlers
  // ---------------------------------------------------------------------------

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    playHudModeSwitch();
  }, [playHudModeSwitch]);

  const toggleViewMode = useCallback(() => {
    setViewModeState((prev) => {
      const next = prev === '3d' ? 'recruiter' : '3d';
      playHudModeSwitch();
      return next;
    });
  }, [playHudModeSwitch]);

  const openProject = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
    setIsProjectDrawerOpen(true);
    // Auto-close skill modal if open
    setIsSkillModalOpen(false);
    playClick();
  }, [playClick]);

  const closeProject = useCallback(() => {
    setIsProjectDrawerOpen(false);
    playClick();
  }, [playClick]);

  const openSkill = useCallback((skillId: string) => {
    setSelectedSkillId(skillId);
    setIsSkillModalOpen(true);
    // Auto-close project drawer if open
    setIsProjectDrawerOpen(false);
    playBusPulse();
  }, [playBusPulse]);

  const closeSkill = useCallback(() => {
    setIsSkillModalOpen(false);
    playClick();
  }, [playClick]);

  const setActiveRecruiterTab = useCallback((tab: RecruiterTab) => {
    setActiveRecruiterTabState(tab);
    playClick();
  }, [playClick]);

  const setRecruiterCategory = useCallback((category: ProjectCategory | 'all') => {
    setRecruiterCategoryState(category);
    playHover();
  }, [playHover]);

  const setRecruiterSearchQuery = useCallback((query: string) => {
    setRecruiterSearchQueryState(query);
  }, []);

  const triggerResumeDownload = useCallback(() => {
    // Clean UI click sound effect for 2D button
    playClick();

    // Trigger visual glowing feedback state on the button
    setIsResumeDownloading(true);
    setTimeout(() => {
      setIsResumeDownloading(false);
    }, 1200);

    // Anchor-based verified download
    const link = document.createElement('a');
    link.href = RESUME_DOWNLOAD_PATH;
    link.download = RESUME_FILE_NAME;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [playClick]);

  const closeAllOverlays = useCallback(() => {
    if (isProjectDrawerOpen || isSkillModalOpen) {
      setIsProjectDrawerOpen(false);
      setIsSkillModalOpen(false);
      playClick();
    }
  }, [isProjectDrawerOpen, isSkillModalOpen, playClick]);

  // ---------------------------------------------------------------------------
  // Global Keyboard Shortcuts (Escape to dismiss)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isProjectDrawerOpen || isSkillModalOpen) {
          closeAllOverlays();
        } else if (viewMode === 'recruiter') {
          // If no modals are open and we are in recruiter view, ESC toggles back to 3D
          setViewMode('3d');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProjectDrawerOpen, isSkillModalOpen, viewMode, closeAllOverlays, setViewMode]);

  const value: UIContextType = {
    viewMode,
    selectedProjectId,
    selectedProject,
    isProjectDrawerOpen,
    selectedSkillId,
    selectedSkill,
    isSkillModalOpen,
    activeRecruiterTab,
    recruiterCategory,
    recruiterSearchQuery,
    filteredProjects,
    isResumeDownloading,
    setViewMode,
    toggleViewMode,
    openProject,
    closeProject,
    openSkill,
    closeSkill,
    setActiveRecruiterTab,
    setRecruiterCategory,
    setRecruiterSearchQuery,
    triggerResumeDownload,
    closeAllOverlays,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useUI(): UIContextType {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
