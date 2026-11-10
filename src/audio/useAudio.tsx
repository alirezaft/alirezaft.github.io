/**
 * useAudio — React context/hook for the Cyber-Deck sound engine.
 *
 * Usage:
 *   const { playClick, muted, toggleMute, volume, setVolume } = useAudio();
 *
 * Wrap your app (or the component tree that needs audio) in <AudioProvider>.
 * Persistence: mute state and volume are saved to localStorage.
 */

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';

import {
  startAudioContext,
  setMasterVolume,
  setMuted,
  playClick,
  playHover,
  playCrtPowerOn,
  playCrtPowerOff,
  playBusPulse,
  playOverclockSurge,
  playUsbPlug,
  playRobotChirp,
  playRobotFedCrunch,
  playRobotPurr,
  playRobotIdle,
  playRobotOverclockReact,
  playCameraWhoosh,
  playHudModeSwitch,
  playCommsTerminalClick,
  startAmbientHum,
  stopAmbientHum,
  isAmbientRunning,
} from './soundEngine';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AudioContextValue {
  muted: boolean;
  volume: number;
  ambientOn: boolean;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  toggleAmbient: () => void;
  startAmbient: () => void;
  stopAmbient: () => void;

  // Sound triggers — each returns void
  playClick: () => void;
  playHover: () => void;
  playCrtPowerOn: () => void;
  playCrtPowerOff: () => void;
  playBusPulse: () => void;
  playOverclockSurge: () => void;
  playUsbPlug: () => void;
  playRobotChirp: () => void;
  playRobotFedCrunch: () => void;
  playRobotPurr: () => void;
  playRobotIdle: () => void;
  playRobotOverclockReact: () => void;
  playCameraWhoosh: () => void;
  playHudModeSwitch: () => void;
  playCommsTerminalClick: () => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AudioCtx = createContext<AudioContextValue | null>(null);

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

const LS_MUTED = 'cyberdeck_muted';
const LS_VOLUME = 'cyberdeck_volume';

function loadMuted(): boolean {
  try { return localStorage.getItem(LS_MUTED) === 'true'; } catch { return false; }
}

function loadVolume(): number {
  try {
    const v = parseFloat(localStorage.getItem(LS_VOLUME) ?? '1');
    return isNaN(v) ? 1 : Math.max(0, Math.min(1, v));
  } catch { return 1; }
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, _setMuted] = useState<boolean>(loadMuted);
  const [volume, _setVolume] = useState<number>(loadVolume);
  const [ambientOn, setAmbientOn] = useState(false);
  const isAmbientActiveRef = useRef(false);

  // Sync engine on mount
  useEffect(() => {
    setMuted(muted);
    setMasterVolume(volume);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleMute = useCallback(() => {
    _setMuted(prev => {
      const next = !prev;
      setMuted(next);
      try { localStorage.setItem(LS_MUTED, String(next)); } catch {}
      return next;
    });
  }, []);

  const handleSetVolume = useCallback((v: number) => {
    _setVolume(v);
    setMasterVolume(v);
    try { localStorage.setItem(LS_VOLUME, String(v)); } catch {}
  }, []);

  const startAmbient = useCallback(() => {
    isAmbientActiveRef.current = true;
    startAudioContext().then(() => {
      if (isAmbientActiveRef.current) {
        startAmbientHum();
        setAmbientOn(true);
      }
    });
  }, []);

  const stopAmbient = useCallback(() => {
    isAmbientActiveRef.current = false;
    stopAmbientHum();
    setAmbientOn(false);
  }, []);

  const toggleAmbient = useCallback(() => {
    if (isAmbientActiveRef.current) {
      stopAmbient();
    } else {
      startAmbient();
    }
  }, [startAmbient, stopAmbient]);

  // Unlock audio & start ambient on first user interaction if blocked by browser autoplay policy
  useEffect(() => {
    const unlockAudio = () => {
      startAudioContext().then(() => {
        if (isAmbientActiveRef.current && !isAmbientRunning()) {
          startAmbientHum();
          setAmbientOn(true);
        }
      });
    };

    const events = ['pointerdown', 'keydown', 'touchstart', 'click'];
    events.forEach(evt => {
      window.addEventListener(evt, unlockAudio, { passive: true });
    });

    return () => {
      events.forEach(evt => {
        window.removeEventListener(evt, unlockAudio);
      });
    };
  }, []);

  /** Wraps a sound function so AudioContext is started on first user gesture */
  const sfx = useCallback(<T extends unknown[]>(fn: (...args: T) => void) => {
    return (...args: T): void => {
      startAudioContext().then(() => fn(...args));
    };
  }, []);

  const value: AudioContextValue = {
    muted,
    volume,
    ambientOn,
    toggleMute,
    setVolume: handleSetVolume,
    toggleAmbient,
    startAmbient,
    stopAmbient,

    playClick:               sfx(playClick),
    playHover:               sfx(playHover),
    playCrtPowerOn:          sfx(playCrtPowerOn),
    playCrtPowerOff:         sfx(playCrtPowerOff),
    playBusPulse:            sfx(playBusPulse),
    playOverclockSurge:      sfx(playOverclockSurge),
    playUsbPlug:             sfx(playUsbPlug),
    playRobotChirp:          sfx(playRobotChirp),
    playRobotFedCrunch:      sfx(playRobotFedCrunch),
    playRobotPurr:           sfx(playRobotPurr),
    playRobotIdle:           sfx(playRobotIdle),
    playRobotOverclockReact: sfx(playRobotOverclockReact),
    playCameraWhoosh:        sfx(playCameraWhoosh),
    playHudModeSwitch:       sfx(playHudModeSwitch),
    playCommsTerminalClick:  sfx(playCommsTerminalClick),
  };

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used inside <AudioProvider>');
  return ctx;
}
