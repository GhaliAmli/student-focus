'use client';

import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/lib/store';
import { TaskForm } from '@/components/task-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFAB, setShowFAB] = useState(false);
  const { addTask, addExam } = useStore();

  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium' as 'low' | 'medium' | 'high',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    category: '',
    estimatedTime: 60,
  });

  const [examFormData, setExamFormData] = useState({
    subject: '',
    date: new Date(),
    topics: '',
    importance: 'medium' as 'low' | 'medium' | 'high',
  });

  // Show FAB after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowFAB(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut: 'n' to open
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'n' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setIsOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleCreateTask = () => {
    if (!taskFormData.title || !taskFormData.category) return;

    addTask({
      id: Date.now().toString(),
      title: taskFormData.title,
      description: taskFormData.description,
      completed: false,
      dueDate: taskFormData.dueDate,
      priority: taskFormData.priority,
      difficulty: taskFormData.difficulty,
      category: taskFormData.category,
      estimatedTime: taskFormData.estimatedTime,
    });

    setTaskFormData({
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium',
      difficulty: 'medium',
      category: '',
      estimatedTime: 60,
    });
    setIsOpen(false);
  };

  const handleCreateExam = () => {
    if (!examFormData.subject) return;

    const topicsArray = examFormData.topics
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t);

    addExam({
      id: Date.now().toString(),
      subject: examFormData.subject,
      date: examFormData.date,
      topics: topicsArray,
      importance: examFormData.importance,
    });

    setExamFormData({
      subject: '',
      date: new Date(),
      topics: '',
      importance: 'medium',
    });
    setIsOpen(false);
  };

  const categories = ['Mathematics', 'Physics', 'Chemistry', 'History', 'Spanish', 'Biology', 'English', 'Computer'];

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-300 z-50 ${
          showFAB ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Quick Add Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle>Quick Add</DialogTitle>
            <DialogDescription>
              Quickly add a new task or exam. Press &apos;n&apos; anytime to open this dialog.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="task" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="task">Task</TabsTrigger>
              <TabsTrigger value="exam">Exam</TabsTrigger>
            </TabsList>

            <TabsContent value="task" className="space-y-4 mt-4">
              <TaskForm
                formData={taskFormData}
                setFormData={setTaskFormData}
                onSubmit={handleCreateTask}
                submitLabel="Create Task"
                categories={categories}
              />
            </TabsContent>

            <TabsContent value="exam" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="exam-subject">Subject *</Label>
                <Input
                  id="exam-subject"
                  value={examFormData.subject}
                  onChange={(e) => setExamFormData({ ...examFormData, subject: e.target.value })}
                  placeholder="e.g., Mathematics"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exam-topics">Topics (comma-separated)</Label>
                <Input
                  id="exam-topics"
                  value={examFormData.topics}
                  onChange={(e) => setExamFormData({ ...examFormData, topics: e.target.value })}
                  placeholder="e.g., Calculus, Linear Algebra"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exam-importance">Importance</Label>
                <select
                  id="exam-importance"
                  value={examFormData.importance}
                  onChange={(e) => setExamFormData({ ...examFormData, importance: e.target.value as 'low' | 'medium' | 'high' })}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Exam Date</Label>
                <Calendar
                  mode="single"
                  selected={examFormData.date}
                  onSelect={(date) => date && setExamFormData({ ...examFormData, date })}
                  className="rounded-xl border"
                />
              </div>

              <Button onClick={handleCreateExam} className="w-full rounded-xl">
                Create Exam
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
