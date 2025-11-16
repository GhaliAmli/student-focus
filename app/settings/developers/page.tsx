/**
 * Developer Settings Page
 * 
 * Keyboard shortcuts and advanced developer tools
 */

'use client';

import { KeyboardShortcutsManager } from '@/components/keyboard-shortcuts-manager';

export default function DevelopersPage() {
  return (
    <div className="max-w-5xl">
      <KeyboardShortcutsManager />
    </div>
  );
}
