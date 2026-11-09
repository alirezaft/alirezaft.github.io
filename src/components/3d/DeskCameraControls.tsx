import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export interface DeskCameraControlsProps {
  /** Seated eye-level camera base position [x, y, z] */
  basePosition?: [number, number, number];
  /** Horizontal yaw clamp in radians [min, max] (default approx -75° to +75°) */
  yawClamp?: [number, number];
  /** Vertical pitch clamp in radians [min, max] (default approx -40° to +50°) */
  pitchClamp?: [number, number];
  /** Normal FOV when not zooming */
  normalFov?: number;
  /** Zoomed-in FOV */
  zoomFov?: number;
  /** Forward camera travel distance when holding right click */
  zoomNudgeDistance?: number;
  /** Callback fired when pointer lock state changes */
  onLockChange?: (locked: boolean) => void;
  /** Callback fired when zoom state changes */
  onZoomChange?: (zooming: boolean) => void;
}

export const DeskCameraControls: React.FC<DeskCameraControlsProps> = ({
  basePosition = [0, 1.55, 2.1],
  yawClamp = [-Math.PI * 0.42, Math.PI * 0.42], // ~ -75° to +75°
  pitchClamp = [-Math.PI * 0.22, Math.PI * 0.28], // ~ -40° (down) to +50° (up)
  normalFov = 45,
  zoomFov = 22,
  zoomNudgeDistance = 0.35,
  onLockChange,
  onZoomChange,
}) => {
  const { camera, gl } = useThree();

  // Euler angles
  const yaw = useRef(0);
  const pitch = useRef(0);

  // Smooth interpolation targets
  const targetYaw = useRef(0);
  const targetPitch = useRef(0);
  const targetFov = useRef(normalFov);
  const isRightMouseDown = useRef(false);

  // Touch tracking for mobile
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Sensitivity
  const MOUSE_SENSITIVITY = 0.0022;
  const TOUCH_SENSITIVITY = 0.0035;

  // Prevent right-click context menu across the canvas
  useEffect(() => {
    const dom = gl.domElement;
    const preventContextMenu = (e: MouseEvent) => e.preventDefault();
    dom.addEventListener('contextmenu', preventContextMenu);
    return () => dom.removeEventListener('contextmenu', preventContextMenu);
  }, [gl]);

  // Pointer Lock and Mouse Events
  useEffect(() => {
    const dom = gl.domElement;

    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === dom;
      onLockChange?.(locked);
    };

    const handlePointerLockError = () => {
      console.warn('Pointer lock failed or was rejected');
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Right-click activates zoom
      if (e.button === 2) {
        isRightMouseDown.current = true;
        onZoomChange?.(true);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 2) {
        isRightMouseDown.current = false;
        onZoomChange?.(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement !== dom) return;

      const movementX = e.movementX || 0;
      const movementY = e.movementY || 0;

      targetYaw.current -= movementX * MOUSE_SENSITIVITY;
      targetPitch.current -= movementY * MOUSE_SENSITIVITY;

      // Clamp target angles
      targetYaw.current = Math.max(yawClamp[0], Math.min(yawClamp[1], targetYaw.current));
      targetPitch.current = Math.max(pitchClamp[0], Math.min(pitchClamp[1], targetPitch.current));
    };

    // Touch events for mobile/tablet fallback
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStart.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - touchStart.current.x;
      const deltaY = e.touches[0].clientY - touchStart.current.y;

      targetYaw.current -= deltaX * TOUCH_SENSITIVITY;
      targetPitch.current -= deltaY * TOUCH_SENSITIVITY;

      targetYaw.current = Math.max(yawClamp[0], Math.min(yawClamp[1], targetYaw.current));
      targetPitch.current = Math.max(pitchClamp[0], Math.min(pitchClamp[1], targetPitch.current));

      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      touchStart.current = null;
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('pointerlockerror', handlePointerLockError);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    dom.addEventListener('touchstart', handleTouchStart, { passive: true });
    dom.addEventListener('touchmove', handleTouchMove, { passive: true });
    dom.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('pointerlockerror', handlePointerLockError);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);

      dom.removeEventListener('touchstart', handleTouchStart);
      dom.removeEventListener('touchmove', handleTouchMove);
      dom.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gl, yawClamp, pitchClamp, onLockChange, onZoomChange]);

  // Frame Loop: Smooth camera orientation and FOV lerp
  useFrame((_, delta) => {
    // Smooth angle lerping (damping factor ~ 14)
    const lerpSpeed = Math.min(1, delta * 14);
    yaw.current = THREE.MathUtils.lerp(yaw.current, targetYaw.current, lerpSpeed);
    pitch.current = THREE.MathUtils.lerp(pitch.current, targetPitch.current, lerpSpeed);

    // Apply rotation to camera using YXZ Euler order
    const euler = new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ');
    camera.quaternion.setFromEuler(euler);

    // Zoom FOV lerp
    const desiredFov = isRightMouseDown.current ? zoomFov : normalFov;
    targetFov.current = desiredFov;
    const perspCamera = camera as THREE.PerspectiveCamera;
    if (perspCamera.isPerspectiveCamera) {
      if (Math.abs(perspCamera.fov - desiredFov) > 0.05) {
        perspCamera.fov = THREE.MathUtils.lerp(perspCamera.fov, desiredFov, delta * 12);
        perspCamera.updateProjectionMatrix();
      }
    }

    // Camera forward nudge towards look direction when zooming
    const forwardDir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const nudgeAmount = isRightMouseDown.current ? zoomNudgeDistance : 0;
    const targetPos = new THREE.Vector3(basePosition[0], basePosition[1], basePosition[2]).add(
      forwardDir.clone().multiplyScalar(nudgeAmount)
    );

    camera.position.lerp(targetPos, delta * 10);
  });

  return null;
};
