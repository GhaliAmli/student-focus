/**
 * Custom Hook: useTutorial
 * 
 * Manages interactive tutorial state and progression
 * Tracks completion in localStorage
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TutorialStep, TutorialProgress } from '@/types/tutorial';

const STORAGE_KEY = 'studentfocus_tutorial_progress';

/**
 * Tutorial steps configuration
 */
export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: '👋 Welcome to StudentFocus!',
    description: 'Let\'s take a quick tour of the key features to help you get started.',
    position: 'center',
    icon: '🎓',
  },
  {
    id: 'dashboard',
    title: '📊 Dashboard Overview',
    description: 'Your dashboard shows your study progress, upcoming tasks, and achievements at a glance.',
    target: '[data-tutorial="dashboard"]',
    position: 'bottom',
    icon: '📊',
  },
  {
    id: 'tasks',
    title: '✅ Task Management',
    description: 'Create, organize, and track your tasks. Use drag-and-drop to prioritize and mark tasks as complete.',
    target: '[data-tutorial="tasks"]',
    position: 'bottom',
    icon: '✅',
  },
  {
    id: 'calendar',
    title: '📅 Calendar & Planning',
    description: 'View your schedule, plan study sessions, and never miss a deadline with the calendar view.',
    target: '[data-tutorial="calendar"]',
    position: 'bottom',
    icon: '📅',
  },
  {
    id: 'analytics',
    title: '📈 Analytics & Insights',
    description: 'Track your productivity with detailed charts and statistics. See your progress over time.',
    target: '[data-tutorial="analytics"]',
    position: 'bottom',
    icon: '📈',
  },
  {
    id: 'gamification',
    title: '🎮 Gamification',
    description: 'Earn points, unlock badges, and maintain streaks! Make studying fun and rewarding.',
    position: 'center',
    icon: '🎮',
  },
  {
    id: 'ai-assistant',
    title: '🤖 AI Assistant',
    description: 'Get smart study suggestions and personalized recommendations from our AI assistant.',
    target: '[data-tutorial="ai-assistant"]',
    position: 'left',
    icon: '🤖',
  },
  {
    id: 'feedback',
    title: '💬 Feedback System',
    description: 'Share your thoughts! Use the feedback button to report bugs or suggest new features.',
    target: '[data-tutorial="feedback"]',
    position: 'left',
    icon: '💬',
  },
  {
    id: 'export-import',
    title: '💾 Export & Import',
    description: 'Backup your data by exporting to JSON, or import data from another device.',
    position: 'center',
    icon: '💾',
  },
  {
    id: 'shortcuts',
    title: '⌨️ Keyboard Shortcuts',
    description: 'Speed up your workflow with customizable keyboard shortcuts. Check Settings > Developers.',
    position: 'center',
    icon: '⌨️',
  },
  {
    id: 'easter-egg',
    title: '🎮 Easter Egg',
    description: 'Try the Konami Code (↑↑↓↓←→←→BA) for a fun surprise! Check the Credits page for more.',
    position: 'center',
    icon: '🎮',
  },
  {
    id: 'complete',
    title: '🎉 You\'re All Set!',
    description: 'You\'re ready to start using StudentFocus. You can replay this tutorial anytime from Settings > Help.',
    position: 'center',
    icon: '🎉',
  },
];

export function useTutorial() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState<TutorialProgress>({
    completed: false,
    currentStep: 0,
    skipped: false,
    lastShown: new Date().toISOString(),
  });

  /**
   * Load tutorial progress from localStorage
   */
  const loadProgress = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
        
        // Auto-start tutorial if not completed and first visit
        if (!parsed.completed && !parsed.skipped) {
          const lastShown = new Date(parsed.lastShown);
          const now = new Date();
          const daysSinceLastShown = (now.getTime() - lastShown.getTime()) / (1000 * 60 * 60 * 24);
          
          // Show tutorial if it's been more than 7 days or first time
          if (daysSinceLastShown > 7 || !parsed.lastShown) {
            setTimeout(() => {
              setIsActive(true);
            }, 1000); // Delay to let page load
          }
        }
      } else {
        // First time user - show tutorial after delay
        setTimeout(() => {
          setIsActive(true);
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to load tutorial progress:', error);
    }
  }, []);

  /**
   * Save tutorial progress to localStorage
   */
  const saveProgress = useCallback((newProgress: TutorialProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Failed to save tutorial progress:', error);
    }
  }, []);

  /**
   * Start the tutorial
   */
  const startTutorial = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
    saveProgress({
      ...progress,
      currentStep: 0,
      lastShown: new Date().toISOString(),
    });
  }, [progress, saveProgress]);

  /**
   * Go to next step
   */
  const nextStep = useCallback(() => {
    const next = currentStep + 1;
    
    if (next >= TUTORIAL_STEPS.length) {
      // Tutorial completed
      setIsActive(false);
      saveProgress({
        completed: true,
        currentStep: TUTORIAL_STEPS.length - 1,
        skipped: false,
        lastShown: new Date().toISOString(),
      });
    } else {
      setCurrentStep(next);
      saveProgress({
        ...progress,
        currentStep: next,
        lastShown: new Date().toISOString(),
      });
    }
  }, [currentStep, progress, saveProgress]);

  /**
   * Go to previous step
   */
  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      saveProgress({
        ...progress,
        currentStep: prev,
      });
    }
  }, [currentStep, progress, saveProgress]);

  /**
   * Skip tutorial
   */
  const skipTutorial = useCallback(() => {
    setIsActive(false);
    saveProgress({
      completed: false,
      currentStep: 0,
      skipped: true,
      lastShown: new Date().toISOString(),
    });
  }, [saveProgress]);

  /**
   * Reset tutorial progress
   */
  const resetTutorial = useCallback(() => {
    saveProgress({
      completed: false,
      currentStep: 0,
      skipped: false,
      lastShown: new Date().toISOString(),
    });
  }, [saveProgress]);

  /**
   * Close tutorial
   */
  const closeTutorial = useCallback(() => {
    setIsActive(false);
  }, []);

  // Load progress on mount
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Listen for custom event to open tutorial
  useEffect(() => {
    const handleOpenTutorial = () => {
      startTutorial();
    };

    window.addEventListener('open-tutorial', handleOpenTutorial);

    return () => {
      window.removeEventListener('open-tutorial', handleOpenTutorial);
    };
  }, [startTutorial]);

  return {
    isActive,
    currentStep,
    totalSteps: TUTORIAL_STEPS.length,
    currentStepData: TUTORIAL_STEPS[currentStep],
    progress,
    startTutorial,
    nextStep,
    previousStep,
    skipTutorial,
    resetTutorial,
    closeTutorial,
  };
}
