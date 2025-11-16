/**
 * Help Center Component
 * 
 * Provides access to tutorial and help resources
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Play, RotateCcw, BookOpen, MessageCircle } from 'lucide-react';
import { useTutorial } from '@/hooks/use-tutorial';

export function HelpCenter() {
  const { startTutorial, resetTutorial, progress } = useTutorial();

  const handleStartTutorial = () => {
    resetTutorial();
    startTutorial();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <HelpCircle className="h-6 w-6" />
          Help Center
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Get help and learn how to use StudentFocus
        </p>
      </div>

      {/* Tutorial Card */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Interactive Tutorial
          </CardTitle>
          <CardDescription>
            Step-by-step guide to all features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Take a guided tour through StudentFocus and learn about all the features,
            from task management to keyboard shortcuts.
          </p>

          {progress.completed && (
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                ✅ Tutorial completed! You can replay it anytime.
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleStartTutorial}
              className="rounded-xl flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              {progress.completed ? 'Replay Tutorial' : 'Start Tutorial'}
            </Button>
            {progress.completed && (
              <Button
                variant="outline"
                onClick={resetTutorial}
                className="rounded-xl"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-muted/50">
              <p className="font-medium text-sm mb-1">⌨️ Keyboard Shortcuts</p>
              <p className="text-xs text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-background border rounded">Ctrl + K</kbd> to
                search, <kbd className="px-2 py-1 bg-background border rounded">Ctrl + N</kbd> to
                create a new task
              </p>
            </div>

            <div className="p-3 rounded-xl bg-muted/50">
              <p className="font-medium text-sm mb-1">📊 Track Progress</p>
              <p className="text-xs text-muted-foreground">
                Visit the Analytics page to see detailed charts of your productivity
              </p>
            </div>

            <div className="p-3 rounded-xl bg-muted/50">
              <p className="font-medium text-sm mb-1">🎮 Gamification</p>
              <p className="text-xs text-muted-foreground">
                Complete tasks to earn points, unlock badges, and maintain your streak
              </p>
            </div>

            <div className="p-3 rounded-xl bg-muted/50">
              <p className="font-medium text-sm mb-1">💾 Backup Data</p>
              <p className="text-xs text-muted-foreground">
                Export your data as JSON from Settings to backup or transfer to another device
              </p>
            </div>

            <div className="p-3 rounded-xl bg-muted/50">
              <p className="font-medium text-sm mb-1">🎮 Easter Egg</p>
              <p className="text-xs text-muted-foreground">
                Try the Konami Code: ↑↑↓↓←→←→BA for a fun surprise!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Need More Help?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Can't find what you're looking for? We're here to help!
          </p>
          <Button
            variant="outline"
            className="w-full rounded-xl"
            onClick={() => {
              // Trigger feedback button
              window.dispatchEvent(new CustomEvent('open-feedback'));
            }}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Send Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
