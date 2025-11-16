'use client';

import { useStore } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, CheckCircle2, Target, Calendar, BarChart3 } from 'lucide-react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export default function AnalyticsPage() {
  const { tasks, studySessions, gamification } = useStore();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  // Calculate statistics
  const completedTasks = tasks.filter((t) => t.completed);
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;
  const totalStudyTime = studySessions.reduce((acc, s) => acc + s.duration, 0);
  const avgTaskTime = completedTasks.length > 0 
    ? Math.round(completedTasks.reduce((acc, t) => acc + (t.estimatedTime || 0), 0) / completedTasks.length)
    : 0;

  // Weekly data
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const weeklyData = weekDays.map((day) => {
    const dayTasks = tasks.filter((t) => 
      format(t.dueDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    const completedCount = dayTasks.filter((t) => t.completed).length;
    const daySessions = studySessions.filter((s) =>
      format(s.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    const studyMinutes = daySessions.reduce((acc, s) => acc + s.duration, 0);

    return {
      day: format(day, 'EEE'),
      completed: completedCount,
      total: dayTasks.length,
      studyTime: studyMinutes,
    };
  });

  // Monthly data
  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());
  const monthTasks = tasks.filter((t) =>
    isWithinInterval(t.dueDate, { start: monthStart, end: monthEnd })
  );
  const monthCompleted = monthTasks.filter((t) => t.completed).length;

  // Category breakdown
  const categoryData = Object.entries(
    tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  // Priority breakdown
  const priorityData = [
    { name: 'High', value: tasks.filter((t) => t.priority === 'high').length },
    { name: 'Medium', value: tasks.filter((t) => t.priority === 'medium').length },
    { name: 'Low', value: tasks.filter((t) => t.priority === 'low').length },
  ].filter((d) => d.value > 0);

  // Recent completed tasks
  const recentCompleted = completedTasks.slice(-5).reverse();

  const selectedTaskData = selectedTask ? tasks.find((t) => t.id === selectedTask) : null;

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Progress</h1>
        <p className="text-muted-foreground">Track your study progress and productivity</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks.length} of {totalTasks} tasks
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m</div>
            <p className="text-xs text-muted-foreground">
              {studySessions.length} sessions logged
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Task Time</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgTaskTime}min</div>
            <p className="text-xs text-muted-foreground">
              Per completed task
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthCompleted}</div>
            <p className="text-xs text-muted-foreground">
              Tasks completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Progress */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Weekly Progress
            </CardTitle>
            <CardDescription>Tasks completed this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                <Bar dataKey="total" fill="#e5e7eb" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Study Time Trend */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Study Time Trend
            </CardTitle>
            <CardDescription>Minutes studied per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="studyTime" stroke="#8b5cf6" strokeWidth={2} name="Study Time (min)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pie Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category Distribution */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Tasks by Category</CardTitle>
            <CardDescription>Distribution across subjects</CardDescription>
          </CardHeader>
          <CardContent>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground py-20">No tasks yet</p>
            )}
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Tasks by Priority</CardTitle>
            <CardDescription>Priority level breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            {priorityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground py-20">No tasks yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Completed Tasks */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Recently Completed Tasks</CardTitle>
          <CardDescription>Click a task to see details</CardDescription>
        </CardHeader>
        <CardContent>
          {recentCompleted.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No completed tasks yet</p>
          ) : (
            <div className="space-y-3">
              {recentCompleted.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedTask === task.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <p className="font-medium">{task.title}</p>
                      </div>
                      {selectedTask === task.id && task.description && (
                        <p className="text-sm text-muted-foreground ml-6">{task.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{task.category}</Badge>
                      <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  {selectedTask === task.id && (
                    <div className="mt-3 ml-6 flex gap-4 text-sm text-muted-foreground">
                      <span>Difficulty: {task.difficulty}</span>
                      <span>Est. Time: {task.estimatedTime}min</span>
                      <span>Due: {format(task.dueDate, 'MMM dd, yyyy')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gamification Stats */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Achievement Stats</CardTitle>
          <CardDescription>Your gamification progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{gamification.points}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{gamification.streak} days</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <p className="text-sm text-muted-foreground">Badges Earned</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{gamification.badges.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
