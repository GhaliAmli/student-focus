/**
 * Kanban Board Page
 * 
 * Drag & drop task management with 3 columns:
 * - To Do
 * - In Progress
 * - Completed
 * 
 * Features:
 * - Drag & drop between columns
 * - Real-time status updates
 * - Task counters per column
 * - Responsive layout
 * - Synced with global store
 */

'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, GripVertical, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '@/types';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type ColumnId = 'todo' | 'inprogress' | 'completed';

interface Column {
  id: ColumnId;
  title: string;
  status: 'todo' | 'inprogress' | 'completed';
}

const columns: Column[] = [
  { id: 'todo', title: 'To Do', status: 'todo' },
  { id: 'inprogress', title: 'In Progress', status: 'inprogress' },
  { id: 'completed', title: 'Completed', status: 'completed' },
];

export default function KanbanPage() {
  const { tasks, updateTask } = useStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Configure drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start drag
      },
    })
  );

  // Group tasks by status (fallback to completed field if status not set)
  const tasksByStatus = {
    todo: tasks.filter((t) => {
      if (t.status) return t.status === 'todo';
      return !t.completed;
    }),
    inprogress: tasks.filter((t) => t.status === 'inprogress'),
    completed: tasks.filter((t) => {
      if (t.status) return t.status === 'completed';
      return t.completed;
    }),
  };

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as ColumnId;

    // Find the task
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    // Update task status if changed
    if (task.status !== newStatus) {
      updateTask(taskId, {
        status: newStatus,
        completed: newStatus === 'completed',
      });
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
          <p className="text-muted-foreground">
            Drag and drop tasks to update their status
          </p>
        </div>
        <Button
          onClick={() => setShowTaskForm(true)}
          className="rounded-xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasksByStatus[column.id]}
            />
          ))}
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
        </DragOverlay>
      </DndContext>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskFormModal onClose={() => setShowTaskForm(false)} />
      )}
    </div>
  );
}

/**
 * Kanban Column Component
 */
interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
}

function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  const taskIds = tasks.map((t) => t.id);

  return (
    <Card className="rounded-2xl shadow-sm flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{column.title}</CardTitle>
          <Badge variant="secondary" className="rounded-full">
            {tasks.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-3 min-h-0">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground border-2 border-dashed rounded-xl">
              Drop tasks here
            </div>
          ) : (
            tasks.map((task) => <SortableTaskCard key={task.id} task={task} />)
          )}
        </SortableContext>
      </CardContent>
    </Card>
  );
}

/**
 * Sortable Task Card Wrapper
 */
interface SortableTaskCardProps {
  task: Task;
}

function SortableTaskCard({ task }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard task={task} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  );
}

/**
 * Task Card Component
 */
interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  dragHandleProps?: any;
}

function TaskCard({ task, isDragging = false, dragHandleProps }: TaskCardProps) {
  const priorityColors = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
  };

  const subjectColors: Record<string, string> = {
    Mathematics: 'bg-blue-500',
    Physics: 'bg-purple-500',
    Chemistry: 'bg-green-500',
    Biology: 'bg-teal-500',
    English: 'bg-pink-500',
    History: 'bg-orange-500',
    Geography: 'bg-cyan-500',
    Computer: 'bg-indigo-500',
  };

  return (
    <Card
      className={`rounded-xl cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md ${
        isDragging ? 'shadow-2xl rotate-2' : ''
      }`}
    >
      <CardContent className="p-4 space-y-3">
        {/* Drag Handle & Title */}
        <div className="flex items-start gap-2">
          <div
            {...dragHandleProps}
            className="mt-1 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm leading-tight break-words">
              {task.title}
            </h4>
          </div>
        </div>

        {/* Subject & Priority */}
        <div className="flex items-center gap-2 flex-wrap">
          {task.subject && (
            <div className="flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full ${
                  subjectColors[task.subject] || 'bg-gray-500'
                }`}
              />
              <span className="text-xs text-muted-foreground">{task.subject}</span>
            </div>
          )}
          <Badge
            variant="outline"
            className={`text-xs ${priorityColors[task.priority]} text-white border-0`}
          >
            {task.priority}
          </Badge>
        </div>

        {/* Due Date */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{format(task.dueDate, 'MMM dd, yyyy')}</span>
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            <Tag className="h-3 w-3 text-muted-foreground" />
            {task.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {task.tags.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{task.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Task Form Modal Component
 */
interface TaskFormModalProps {
  onClose: () => void;
}

function TaskFormModal({ onClose }: TaskFormModalProps) {
  const { addTask } = useStore();
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    dueDate: new Date(),
    priority: 'medium' as 'low' | 'medium' | 'high',
    status: 'todo' as 'todo' | 'inprogress' | 'completed',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addTask({
      id: Date.now().toString(),
      title: formData.title,
      subject: formData.subject,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: formData.status,
      completed: formData.status === 'completed',
      tags: [],
      difficulty: 'medium',
      category: formData.subject || 'General',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g., Mathematics"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as 'low' | 'medium' | 'high',
                  })
                }
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'todo' | 'inprogress' | 'completed',
                  })
                }
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 rounded-xl">
                Add Task
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
