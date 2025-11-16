/**
 * Keyboard Shortcuts Manager Component
 * 
 * Provides UI for viewing and editing keyboard shortcuts
 * Displays shortcuts by category with edit/reset functionality
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Keyboard, RotateCcw, Edit2, Check, X } from 'lucide-react';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';

export function KeyboardShortcutsManager() {
  const {
    shortcuts,
    updateShortcut,
    resetShortcut,
    resetAllShortcuts,
    startRecording,
    stopRecording,
    isRecording,
  } = useKeyboardShortcuts();

  const [editingId, setEditingId] = useState<string | null>(null);

  // Group shortcuts by category
  const categories = {
    navigation: shortcuts.filter(s => s.category === 'navigation'),
    actions: shortcuts.filter(s => s.category === 'actions'),
    general: shortcuts.filter(s => s.category === 'general'),
  };

  const categoryNames = {
    navigation: 'Navigation',
    actions: 'Actions',
    general: 'General',
  };

  const handleEdit = (shortcutId: string) => {
    setEditingId(shortcutId);
    startRecording(shortcutId);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    stopRecording();
  };

  const handleReset = (shortcutId: string) => {
    resetShortcut(shortcutId);
    setEditingId(null);
  };

  const formatKeys = (keys: string[]) => {
    return keys
      .map(key => {
        // Capitalize first letter
        return key.charAt(0).toUpperCase() + key.slice(1);
      })
      .join(' + ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Keyboard className="h-6 w-6" />
            Keyboard Shortcuts
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customize shortcuts to match your workflow
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetAllShortcuts}
          className="rounded-xl"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset All
        </Button>
      </div>

      {/* Instructions */}
      {isRecording && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
              <p className="text-sm font-medium">
                Press your desired key combination (e.g., Ctrl + K)
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelEdit}
                className="ml-auto"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shortcuts by Category */}
      {Object.entries(categories).map(([categoryId, categoryShortcuts]) => (
        <Card key={categoryId} className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">
              {categoryNames[categoryId as keyof typeof categoryNames]}
            </CardTitle>
            <CardDescription>
              {categoryId === 'navigation' && 'Navigate between pages quickly'}
              {categoryId === 'actions' && 'Perform common actions'}
              {categoryId === 'general' && 'General application shortcuts'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryShortcuts.map((shortcut) => (
                <div
                  key={shortcut.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    editingId === shortcut.id
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  {/* Shortcut Info */}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{shortcut.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {shortcut.description}
                    </p>
                  </div>

                  {/* Keys Display */}
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={editingId === shortcut.id ? 'default' : 'outline'}
                      className="font-mono text-xs px-3 py-1"
                    >
                      {formatKeys(shortcut.keys)}
                    </Badge>

                    {/* Action Buttons */}
                    {editingId === shortcut.id ? (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReset(shortcut.id)}
                          className="h-8 w-8 p-0"
                        >
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelEdit}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(shortcut.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Tips */}
      <Card className="rounded-2xl shadow-sm bg-muted/50">
        <CardContent className="pt-6">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">💡 Tips:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Click the edit icon to record a new shortcut</li>
              <li>Use modifier keys (Ctrl, Alt, Shift) for best results</li>
              <li>Shortcuts are saved automatically in your browser</li>
              <li>Reset individual shortcuts or all at once</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
