import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface UseObjectRotationProps {
  object: React.RefObject<THREE.Object3D | null> | THREE.Object3D | null;
  domElement: HTMLElement | null;
  enabled?: boolean;
  rotateSpeed?: number;
  dampingFactor?: number;
}

/**
 * Custom hook to enable object rotation via mouse/touch drag
 * Mimics OrbitControls rotation behavior but rotates the object instead of the camera
 *
 * @param object - The THREE.Object3D to rotate
 * @param domElement - The canvas/DOM element to attach event listeners
 * @param enabled - Whether rotation is enabled
 * @param rotateSpeed - Speed multiplier for rotation
 * @param dampingFactor - Damping factor for smooth momentum (0-1)
 */
export const useObjectRotation = ({
  object,
  domElement,
  enabled = true,
  rotateSpeed = 0.5,
  dampingFactor = 0.05,
}: UseObjectRotationProps) => {
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const isPointerDown = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const pointerDownPosition = useRef({ x: 0, y: 0 });
  const rotationQuaternion = useRef(new THREE.Quaternion());
  const worldUp = useRef(new THREE.Vector3(0, 1, 0));
  const worldRight = useRef(new THREE.Vector3(1, 0, 0));
  const [isInteracting, setIsInteracting] = useState(false);
  const DRAG_THRESHOLD = 5; // pixels - only start dragging after moving this many pixels

  // Normalize input: extract value from ref if needed
  const getObject = () => {
    if (!object) return null;
    // If object is a ref (MutableRefObject)
    if (typeof object === "object" && "current" in object) {
      return object.current;
    }
    // If object is already a THREE.Object3D
    return object as THREE.Object3D;
  };

  useEffect(() => {
    const currentObject = getObject();
    if (!currentObject || !domElement || !enabled) return;

    // Mouse events (left-click drag for desktop)
    const onPointerDown = (e: PointerEvent) => {
      // Allow left mouse button (button === 0) or touch pointer (button === -1)
      if (e.button === 0 || e.pointerType === "touch") {
        // Left mouse button or touch - don't prevent default yet, allow clicks through
        isPointerDown.current = true;
        pointerDownPosition.current = { x: e.clientX, y: e.clientY };
        previousPointer.current = { x: e.clientX, y: e.clientY };
        // Don't block propagation yet - wait to see if it's a drag or a click
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown.current) return;

      // Allow multi-touch gestures to pass through (for pinch zoom)
      if (!e.isPrimary) return;

      // Check if we've moved beyond the drag threshold
      if (!isDragging.current) {
        const deltaX = e.clientX - pointerDownPosition.current.x;
        const deltaY = e.clientY - pointerDownPosition.current.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance > DRAG_THRESHOLD) {
          // Confirmed drag - now block propagation and prevent default
          isDragging.current = true;
          setIsInteracting(true);
          domElement.style.cursor = "grabbing";
          e.preventDefault();
          e.stopPropagation();
        } else {
          return; // Still haven't moved far enough
        }
      } else {
        // Already dragging - continue blocking
        e.preventDefault();
        e.stopPropagation();
      }

      const deltaX = e.clientX - previousPointer.current.x;
      const deltaY = e.clientY - previousPointer.current.y;

      // Update rotation velocity based on mouse movement
      rotationVelocity.current.y = deltaX * rotateSpeed * 0.01;
      rotationVelocity.current.x = deltaY * rotateSpeed * 0.01;

      // Restart animation loop if there's movement
      startAnimating();

      previousPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      // Only handle primary pointer
      if (!e.isPrimary) return;

      isPointerDown.current = false;
      isDragging.current = false;
      setIsInteracting(false);
      domElement.style.cursor = "grab";
      // Only stop propagation if we were actually dragging
      // (not on every pointer up, since clicks need to propagate)
    };

    // Prevent context menu on right-click
    const onContextMenu = (e: Event) => e.preventDefault();

    // Animation loop for smooth rotation with damping
    let animationId: number | null = null;
    let isAnimating = false;
    
    const startAnimating = () => {
      if (isAnimating) return;
      isAnimating = true;
      animate();
    };
    
    const stopAnimating = () => {
      isAnimating = false;
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };
    
    const animate = () => {
      const currentObj = getObject();
      if (currentObj) {
        // Horizontal drag (deltaX) → rotate around world Y-axis (up)
        // Vertical drag (deltaY) → rotate around world X-axis (right)

        const rotationY = new THREE.Quaternion();
        const rotationX = new THREE.Quaternion();

        // Rotate around world Y-axis for horizontal drag
        rotationY.setFromAxisAngle(worldUp.current, rotationVelocity.current.y);

        // Rotate around world X-axis for vertical drag
        rotationX.setFromAxisAngle(
          worldRight.current,
          rotationVelocity.current.x,
        );

        // Apply rotations to object
        rotationQuaternion.current.copy(currentObj.quaternion);
        rotationQuaternion.current.premultiply(rotationY);
        rotationQuaternion.current.premultiply(rotationX);
        currentObj.quaternion.copy(rotationQuaternion.current);

        // Apply damping to create momentum/inertia effect
        rotationVelocity.current.x *= 1 - dampingFactor;
        rotationVelocity.current.y *= 1 - dampingFactor;

        // Stop very small velocities to prevent jittering and STOP animation loop
        if (Math.abs(rotationVelocity.current.x) < 0.0001) {
          rotationVelocity.current.x = 0;
        }
        if (Math.abs(rotationVelocity.current.y) < 0.0001) {
          rotationVelocity.current.y = 0;
        }
        
        // Only continue animation if there's still velocity
        if (rotationVelocity.current.x !== 0 || rotationVelocity.current.y !== 0) {
          animationId = requestAnimationFrame(animate);
        } else {
          stopAnimating();
        }
      } else {
        stopAnimating();
      }
    };

    // Add event listeners (pointer events handle both mouse and touch)
    domElement.addEventListener("pointerdown", onPointerDown);
    domElement.addEventListener("pointermove", onPointerMove);
    domElement.addEventListener("pointerup", onPointerUp);
    domElement.addEventListener("pointerleave", onPointerUp);
    domElement.addEventListener("contextmenu", onContextMenu);

    // Set cursor style
    domElement.style.cursor = "grab";

    // Cleanup function
    return () => {
      stopAnimating();
      domElement.removeEventListener("pointerdown", onPointerDown);
      domElement.removeEventListener("pointermove", onPointerMove);
      domElement.removeEventListener("pointerup", onPointerUp);
      domElement.removeEventListener("pointerleave", onPointerUp);
      domElement.removeEventListener("contextmenu", onContextMenu);
      domElement.style.cursor = "default";
    };
  }, [object, domElement, enabled, rotateSpeed, dampingFactor]);

  // Utility function to reset rotation
  const resetRotation = () => {
    const currentObj = getObject();
    if (currentObj) {
      currentObj.rotation.set(0, 0, 0);
      rotationVelocity.current = { x: 0, y: 0 };
    }
  };

  // Utility function to clear only velocity (keep current rotation)
  const clearRotationVelocity = () => {
    rotationVelocity.current = { x: 0, y: 0 };
  };

  return {
    resetRotation,
    clearRotationVelocity,
    isInteracting,
  };
};
