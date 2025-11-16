'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, X, ChevronRight, Lightbulb, AlertCircle, TrendingUp } from 'lucide-react';
import { isToday, isTomorrow, isPast } from 'date-fns';

interface AISuggestion {
  id: string;
  type: 'tip' | 'reminder' | 'priority' | 'motivation';
  title: string;
  message: string;
  icon: any;
  color: string;
}

export function AIAssistant() {
  const { tasks, gamification, studySessions } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);

  useEffect(() => {
    // Generate context-aware suggestions
    const newSuggestions: AISuggestion[] = [];

    // Check for overdue tasks
    const overdueTasks = tasks.filter((t) => !t.completed && isPast(t.dueDate) && !isToday(t.dueDate));
    if (overdueTasks.length > 0) {
      newSuggestions.push({
        id: 'overdue',
        type: 'reminder',
        title: 'Overdue Tasks Alert',
        message: `You have ${overdueTasks.length} overdue task${overdueTasks.length > 1 ? 's' : ''}. Consider tackling them first to stay on track!`,
        icon: AlertCircle,
        color: 'text-red-500',
      });
    }

    // Check for today's tasks
    const todayTasks = tasks.filter((t) => !t.completed && isToday(t.dueDate));
    if (todayTasks.length > 0) {
      const highPriority = todayTasks.filter((t) => t.priority === 'high');
      if (highPriority.length > 0) {
        newSuggestions.push({
          id: 'today-high',
          type: 'priority',
          title: 'High Priority Today',
          message: `Focus on your ${highPriority.length} high-priority task${highPriority.length > 1 ? 's' : ''} due today: ${highPriority[0].title}${highPriority.length > 1 ? ' and more' : ''}.`,
          icon: TrendingUp,
          color: 'text-orange-500',
        });
      }
    }

    // Check for tomorrow's tasks
    const tomorrowTasks = tasks.filter((t) => !t.completed && isTomorrow(t.dueDate));
    if (tomorrowTasks.length > 0) {
      newSuggestions.push({
        id: 'tomorrow',
        type: 'reminder',
        title: 'Prepare for Tomorrow',
        message: `You have ${tomorrowTasks.length} task${tomorrowTasks.length > 1 ? 's' : ''} due tomorrow. Start preparing now to avoid last-minute stress!`,
        icon: Lightbulb,
        color: 'text-blue-500',
      });
    }

    // Productivity tips based on completion rate
    const completedCount = tasks.filter((t) => t.completed).length;
    const completionRate = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

    if (completionRate < 30 && tasks.length > 5) {
      newSuggestions.push({
        id: 'low-completion',
        type: 'tip',
        title: 'Boost Your Productivity',
        message: 'Try breaking down large tasks into smaller, manageable chunks. This makes them less overwhelming and easier to complete!',
        icon: Lightbulb,
        color: 'text-purple-500',
      });
    } else if (completionRate > 70) {
      newSuggestions.push({
        id: 'high-completion',
        type: 'motivation',
        title: 'Great Progress!',
        message: `You've completed ${completionRate.toFixed(0)}% of your tasks! Keep up the excellent work! 🎉`,
        icon: Sparkles,
        color: 'text-green-500',
      });
    }

    // Study session suggestions
    const recentSessions = studySessions.filter((s) => {
      const daysDiff = Math.floor((Date.now() - s.date.getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff <= 7;
    });

    if (recentSessions.length === 0 && tasks.length > 0) {
      newSuggestions.push({
        id: 'no-sessions',
        type: 'tip',
        title: 'Track Your Study Time',
        message: 'Start logging your study sessions to better understand your productivity patterns and optimize your schedule!',
        icon: TrendingUp,
        color: 'text-cyan-500',
      });
    }

    // Streak motivation
    if (gamification.streak >= 3) {
      newSuggestions.push({
        id: 'streak',
        type: 'motivation',
        title: 'Streak Power!',
        message: `You're on a ${gamification.streak}-day streak! Complete at least one task today to keep it going! 🔥`,
        icon: Sparkles,
        color: 'text-orange-500',
      });
    }

    // General productivity tips
    if (newSuggestions.length < 3) {
      const tips = [
        {
          id: 'pomodoro',
          type: 'tip' as const,
          title: 'Try the Pomodoro Technique',
          message: 'Work for 25 minutes, then take a 5-minute break. This helps maintain focus and prevents burnout!',
          icon: Lightbulb,
          color: 'text-indigo-500',
        },
        {
          id: 'morning',
          type: 'tip' as const,
          title: 'Morning Productivity',
          message: 'Tackle your most challenging tasks in the morning when your energy and focus are at their peak!',
          icon: Lightbulb,
          color: 'text-yellow-500',
        },
        {
          id: 'breaks',
          type: 'tip' as const,
          title: 'Take Regular Breaks',
          message: 'Regular breaks improve concentration and productivity. Step away from your desk every hour!',
          icon: Lightbulb,
          color: 'text-teal-500',
        },
      ];

      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      newSuggestions.push(randomTip);
    }

    setSuggestions(newSuggestions);
  }, [tasks, gamification, studySessions]);

  const nextSuggestion = () => {
    setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
  };

  const currentSug = suggestions[currentSuggestion];

  if (!currentSug) return null;

  const Icon = currentSug.icon;

  return (
    <>
      {/* Floating AI Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          size="icon"
          data-tutorial="ai-assistant"
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      )}

      {/* AI Assistant Panel */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 shadow-2xl z-50 rounded-2xl border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI Study Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {/* Current Suggestion */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-muted ${currentSug.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">
                    {currentSug.type}
                  </Badge>
                  <h3 className="font-semibold mb-1">{currentSug.title}</h3>
                  <p className="text-sm text-muted-foreground">{currentSug.message}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            {suggestions.length > 1 && (
              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  {currentSuggestion + 1} of {suggestions.length} suggestions
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextSuggestion}
                  className="rounded-xl"
                >
                  Next Tip
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}

            {/* Quick Stats */}
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground mb-2">Quick Stats</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded-lg bg-muted">
                  <p className="text-lg font-bold">{tasks.filter((t) => !t.completed).length}</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted">
                  <p className="text-lg font-bold">{gamification.points}</p>
                  <p className="text-xs text-muted-foreground">Points</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted">
                  <p className="text-lg font-bold">{gamification.streak}</p>
                  <p className="text-xs text-muted-foreground">Streak</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
