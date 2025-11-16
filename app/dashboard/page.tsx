'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { mockTasks, mockExams, mockStudySessions } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Clock, Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import { format, isToday, isTomorrow, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import Link from 'next/link';
import { GamificationDisplay } from '@/components/gamification-display';

export default function DashboardPage() {
  const { tasks, exams, studySessions, initialized, initializeFromStorage, addTask, addExam, addStudySession } = useStore();

  useEffect(() => {
    // Initialize from localStorage first
    if (!initialized) {
      initializeFromStorage();
    }
  }, [initialized, initializeFromStorage]);

  useEffect(() => {
    // Only load mock data once if storage is completely empty
    if (initialized && tasks.length === 0 && exams.length === 0 && studySessions.length === 0) {
      // Check if we've already loaded mock data in this session
      const mockDataLoaded = sessionStorage.getItem('mockDataLoaded');
      if (!mockDataLoaded) {
        mockTasks.forEach(addTask);
        mockExams.forEach(addExam);
        mockStudySessions.forEach(addStudySession);
        sessionStorage.setItem('mockDataLoaded', 'true');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  const todayTasks = tasks.filter((t) => !t.completed && isToday(t.dueDate));
  const completedToday = tasks.filter((t) => t.completed && isToday(t.dueDate)).length;
  const upcomingExams = exams.filter((e) => e.date >= new Date()).sort((a, b) => a.date.getTime() - b.date.getTime());
  
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const getDayLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE');
  };

  const getTasksForDay = (date: Date) => {
    return tasks.filter((t) => format(t.dueDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your study overview.</p>
      </div>

      {/* Gamification Display */}
      <GamificationDisplay />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {completedToday} completed today
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingExams.length}</div>
            <p className="text-xs text-muted-foreground">
              Next: {upcomingExams[0] ? format(upcomingExams[0].date, 'MMM dd') : 'None'}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {studySessions.reduce((acc, s) => acc + s.duration, 0)}m
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.length > 0 ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Overall progress</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Tasks</CardTitle>
                  <CardDescription>Focus on what matters today</CardDescription>
                </div>
                <Link href="/tasks">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTasks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No tasks due today. Great job! 🎉
                </p>
              ) : (
                todayTasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-xl border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => useStore.getState().toggleTask(task.id)}
                      className="mt-1 h-4 w-4 rounded border-gray-300"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{task.title}</p>
                        <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{task.category}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {task.estimatedTime}m
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Upcoming Exams */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Upcoming Exams</CardTitle>
              <CardDescription>Prepare for your tests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingExams.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No upcoming exams scheduled
                </p>
              ) : (
                upcomingExams.slice(0, 3).map((exam) => (
                  <div
                    key={exam.id}
                    className="flex items-start justify-between p-3 rounded-xl border bg-card"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{exam.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        {exam.topics.join(', ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{format(exam.date, 'MMM dd')}</p>
                      <Badge variant={exam.importance === 'high' ? 'destructive' : 'secondary'} className="text-xs mt-1">
                        {exam.importance}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Mini Calendar & Quick Actions */}
        <div className="space-y-4">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {weekDays.map((day) => {
                const dayTasks = getTasksForDay(day);
                const isCurrentDay = isToday(day);
                return (
                  <div
                    key={day.toString()}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      isCurrentDay ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">{getDayLabel(day)}</p>
                        <p className="text-sm font-medium">{format(day, 'd')}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {dayTasks.slice(0, 3).map((task, taskIndex) => (
                        <div
                          key={`${day.toString()}-${task.id}-${taskIndex}`}
                          className={`h-2 w-2 rounded-full ${
                            task.completed ? 'bg-green-500' : 'bg-orange-500'
                          }`}
                          title={task.title}
                        />
                      ))}
                      {dayTasks.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{dayTasks.length - 3}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Study Planner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Let AI create a personalized study plan based on your exams and schedule.
              </p>
              <Link href="/studyplan">
                <Button className="w-full rounded-xl" size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Study Plan
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
