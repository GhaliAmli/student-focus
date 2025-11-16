/**
 * Custom Hook: useKeyboardShortcuts
 * 
 * Manages global keyboard shortcuts with localStorage persistence
 * Allows users to customize shortcuts and trigger actions
 */

'use client';

import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { KeyboardShortcut, ShortcutMap } from '@/types/shortcuts';

const STORAGE_KEY = 'studentfocus_keyboard_shortcuts';

/**
 * Default keyboard shortcuts configuration
 */
export const DEFAULT_SHORTCUTS: KeyboardShortcut[] = [
  // Navigation shortcuts
  {
    id: 'nav_dashboard',
    name: 'Go to Dashboard',
    description: 'Navigate to the dashboard page',
    defaultKeys: ['ctrl', 'd'],
    keys: ['ctrl', 'd'],
    category: 'navigation',
    action: () => {},
  },
  {
    id: 'nav_tasks',
    name: 'Go to Tasks',
    description: 'Navigate to the tasks page',
    defaultKeys: ['ctrl', 't'],
    keys: ['ctrl', 't'],
    category: 'navigation',
    action: () => {},
  },
  {
    id: 'nav_calendar',
    name: 'Go to Calendar',
    description: 'Navigate to the calendar page',
    defaultKeys: ['ctrl', 'c'],
    keys: ['ctrl', 'c'],
    category: 'navigation',
    action: () => {},
  },
  {
    id: 'nav_analytics',
    name: 'Go to Analytics',
    description: 'Navigate to the analytics page',
    defaultKeys: ['ctrl', 'a'],
    keys: ['ctrl', 'a'],
    category: 'navigation',
    action: () => {},
  },
  {
    id: 'nav_settings',
    name: 'Go to Settings',
    description: 'Navigate to the settings page',
    defaultKeys: ['ctrl', ','],
    keys: ['ctrl', ','],
    category: 'navigation',
    action: () => {},
  },
  // Action shortcuts
  {
    id: 'action_new_task',
    name: 'Create New Task',
    description: 'Open dialog to create a new task',
    defaultKeys: ['ctrl', 'n'],
    keys: ['ctrl', 'n'],
    category: 'actions',
    action: () => {},
  },
  {
    id: 'action_search',
    name: 'Search',
    description: 'Focus on search input',
    defaultKeys: ['ctrl', 'k'],
    keys: ['ctrl', 'k'],
    category: 'actions',
    action: () => {},
  },
  {
    id: 'action_help',
    name: 'Show Help',
    description: 'Open help/tutorial',
    defaultKeys: ['ctrl', 'h'],
    keys: ['ctrl', 'h'],
    category: 'actions',
    action: () => {},
  },
  // General shortcuts
  {
    id: 'general_save',
    name: 'Save',
    description: 'Save current changes',
    defaultKeys: ['ctrl', 's'],
    keys: ['ctrl', 's'],
    category: 'general',
    action: () => {},
  },
  {
    id: 'general_refresh',
    name: 'Refresh',
    description: 'Refresh current page',
    defaultKeys: ['ctrl', 'r'],
    keys: ['ctrl', 'r'],
    category: 'general',
    action: () => {},
  },
];

export function useKeyboardShortcuts() {
  const router = useRouter();
  const [shortcuts, setShortcuts] = useState<ShortcutMap>({});
  const [isRecording, setIsRecording] = useState<string | null>(null);

  /**
   * Load shortcuts from localStorage or use defaults
   */
  const loadShortcuts = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const shortcutMap: ShortcutMap = {};
        
        DEFAULT_SHORTCUTS.forEach((defaultShortcut) => {
          const savedShortcut = parsed[defaultShortcut.id];
          shortcutMap[defaultShortcut.id] = {
            ...defaultShortcut,
            keys: savedShortcut?.keys || defaultShortcut.keys,
            action: getActionForShortcut(defaultShortcut.id),
          };
        });
        
        setShortcuts(shortcutMap);
      } else {
        // Initialize with defaults
        const shortcutMap: ShortcutMap = {};
        DEFAULT_SHORTCUTS.forEach((shortcut) => {
          shortcutMap[shortcut.id] = {
            ...shortcut,
            action: getActionForShortcut(shortcut.id),
          };
        });
        setShortcuts(shortcutMap);
      }
    } catch (error) {
      console.error('Failed to load shortcuts:', error);
    }
  }, []);

  /**
   * Get the action function for a shortcut ID
   */
  const getActionForShortcut = useCallback((id: string) => {
    const actions: Record<string, () => void> = {
      nav_dashboard: () => router.push('/dashboard'),
      nav_tasks: () => router.push('/tasks'),
      nav_calendar: () => router.push('/calendar'),
      nav_analytics: () => router.push('/analytics'),
      nav_settings: () => router.push('/settings'),
      action_new_task: () => {
        // Trigger new task dialog
        window.dispatchEvent(new CustomEvent('open-new-task-dialog'));
      },
      action_search: () => {
        // Focus search input
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        searchInput?.focus();
      },
      action_help: () => {
        // Open tutorial
        window.dispatchEvent(new CustomEvent('open-tutorial'));
      },
      general_save: () => {
        // Trigger save event
        window.dispatchEvent(new CustomEvent('save-changes'));
      },
      general_refresh: () => {
        window.location.reload();
      },
    };

    return actions[id] || (() => {});
  }, [router]);

  /**
   * Save shortcuts to localStorage
   */
  const saveShortcuts = useCallback((newShortcuts: ShortcutMap) => {
    try {
      const toSave: Record<string, { keys: string[] }> = {};
      Object.entries(newShortcuts).forEach(([id, shortcut]) => {
        toSave[id] = { keys: shortcut.keys };
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      setShortcuts(newShortcuts);
    } catch (error) {
      console.error('Failed to save shortcuts:', error);
    }
  }, []);

  /**
   * Update a specific shortcut
   */
  const updateShortcut = useCallback((id: string, newKeys: string[]) => {
    const updated = {
      ...shortcuts,
      [id]: {
        ...shortcuts[id],
        keys: newKeys,
      },
    };
    saveShortcuts(updated);
  }, [shortcuts, saveShortcuts]);

  /**
   * Reset a shortcut to default
   */
  const resetShortcut = useCallback((id: string) => {
    const defaultShortcut = DEFAULT_SHORTCUTS.find(s => s.id === id);
    if (defaultShortcut) {
      updateShortcut(id, defaultShortcut.defaultKeys);
    }
  }, [updateShortcut]);

  /**
   * Reset all shortcuts to defaults
   */
  const resetAllShortcuts = useCallback(() => {
    const defaultMap: ShortcutMap = {};
    DEFAULT_SHORTCUTS.forEach((shortcut) => {
      defaultMap[shortcut.id] = {
        ...shortcut,
        action: getActionForShortcut(shortcut.id),
      };
    });
    saveShortcuts(defaultMap);
  }, [getActionForShortcut, saveShortcuts]);

  /**
   * Handle keyboard events
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in inputs
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      // Exception: allow Ctrl+K for search even in inputs
      if (!(event.ctrlKey && event.key === 'k')) {
        return;
      }
    }

    // Build current key combination
    const pressedKeys: string[] = [];
    if (event.ctrlKey) pressedKeys.push('ctrl');
    if (event.altKey) pressedKeys.push('alt');
    if (event.shiftKey) pressedKeys.push('shift');
    if (event.metaKey) pressedKeys.push('meta');
    
    // Add the actual key (lowercase)
    const key = event.key.toLowerCase();
    if (!['control', 'alt', 'shift', 'meta'].includes(key)) {
      pressedKeys.push(key);
    }

    // Check if this matches any shortcut
    Object.values(shortcuts).forEach((shortcut) => {
      const shortcutKeys = shortcut.keys.map(k => k.toLowerCase());
      if (
        pressedKeys.length === shortcutKeys.length &&
        pressedKeys.every((key, index) => key === shortcutKeys[index])
      ) {
        event.preventDefault();
        shortcut.action();
      }
    });
  }, [shortcuts]);

  /**
   * Start recording a new shortcut
   */
  const startRecording = useCallback((shortcutId: string) => {
    setIsRecording(shortcutId);
  }, []);

  /**
   * Stop recording
   */
  const stopRecording = useCallback(() => {
    setIsRecording(null);
  }, []);

  /**
   * Handle recording keyboard events
   */
  const handleRecordingKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isRecording) return;

    event.preventDefault();

    const pressedKeys: string[] = [];
    if (event.ctrlKey) pressedKeys.push('ctrl');
    if (event.altKey) pressedKeys.push('alt');
    if (event.shiftKey) pressedKeys.push('shift');
    if (event.metaKey) pressedKeys.push('meta');
    
    const key = event.key.toLowerCase();
    if (!['control', 'alt', 'shift', 'meta'].includes(key)) {
      pressedKeys.push(key);
    }

    if (pressedKeys.length >= 2) {
      updateShortcut(isRecording, pressedKeys);
      stopRecording();
    }
  }, [isRecording, updateShortcut, stopRecording]);

  // Load shortcuts on mount
  useEffect(() => {
    loadShortcuts();
  }, [loadShortcuts]);

  // Attach keyboard event listeners
  useEffect(() => {
    if (isRecording) {
      window.addEventListener('keydown', handleRecordingKeyDown);
    } else {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', handleRecordingKeyDown);
    };
  }, [handleKeyDown, handleRecordingKeyDown, isRecording]);

  return {
    shortcuts: Object.values(shortcuts),
    updateShortcut,
    resetShortcut,
    resetAllShortcuts,
    startRecording,
    stopRecording,
    isRecording,
  };
}
