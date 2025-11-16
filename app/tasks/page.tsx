'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit, Filter, Calendar as CalendarIcon, GripVertical, AlertCircle, Clock, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '@/types';
import { TaskForm } from '@/components/task-form';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableTask({ task, onEdit, onDelete, onToggle }: { 
  task: Task; 
  onEdit: () => void; 
  onDelete: () => void;
  onToggle: () => void;
}) {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 dark:bg-red-950';
      case 'medium': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      case 'low': return 'text-green-500 bg-green-50 dark:bg-green-950';
      default: return '';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-3 w-3" />;
      case 'medium': return <Clock className="h-3 w-3" />;
      case 'low': return <Zap className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <Card ref={setNodeRef} style={style} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {/* Drag Handle */}
          <button
            className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5" />
          </button>

          {/* Checkbox */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
            className="mt-1 h-5 w-5 rounded border-gray-300 cursor-pointer"
          />
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onEdit}
                  className="rounded-xl"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDelete}
                  className="rounded-xl text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="outline" className="rounded-lg">
                {task.category}
              </Badge>
              <Badge
                variant="outline"
                className={`rounded-lg flex items-center gap-1 ${getPriorityColor(task.priority)}`}
              >
                {getPriorityIcon(task.priority)}
                {task.priority}
              </Badge>
              <Badge variant="outline" className="rounded-lg">
                {task.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarIcon className="h-3 w-3" />
                {format(task.dueDate, 'MMM dd, yyyy')}
              </div>
              {task.estimatedTime && (
                <div className="text-xs text-muted-foreground">
                  ~{task.estimatedTime}min
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TasksPage() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask, reorderTasks } = useStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('manual');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium' as 'low' | 'medium' | 'high',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    category: '',
    estimatedTime: 60,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const categories = Array.from(new Set(tasks.map((t) => t.category))).filter(Boolean);

  const handleCreate = () => {
    if (!formData.title || !formData.category) return;

    addTask({
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      completed: false,
      dueDate: formData.dueDate,
      priority: formData.priority,
      difficulty: formData.difficulty,
      category: formData.category,
      estimatedTime: formData.estimatedTime,
    });

    setFormData({
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium',
      difficulty: 'medium',
      category: '',
      estimatedTime: 60,
    });
    setIsCreateOpen(false);
  };

  const handleEdit = () => {
    if (!editingTask || !formData.title) return;

    updateTask(editingTask.id, {
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority,
      difficulty: formData.difficulty,
      category: formData.category,
      estimatedTime: formData.estimatedTime,
    });

    setIsEditOpen(false);
    setEditingTask(null);
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate,
      priority: task.priority,
      difficulty: task.difficulty,
      category: task.category,
      estimatedTime: task.estimatedTime || 60,
    });
    setIsEditOpen(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = filteredTasks.findIndex((task) => task.id === active.id);
      const newIndex = filteredTasks.findIndex((task) => task.id === over.id);

      const newTasks = arrayMove(filteredTasks, oldIndex, newIndex);
      reorderTasks(newTasks);
    }
  };

  let filteredTasks = tasks.filter((task) => {
    if (filterCategory !== 'all' && task.category !== filterCategory) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    return true;
  });

  // Smart sorting
  if (sortBy !== 'manual') {
    filteredTasks = [...filteredTasks].sort((a, b) => {
      if (sortBy === 'dueDate') {
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === 'difficulty') {
        const difficultyOrder = { hard: 0, medium: 1, easy: 2 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }
      return 0;
    });
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage your study tasks and assignments</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Add a new task to your study list</DialogDescription>
            </DialogHeader>
            <TaskForm 
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleCreate}
              submitLabel="Create Task"
              categories={categories}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters & Sort:</span>
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual Order</SelectItem>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
              </SelectContent>
            </Select>

            {(filterCategory !== 'all' || filterPriority !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilterCategory('all');
                  setFilterPriority('all');
                }}
                className="rounded-xl"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tasks List with Drag & Drop */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground py-8">
                No tasks found. Create your first task to get started!
              </p>
            </CardContent>
          </Card>
        ) : sortBy === 'manual' ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredTasks.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {filteredTasks.map((task) => (
                <SortableTask
                  key={task.id}
                  task={task}
                  onEdit={() => openEditDialog(task)}
                  onDelete={() => deleteTask(task.id)}
                  onToggle={() => toggleTask(task.id)}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 h-5 w-5 rounded border-gray-300 cursor-pointer"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(task)}
                          className="rounded-xl"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask(task.id)}
                          className="rounded-xl text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                      <Badge variant="outline" className="rounded-lg">
                        {task.category}
                      </Badge>
                      <Badge
                        variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                        className="rounded-lg"
                      >
                        {task.priority}
                      </Badge>
                      <Badge variant="outline" className="rounded-lg">
                        {task.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarIcon className="h-3 w-3" />
                        {format(task.dueDate, 'MMM dd, yyyy')}
                      </div>
                      {task.estimatedTime && (
                        <div className="text-xs text-muted-foreground">
                          ~{task.estimatedTime}min
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Update your task details</DialogDescription>
          </DialogHeader>
          <TaskForm 
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleEdit}
            submitLabel="Save Changes"
            categories={categories}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
