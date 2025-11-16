'use client';

import { useStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Flame, Star } from 'lucide-react';

const badgeInfo: Record<string, { name: string; icon: any; color: string }> = {
  'first-task': { name: 'First Steps', icon: Star, color: 'text-yellow-500' },
  'task-master': { name: 'Task Master', icon: Award, color: 'text-blue-500' },
  'task-legend': { name: 'Task Legend', icon: Trophy, color: 'text-purple-500' },
  'week-warrior': { name: 'Week Warrior', icon: Flame, color: 'text-orange-500' },
};

export function GamificationDisplay() {
  const { gamification } = useStore();

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Points and Streak */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{gamification.points}</p>
                <p className="text-xs text-muted-foreground">Points</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{gamification.streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold">{gamification.tasksCompleted}</p>
              <p className="text-xs text-muted-foreground">Tasks Done</p>
            </div>
          </div>

          {/* Badges */}
          {gamification.badges.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Badges Earned</p>
              <div className="flex flex-wrap gap-2">
                {gamification.badges.map((badge) => {
                  const info = badgeInfo[badge];
                  if (!info) return null;
                  const Icon = info.icon;
                  return (
                    <Badge
                      key={badge}
                      variant="outline"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      <Icon className={`h-4 w-4 ${info.color}`} />
                      <span>{info.name}</span>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
