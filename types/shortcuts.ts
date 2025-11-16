/**
 * Keyboard Shortcuts Type Definitions
 */

export interface KeyboardShortcut {
  id: string;
  name: string;
  description: string;
  defaultKeys: string[];
  keys: string[];
  category: 'navigation' | 'actions' | 'general';
  action: () => void;
}

export interface ShortcutCategory {
  id: string;
  name: string;
  shortcuts: KeyboardShortcut[];
}

export type ShortcutMap = Record<string, KeyboardShortcut>;
