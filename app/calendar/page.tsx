'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { categoryColors } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Plus, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, isSameDay, isToday } from 'date-fns';

export default function CalendarPage() {
  const { studySessions, tasks, addStudySession } = useStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [formData, setFormData] = useState({
    subject: '',
    duration: 60,
    startTime: '09:00',
    notes: '',
    category: '',
  });

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

  const handleCreate = () => {
    if (!formData.subject || !formData.category) return;

    const sessionDate = new Date();
    const [hours, minutes] = formData.startTime.split(':');
    sessionDate.setHours(parseInt(hours), parseInt(minutes));

    addStudySession({
      id: Date.now().toString(),
      subject: formData.subject,
      duration: formData.duration,
      date: sessionDate,
      startTime: formData.startTime,
      notes: formData.notes,
      category: formData.category,
    });

    setFormData({
      subject: '',
      duration: 60,
      startTime: '09:00',
      notes: '',
      category: '',
    });
    setIsCreateOpen(false);
  };

  const getSessionsForDay = (day: Date) => {
    return studySessions.filter((session) => isSameDay(session.date, day));
  };

  const getTasksForDay = (day: Date) => {
    return tasks.filter((task) => isSameDay(task.dueDate, day));
  };

  const getCategoryColor = (category: string) => {
    return categoryColors[category] || 'bg-gray-500';
  };

  const categories = Array.from(new Set([...tasks.map((t) => t.category), ...studySessions.map((s) => s.category)])).filter(Boolean);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">View and manage your study schedule</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl">
              <Plus className="h-4 w-4 mr-2" />
              Log Session
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>Log Study Session</DialogTitle>
              <DialogDescription>Record a study session</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g., Mathematics"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Mathematics"
                  list="categories"
                />
                <datalist id="categories">
                  {categories.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="What did you study?"
                  rows={3}
                />
              </div>

              <Button onClick={handleCreate} className="w-full rounded-xl">
                Log Session
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Week Navigation */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
              className="rounded-xl"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                {format(weekStart, 'MMM dd')} - {format(weekEnd, 'MMM dd, yyyy')}
              </h2>
              <p className="text-sm text-muted-foreground">Week View</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
              className="rounded-xl"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Calendar Grid */}
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-8 border-b">
            <div className="p-4 border-r bg-muted/30">
              <span className="text-sm font-medium text-muted-foreground">Time</span>
            </div>
            {weekDays.map((day) => (
              <div
                key={day.toString()}
                className={`p-4 text-center border-r ${
                  isToday(day) ? 'bg-primary/10' : ''
                }`}
              >
                <div className="text-sm font-medium">{format(day, 'EEE')}</div>
                <div className={`text-2xl font-bold ${isToday(day) ? 'text-primary' : ''}`}>
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-8">
            {/* Time column */}
            <div className="border-r bg-muted/30">
              {hours.map((hour) => (
                <div key={hour} className="h-20 border-b p-2 text-xs text-muted-foreground">
                  {format(new Date().setHours(hour, 0), 'h:mm a')}
                </div>
              ))}
            </div>

            {/* Day columns */}
            {weekDays.map((day) => {
              const daySessions = getSessionsForDay(day);
              const dayTasks = getTasksForDay(day);

              return (
                <div key={day.toString()} className="border-r relative">
                  {hours.map((hour) => (
                    <div key={hour} className="h-20 border-b hover:bg-accent/30 transition-colors" />
                  ))}

                  {/* Render sessions */}
                  <div className="absolute inset-0 pointer-events-none">
                    {daySessions.map((session) => {
                      const startHour = session.date.getHours();
                      const startMinute = session.date.getMinutes();
                      const topOffset = ((startHour - 8) * 80) + (startMinute / 60 * 80);
                      const height = (session.duration / 60) * 80;

                      return (
                        <div
                          key={session.id}
                          className={`absolute left-1 right-1 ${getCategoryColor(session.category)} text-white p-2 rounded-lg shadow-sm pointer-events-auto cursor-pointer hover:shadow-md transition-shadow`}
                          style={{
                            top: `${topOffset}px`,
                            height: `${Math.max(height, 40)}px`,
                          }}
                        >
                          <div className="text-xs font-medium truncate">{session.subject}</div>
                          <div className="text-xs opacity-90">{session.duration}m</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tasks indicator at top */}
                  {dayTasks.length > 0 && (
                    <div className="absolute top-0 left-0 right-0 p-1 space-y-1">
                      {dayTasks.slice(0, 2).map((task) => (
                        <div
                          key={task.id}
                          className={`text-xs p-1 rounded ${getCategoryColor(task.category)} text-white truncate`}
                        >
                          {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <div className="text-xs text-muted-foreground text-center">
                          +{dayTasks.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <div className={`h-4 w-4 rounded ${getCategoryColor(category)}`} />
                <span className="text-sm">{category}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Recent Study Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {studySessions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No study sessions logged yet
              </p>
            ) : (
              studySessions
                .slice()
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .slice(0, 5)
                .map((session) => (
                  <div
                    key={session.id}
                    className="flex items-start justify-between p-3 rounded-xl border bg-card"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-lg ${getCategoryColor(session.category)} flex items-center justify-center text-white font-semibold`}>
                        {session.category.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{session.subject}</p>
                        {session.notes && (
                          <p className="text-sm text-muted-foreground">{session.notes}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {session.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {session.duration}m
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{format(session.date, 'MMM dd')}</p>
                      <p>{session.startTime}</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
