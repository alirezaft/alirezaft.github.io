import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAudio } from '../../audio';
import { useUI } from '../../context';

export interface InteractableConfig {
  id: string;
  /** Root 3D Object or Group to raycast against */
  object: THREE.Object3D;
  /** Contextual HUD prompt displayed under reticle (e.g. "LOAD // KINGDOM HERO") */
  prompt: string;
  /** Callback fired when player clicks with crosshair targeted */
  onInteract: () => void;
  /** Callback fired when crosshair starts aiming at object */
  onHoverStart?: () => void;
  /** Callback fired when crosshair stops aiming at object */
  onHoverEnd?: () => void;
  /** Max interaction distance in meters (defaults to 3.5m) */
  maxDistance?: number;
  /** Whether interaction is currently enabled */
  enabled?: boolean;
}

interface CrosshairContextValue {
  hoverPrompt: string | null;
  activeId: string | null;
  registerInteractable: (config: InteractableConfig) => void;
  unregisterInteractable: (id: string) => void;
}

const CrosshairContext = createContext<CrosshairContextValue | null>(null);

export const useOptionalCrosshair = () => {
  return useContext(CrosshairContext);
};

export const useCrosshair = () => {
  const context = useContext(CrosshairContext);
  if (!context) {
    throw new Error('useCrosshair must be used within a CrosshairProvider');
  }
  return context;
};

/**
 * Hook for any 3D prop/object to register itself for center-crosshair targeting & interaction.
 * Returns { isHovered } as a single source of truth derived directly from active crosshair focus.
 */
export function useCrosshairInteractable(config: {
  id: string;
  ref: React.RefObject<THREE.Object3D | null>;
  prompt: string;
  onInteract: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  maxDistance?: number;
  enabled?: boolean;
}): { isHovered: boolean } {
  const { registerInteractable, unregisterInteractable, activeId } = useCrosshair();
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    const obj = config.ref.current;
    if (!obj || config.enabled === false) {
      unregisterInteractable(config.id);
      return;
    }

    const itemConfig: InteractableConfig = {
      id: config.id,
      object: obj,
      get prompt() {
        return configRef.current.prompt;
      },
      onInteract: () => configRef.current.onInteract?.(),
      onHoverStart: () => configRef.current.onHoverStart?.(),
      onHoverEnd: () => configRef.current.onHoverEnd?.(),
      maxDistance: config.maxDistance ?? 3.5,
      enabled: config.enabled ?? true,
    };

    registerInteractable(itemConfig);

    return () => {
      unregisterInteractable(config.id);
    };
  }, [config.id, config.ref, config.enabled, registerInteractable, unregisterInteractable]);

  const isHovered = activeId === config.id && config.enabled !== false;
  return { isHovered };
}

/**
 * CrosshairProvider:
 * Manages the registry of all interactable 3D objects and provides the active hoverPrompt.
 */
export const CrosshairProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hoverPrompt, setHoverPrompt] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const registry = useRef<Map<string, InteractableConfig>>(new Map());

  const registerInteractable = useCallback((config: InteractableConfig) => {
    registry.current.set(config.id, config);
  }, []);

  const unregisterInteractable = useCallback((id: string) => {
    const item = registry.current.get(id);
    if (item) {
      item.onHoverEnd?.();
      registry.current.delete(id);
    }
    setActiveId((prev) => (prev === id ? null : prev));
    setHoverPrompt((prev) => {
      // If the unregistering item was currently active, clear prompt
      return registry.current.has(id) ? prev : null;
    });
  }, []);

  return (
    <CrosshairContext.Provider
      value={{
        hoverPrompt,
        activeId,
        registerInteractable,
        unregisterInteractable,
      }}
    >
      {/* Attach internal registry ref for CrosshairRaycaster */}
      <CrosshairInternalContext.Provider value={{ registry, setHoverPrompt, setActiveId }}>
        {children}
      </CrosshairInternalContext.Provider>
    </CrosshairContext.Provider>
  );
};

interface InternalContextValue {
  registry: React.MutableRefObject<Map<string, InteractableConfig>>;
  setHoverPrompt: React.Dispatch<React.SetStateAction<string | null>>;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
}

const CrosshairInternalContext = createContext<InternalContextValue | null>(null);

export interface CrosshairRaycasterProps {
  onEmptyClick?: () => void;
}

/**
 * CrosshairRaycaster:
 * Sits inside the R3F <Canvas>.
 * Every frame, casts a ray from the EXACT center of the camera viewport (0, 0 in NDC).
 * Targets interactable objects, updates hover prompts, and triggers interaction on click.
 */
export const CrosshairRaycaster: React.FC<CrosshairRaycasterProps> = ({ onEmptyClick }) => {
  const { camera, gl } = useThree();
  const internal = useContext(CrosshairInternalContext);
  const audio = useAudio();
  const { isProjectDrawerOpen } = useUI();
  const onEmptyClickRef = useRef(onEmptyClick);
  onEmptyClickRef.current = onEmptyClick;

  const raycaster = useRef(new THREE.Raycaster());
  const centerNDC = useRef(new THREE.Vector2(0, 0)); // Screen center (0, 0)
  const currentFocusedId = useRef<string | null>(null);
  const audioPlayedForId = useRef<string | null>(null);

  // Set raycaster limits for performance & accuracy
  useEffect(() => {
    raycaster.current.far = 4.0;
  }, []);

  // Centralized focus clearing helper
  const clearFocus = useCallback(() => {
    if (currentFocusedId.current !== null && internal) {
      const prev = internal.registry.current.get(currentFocusedId.current);
      prev?.onHoverEnd?.();
      currentFocusedId.current = null;
      audioPlayedForId.current = null;
      internal.setHoverPrompt(null);
      internal.setActiveId(null);
    }
  }, [internal]);

  // Window blur & visibility listeners to immediately clear hover when switching windows/tabs
  useEffect(() => {
    const handleBlur = () => {
      clearFocus();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearFocus();
      }
    };

    const handlePointerLockChange = () => {
      // If pointer lock was lost, clear crosshair hover state
      if (document.pointerLockElement !== gl.domElement) {
        clearFocus();
      }
    };

    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [clearFocus, gl.domElement]);

  // Frame Loop: Continuous center-screen raycasting
  useFrame(() => {
    if (!internal) return;
    const { registry, setHoverPrompt, setActiveId } = internal;

    // Safety: If drawer is open, or tab is hidden, suspend raycasting & clear focus
    if (isProjectDrawerOpen || document.hidden) {
      if (currentFocusedId.current !== null) {
        clearFocus();
      }
      return;
    }

    raycaster.current.setFromCamera(centerNDC.current, camera);

    // Collect all registered interactable 3D roots
    const interactables = Array.from(registry.current.values()).filter(
      (item) => item.enabled !== false && item.object
    );

    if (interactables.length === 0) {
      if (currentFocusedId.current !== null) {
        clearFocus();
      }
      return;
    }

    // Raycast recursively against all interactable roots
    const searchRoots = interactables.map((i) => i.object);
    const hits = raycaster.current.intersectObjects(searchRoots, true);

    let nearestItem: InteractableConfig | null = null;
    let minDistance = Infinity;

    for (const hit of hits) {
      // Find which registered interactable owns this hit object
      let curr: THREE.Object3D | null = hit.object;
      let matchedConfig: InteractableConfig | null = null;

      while (curr) {
        for (const item of interactables) {
          if (item.object === curr) {
            matchedConfig = item;
            break;
          }
        }
        if (matchedConfig) break;
        curr = curr.parent;
      }

      if (matchedConfig) {
        const maxDist = matchedConfig.maxDistance ?? 3.5;
        if (hit.distance <= maxDist && hit.distance < minDistance) {
          minDistance = hit.distance;
          nearestItem = matchedConfig;
        }
      }
    }

    // Handle focus state transitions
    const newId = nearestItem ? nearestItem.id : null;

    if (newId !== currentFocusedId.current) {
      // Leave old target
      if (currentFocusedId.current !== null) {
        const prev = registry.current.get(currentFocusedId.current);
        prev?.onHoverEnd?.();
      }

      // Enter new target
      if (nearestItem) {
        nearestItem.onHoverStart?.();
        if (audioPlayedForId.current !== nearestItem.id) {
          audio.playHover();
          audioPlayedForId.current = nearestItem.id;
        }
        setHoverPrompt(nearestItem.prompt);
        setActiveId(nearestItem.id);
      } else {
        audioPlayedForId.current = null;
        setHoverPrompt(null);
        setActiveId(null);
      }

      currentFocusedId.current = newId;
    }
  });

  // Global Click Listener for Crosshair Interaction
  useEffect(() => {
    const dom = gl.domElement;

    const handlePointerDown = (e: MouseEvent | PointerEvent) => {
      // Only primary left click (button 0)
      if (e.button !== 0) return;
      if (!internal) return;

      const focusedId = currentFocusedId.current;
      if (focusedId) {
        const item = internal.registry.current.get(focusedId);
        if (item) {
          item.onInteract();
          return;
        }
      }
      onEmptyClickRef.current?.();
    };

    // Attach to canvas DOM element
    dom.addEventListener('pointerdown', handlePointerDown);
    return () => {
      dom.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [gl, internal]);

  return null;
};
