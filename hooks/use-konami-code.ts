/**
 * Custom React Hook: useKonamiCode
 * 
 * Detects the classic Konami Code sequence: ↑↑↓↓←→←→BA
 * 
 * How it works:
 * 1. Listens for keydown events on the window
 * 2. Tracks the sequence of keys pressed
 * 3. Compares against the Konami Code pattern
 * 4. Triggers callback when sequence is completed
 * 5. Resets if wrong key is pressed or sequence times out
 */

import { useEffect, useRef, useCallback } from 'react';

// Define the Konami Code sequence
const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

// Timeout duration: reset if no key pressed for 3 seconds
const SEQUENCE_TIMEOUT = 3000;

interface UseKonamiCodeOptions {
  onComplete: () => void;
  enabled?: boolean;
}

export function useKonamiCode({ onComplete, enabled = true }: UseKonamiCodeOptions) {
  // Track the current position in the sequence
  const sequenceIndexRef = useRef(0);
  
  // Track the timeout for resetting the sequence
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Reset the sequence tracking
   * Called when wrong key is pressed or timeout occurs
   */
  const resetSequence = useCallback(() => {
    sequenceIndexRef.current = 0;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  /**
   * Handle keydown events
   * Checks if the pressed key matches the next key in the sequence
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Get the current expected key in the sequence
      const expectedKey = KONAMI_CODE[sequenceIndexRef.current];
      
      // Check if the pressed key matches the expected key
      if (event.code === expectedKey) {
        // Move to the next position in the sequence
        sequenceIndexRef.current++;

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set a new timeout to reset if user stops typing
        timeoutRef.current = setTimeout(() => {
          resetSequence();
        }, SEQUENCE_TIMEOUT);

        // Check if the entire sequence is completed
        if (sequenceIndexRef.current === KONAMI_CODE.length) {
          // Sequence completed! Trigger the callback
          onComplete();
          resetSequence();
        }
      } else {
        // Wrong key pressed, reset the sequence
        resetSequence();
      }
    },
    [onComplete, resetSequence]
  );

  useEffect(() => {
    // Only attach listener if enabled
    if (!enabled) return;

    // Attach the keydown event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, handleKeyDown]);

  // Return the reset function for manual control
  return { resetSequence };
}

/**
 * Demo function to test the easter egg
 * Simulates the Konami Code sequence programmatically
 */
export function triggerKonamiCodeDemo() {
  console.log('🎮 Triggering Konami Code demo...');
  
  KONAMI_CODE.forEach((code, index) => {
    setTimeout(() => {
      const event = new KeyboardEvent('keydown', {
        code,
        bubbles: true,
      });
      window.dispatchEvent(event);
      console.log(`Key ${index + 1}/${KONAMI_CODE.length}: ${code}`);
    }, index * 200); // 200ms delay between each key
  });
}

// Expose demo function to window for easy testing in console
if (typeof window !== 'undefined') {
  (window as any).triggerKonamiCode = triggerKonamiCodeDemo;
}
