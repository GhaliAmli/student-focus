/**
 * Keyboard Shortcuts Provider
 * 
 * Wraps the app to enable global keyboard shortcuts
 */

'use client';

import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  return <>{children}</>;
}
