/**
 * Tutorial Type Definitions
 */

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for element to highlight
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: () => void;
  icon?: string;
}

export interface TutorialProgress {
  completed: boolean;
  currentStep: number;
  skipped: boolean;
  lastShown: string;
}
