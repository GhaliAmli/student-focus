/**
 * Konami Code Easter Egg Component
 * 
 * Provides two fun effects when Konami Code is entered:
 * 1. Confetti explosion
 * 2. Spooky Halloween theme
 */

'use client';

import { useState, useEffect } from 'react';
import { useKonamiCode } from '@/hooks/use-konami-code';
import confetti from 'canvas-confetti';

export function KonamiEasterEgg() {
  const [isSpookyMode, setIsSpookyMode] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  /**
   * Handle Konami Code completion
   * Alternates between confetti and spooky mode
   */
  const handleKonamiComplete = () => {
    if (!isSpookyMode) {
      // First activation: Confetti!
      triggerConfetti();
      showSuccessMessage('🎮 Konami Code Activated! 🎉');
    } else {
      // Second activation: Toggle spooky mode off
      setIsSpookyMode(false);
      showSuccessMessage('👻 Spooky Mode Deactivated!');
    }
  };

  // Activate the Konami Code listener
  useKonamiCode({
    onComplete: handleKonamiComplete,
    enabled: true,
  });

  /**
   * Trigger confetti animation
   * Creates a burst of confetti across the screen
   */
  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        // After confetti, activate spooky mode
        setTimeout(() => {
          setIsSpookyMode(true);
          showSuccessMessage('👻 Spooky Mode Activated! 🎃');
        }, 500);
      }
    })();
  };

  /**
   * Show success message temporarily
   */
  const showSuccessMessage = (_message: string) => {
    setShowMessage(true);
    // Play sound effect (optional)
    playSound();
    
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  /**
   * Play a simple beep sound
   */
  const playSound = () => {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  };

  // Apply spooky theme to document
  useEffect(() => {
    if (isSpookyMode) {
      document.documentElement.classList.add('spooky-mode');
    } else {
      document.documentElement.classList.remove('spooky-mode');
    }
  }, [isSpookyMode]);

  return (
    <>
      {/* Success Message Overlay */}
      {showMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl shadow-2xl animate-bounce">
            <p className="text-2xl font-bold">
              {isSpookyMode ? '👻 Spooky Mode Activated! 🎃' : '🎮 Konami Code! 🎉'}
            </p>
          </div>
        </div>
      )}

      {/* Spooky Mode Overlay Effects */}
      {isSpookyMode && <SpookyModeEffects />}
    </>
  );
}

/**
 * Spooky Mode Visual Effects
 * Adds Halloween-themed decorations to the page
 */
function SpookyModeEffects() {
  return (
    <>
      {/* Floating Ghosts */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            👻
          </div>
        ))}
      </div>

      {/* Pumpkins in corners */}
      <div className="fixed top-4 left-4 text-6xl animate-pulse z-50 pointer-events-none">
        🎃
      </div>
      <div className="fixed top-4 right-4 text-6xl animate-pulse z-50 pointer-events-none" style={{ animationDelay: '0.5s' }}>
        🎃
      </div>

      {/* Spooky indicator */}
      <div className="fixed bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg z-50 animate-pulse">
        <span className="text-sm font-bold">👻 Spooky Mode Active</span>
      </div>
    </>
  );
}
