/**
 * Clear All Data Dialog Component
 * 
 * Provides a safe way to clear all app data with:
 * - Confirmation modal
 * - Undo functionality (5 seconds)
 * - Progress feedback
 * - Error handling
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Trash2, Undo2, CheckCircle2, Loader2 } from 'lucide-react';
import { useStore } from '@/lib/store';

interface ClearDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ClearDataDialog({ open, onOpenChange, onSuccess }: ClearDataDialogProps) {
  const { importData } = useStore();
  const [isClearing, setIsClearing] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const [undoCountdown, setUndoCountdown] = useState(5);
  const [backup, setBackup] = useState<string | null>(null);

  /**
   * Get all localStorage keys used by the app
   */
  const getAppLocalStorageKeys = useCallback(() => {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.startsWith('studentfocus_') ||
        key === 'tasks' ||
        key === 'exams' ||
        key === 'studyPlans' ||
        key === 'studySessions' ||
        key === 'settings' ||
        key === 'gamification'
      )) {
        keys.push(key);
      }
    }
    return keys;
  }, []);

  /**
   * Create backup of all data
   */
  const createBackup = useCallback(() => {
    try {
      const backupData: Record<string, string> = {};
      const keys = getAppLocalStorageKeys();
      
      keys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
          backupData[key] = value;
        }
      });

      return JSON.stringify(backupData);
    } catch (error) {
      console.error('Failed to create backup:', error);
      return null;
    }
  }, [getAppLocalStorageKeys]);

  /**
   * Restore from backup
   */
  const restoreFromBackup = useCallback(() => {
    if (!backup) return false;

    try {
      const backupData = JSON.parse(backup);
      
      Object.entries(backupData).forEach(([key, value]) => {
        localStorage.setItem(key, value as string);
      });

      // Reload page to restore state
      window.location.reload();
      return true;
    } catch (error) {
      console.error('Failed to restore backup:', error);
      return false;
    }
  }, [backup]);

  /**
   * Clear all app data
   */
  const handleClearData = useCallback(async () => {
    setIsClearing(true);

    try {
      // Create backup first
      const backupData = createBackup();
      setBackup(backupData);

      // Simulate async operation for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      // Clear all localStorage keys
      const keys = getAppLocalStorageKeys();
      keys.forEach(key => {
        localStorage.removeItem(key);
      });

      // Reset Zustand store to defaults
      importData({
        tasks: [],
        exams: [],
        studyPlans: [],
        studySessions: [],
      });

      setIsClearing(false);
      onOpenChange(false);
      
      // Show undo option
      setShowUndo(true);
      setUndoCountdown(5);

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to clear data:', error);
      setIsClearing(false);
      alert('Failed to clear data. Please try again.');
    }
  }, [createBackup, getAppLocalStorageKeys, importData, onOpenChange, onSuccess]);

  /**
   * Handle undo
   */
  const handleUndo = useCallback(() => {
    if (restoreFromBackup()) {
      setShowUndo(false);
      setBackup(null);
    }
  }, [restoreFromBackup]);

  /**
   * Countdown timer for undo
   */
  useEffect(() => {
    if (!showUndo) return;

    const timer = setInterval(() => {
      setUndoCountdown(prev => {
        if (prev <= 1) {
          setShowUndo(false);
          setBackup(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showUndo]);

  return (
    <>
      {/* Confirmation Dialog */}
      <Dialog open={open && !showUndo} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Confirm Data Reset
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-3">
              <p className="text-base">
                Are you sure you want to delete all saved data? This action will remove:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>All tasks and their completion status</li>
                <li>All exams and study plans</li>
                <li>All study sessions and analytics data</li>
                <li>Gamification progress (points, badges, streaks)</li>
                <li>App settings and preferences</li>
                <li>Keyboard shortcuts customization</li>
                <li>Tutorial progress</li>
                <li>Feedback submissions</li>
              </ul>
              <div className="p-3 rounded-lg bg-muted mt-4">
                <p className="text-sm font-medium text-foreground">
                  💡 Good news: You'll have 5 seconds to undo this action!
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isClearing}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleClearData}
              disabled={isClearing}
              className="rounded-xl"
            >
              {isClearing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Clearing Data...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Confirm - Clear All Data
                </>
              )}
            </Button>
          </DialogFooter>

          {/* Progress indicator */}
          {isClearing && (
            <div className="space-y-2">
              <Progress value={100} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                Clearing all data...
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Undo Toast */}
      {showUndo && (
        <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-card border-2 border-primary shadow-2xl rounded-2xl p-4 max-w-md">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <p className="font-semibold text-sm">All data cleared successfully!</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your app has been reset to default state.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleUndo}
                    className="rounded-xl"
                  >
                    <Undo2 className="h-3 w-3 mr-2" />
                    Undo ({undoCountdown}s)
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setShowUndo(false);
                      setBackup(null);
                    }}
                    className="rounded-xl"
                  >
                    Dismiss
                  </Button>
                </div>
                <Progress value={(undoCountdown / 5) * 100} className="h-1" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
