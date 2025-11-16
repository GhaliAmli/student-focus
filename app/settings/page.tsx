'use client';

import { useRef, useState } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Upload, Database, AlertCircle, CheckCircle2, Code, Palette, Sun, Moon, Monitor, Bell } from 'lucide-react';
import { ClearDataDialog } from '@/components/clear-data-dialog';

const accentColors = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Indigo', value: '#6366f1' },
];

export default function SettingsPage() {
  const { tasks, exams, studyPlans, studySessions, settings, updateSettings, exportData, importData } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `studentfocus-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setImportStatus({
      type: 'success',
      message: 'Data exported successfully!',
    });

    setTimeout(() => {
      setImportStatus({ type: null, message: '' });
    }, 3000);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data format');
        }

        importData(data);

        setImportStatus({
          type: 'success',
          message: `Successfully imported ${data.tasks?.length || 0} tasks, ${data.exams?.length || 0} exams, ${data.studyPlans?.length || 0} study plans, and ${data.studySessions?.length || 0} sessions!`,
        });

        setTimeout(() => {
          setImportStatus({ type: null, message: '' });
        }, 5000);
      } catch (error) {
        setImportStatus({
          type: 'error',
          message: `Failed to import data: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });

        setTimeout(() => {
          setImportStatus({ type: null, message: '' });
        }, 5000);
      }
    };

    reader.readAsText(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClearAllSuccess = () => {
    setImportStatus({
      type: 'success',
      message: 'All data cleared successfully! You have 5 seconds to undo.',
    });

    setTimeout(() => {
      setImportStatus({ type: null, message: '' });
    }, 6000);
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    updateSettings({ theme });
  };

  const handleAccentColorChange = (color: string) => {
    updateSettings({ accentColor: color });
  };

  const handleNotificationToggle = (key: 'taskReminders' | 'examReminders', value: boolean) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    });

    if (value) {
      // Show demo notification
      if (key === 'taskReminders') {
        alert('✅ Task reminders enabled! You will receive notifications for upcoming tasks.');
      } else {
        alert('✅ Exam reminders enabled! You will receive notifications for upcoming exams.');
      }
    }
  };

  const handleReminderTimeChange = (type: 'daily' | 'weekly', value: string) => {
    if (type === 'daily') {
      updateSettings({
        notifications: {
          ...settings.notifications,
          dailyReminderTime: value,
        },
      });
    } else {
      updateSettings({
        notifications: {
          ...settings.notifications,
          weeklyReminderDay: value,
        },
      });
    }
  };

  const totalItems = tasks.length + exams.length + studyPlans.length + studySessions.length;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your app preferences and data</p>
      </div>

      {/* Status Message */}
      {importStatus.type && (
        <Card className={`rounded-2xl shadow-sm border-2 ${
          importStatus.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-red-500 bg-red-50 dark:bg-red-950'
        }`}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              {importStatus.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              )}
              <p className={`text-sm ${
                importStatus.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
              }`}>
                {importStatus.message}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Theme & Appearance */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <CardTitle>Theme & Appearance</CardTitle>
          </div>
          <CardDescription>Customize the look and feel of your app</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Theme Mode</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleThemeChange('light')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  settings.theme === 'light'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Sun className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Light</p>
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  settings.theme === 'dark'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Moon className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Dark</p>
              </button>
              <button
                onClick={() => handleThemeChange('system')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  settings.theme === 'system'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Monitor className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">System</p>
              </button>
            </div>
          </div>

          {/* Accent Color */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Accent Color</Label>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleAccentColorChange(color.value)}
                  className={`relative p-3 rounded-xl border-2 transition-all ${
                    settings.accentColor === color.value
                      ? 'border-primary scale-110'
                      : 'border-border hover:scale-105'
                  }`}
                  title={color.name}
                >
                  <div
                    className="w-full h-8 rounded-lg"
                    style={{ backgroundColor: color.value }}
                  />
                  {settings.accentColor === color.value && (
                    <CheckCircle2 className="absolute -top-1 -right-1 h-5 w-5 text-primary bg-background rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Selected: {accentColors.find(c => c.value === settings.accentColor)?.name || 'Custom'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Manage your reminder preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Task Reminders */}
          <div className="flex items-center justify-between p-4 rounded-xl border bg-card">
            <div className="space-y-1">
              <Label htmlFor="task-reminders" className="text-base font-medium cursor-pointer">
                Task Reminders
              </Label>
              <p className="text-sm text-muted-foreground">
                Get notified about upcoming tasks and deadlines
              </p>
            </div>
            <Switch
              id="task-reminders"
              checked={settings.notifications.taskReminders}
              onCheckedChange={(checked) => handleNotificationToggle('taskReminders', checked)}
            />
          </div>

          {/* Exam Reminders */}
          <div className="flex items-center justify-between p-4 rounded-xl border bg-card">
            <div className="space-y-1">
              <Label htmlFor="exam-reminders" className="text-base font-medium cursor-pointer">
                Exam Reminders
              </Label>
              <p className="text-sm text-muted-foreground">
                Get notified about upcoming exams
              </p>
            </div>
            <Switch
              id="exam-reminders"
              checked={settings.notifications.examReminders}
              onCheckedChange={(checked) => handleNotificationToggle('examReminders', checked)}
            />
          </div>

          {/* Reminder Schedule */}
          {(settings.notifications.taskReminders || settings.notifications.examReminders) && (
            <div className="space-y-4 p-4 rounded-xl bg-muted/50">
              <h4 className="font-medium">Reminder Schedule</h4>
              
              <div className="space-y-2">
                <Label htmlFor="daily-time">Daily Reminder Time</Label>
                <Select
                  value={settings.notifications.dailyReminderTime}
                  onValueChange={(value) => handleReminderTimeChange('daily', value)}
                >
                  <SelectTrigger id="daily-time" className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weekly-day">Weekly Summary Day</Label>
                <Select
                  value={settings.notifications.weeklyReminderDay}
                  onValueChange={(value) => handleReminderTimeChange('weekly', value)}
                >
                  <SelectTrigger id="weekly-day" className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                    <SelectItem value="sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <p className="text-xs text-muted-foreground">
                💡 For this demo, notifications are shown as browser alerts. In production, these would be proper browser notifications.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Overview */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <CardTitle>Data Overview</CardTitle>
          </div>
          <CardDescription>Your current data stored locally in the browser</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-xl border bg-card">
              <div className="text-2xl font-bold">{tasks.length}</div>
              <p className="text-sm text-muted-foreground">Tasks</p>
            </div>
            <div className="p-4 rounded-xl border bg-card">
              <div className="text-2xl font-bold">{exams.length}</div>
              <p className="text-sm text-muted-foreground">Exams</p>
            </div>
            <div className="p-4 rounded-xl border bg-card">
              <div className="text-2xl font-bold">{studyPlans.length}</div>
              <p className="text-sm text-muted-foreground">Study Plans</p>
            </div>
            <div className="p-4 rounded-xl border bg-card">
              <div className="text-2xl font-bold">{studySessions.length}</div>
              <p className="text-sm text-muted-foreground">Sessions</p>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-muted/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Total Items</p>
                <p className="text-xs text-muted-foreground">All data stored locally</p>
              </div>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {totalItems}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Developer Tools */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <CardTitle>Developer Tools</CardTitle>
          </div>
          <CardDescription>Import, export, and manage your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Export Data */}
          <div className="p-4 rounded-xl border bg-card space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Data
                </h3>
                <p className="text-sm text-muted-foreground">
                  Download all your data as a JSON file for backup or transfer
                </p>
              </div>
            </div>
            <Button onClick={handleExport} className="rounded-xl" disabled={totalItems === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
          </div>

          {/* Import Data */}
          <div className="p-4 rounded-xl border bg-card space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Import Data
                </h3>
                <p className="text-sm text-muted-foreground">
                  Upload a JSON file to restore your data from a backup
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
                id="import-file"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="rounded-xl"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </div>
            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p className="font-medium mb-1">⚠️ Important:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Importing will merge with existing data</li>
                <li>Duplicate IDs will be overwritten</li>
                <li>Make sure to export your current data first as backup</li>
              </ul>
            </div>
          </div>

          {/* Clear All Data */}
          <div className="p-4 rounded-xl border border-destructive/50 bg-destructive/5 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  Clear All Data
                </h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete all tasks, exams, study plans, sessions, and settings
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowClearDialog(true)}
              variant="destructive"
              className="rounded-xl"
              disabled={totalItems === 0}
            >
              Clear All Data
            </Button>
            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p className="font-medium mb-1">💡 Safety Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Confirmation dialog before clearing</li>
                <li>5-second undo window after clearing</li>
                <li>Automatic backup created before deletion</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Storage Info */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Storage Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>✓ All data is stored locally in your browser using localStorage</p>
          <p>✓ Data persists across sessions and page refreshes</p>
          <p>✓ No internet connection required - fully offline-first</p>
          <p>✓ Export your data regularly as backup</p>
          <p>✓ Theme and notification preferences are saved automatically</p>
          <p>⚠️ Clearing browser data will delete all stored information</p>
        </CardContent>
      </Card>

      {/* Submitted Feedback (Testing) */}
      <FeedbackViewer />

      {/* Clear Data Dialog */}
      <ClearDataDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
        onSuccess={handleClearAllSuccess}
      />
    </div>
  );
}

function FeedbackViewer() {
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('studentfocus_feedback');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFeedbackList(parsed);
      } catch (e) {
        console.error('Error parsing feedback:', e);
      }
    }
  }, [isExpanded]);

  if (feedbackList.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-2xl shadow-sm border-dashed">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Submitted Feedback
            </CardTitle>
            <CardDescription>Testing: View feedback stored locally</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-xl"
          >
            {isExpanded ? 'Hide' : 'Show'} ({feedbackList.length})
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-3">
          {feedbackList.map((feedback) => (
            <div key={feedback.id} className="p-3 rounded-xl border bg-muted/50">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{feedback.name}</p>
                    <p className="text-xs text-muted-foreground">{feedback.email}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {new Date(feedback.timestamp).toLocaleDateString()}
                  </Badge>
                </div>
                <p className="text-sm">{feedback.message}</p>
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}

// Add imports at the top
import { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
