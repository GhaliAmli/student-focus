import { Task, StudySession, StudyPlan, Exam } from '@/types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Calculus Problem Set',
    description: 'Chapter 5: Integration techniques',
    completed: false,
    dueDate: new Date(2025, 10, 18),
    priority: 'high',
    difficulty: 'hard',
    category: 'Mathematics',
    estimatedTime: 120,
  },
  {
    id: '2',
    title: 'Read Physics Chapter 8',
    description: 'Thermodynamics and heat transfer',
    completed: false,
    dueDate: new Date(2025, 10, 16),
    priority: 'medium',
    difficulty: 'medium',
    category: 'Physics',
    estimatedTime: 60,
  },
  {
    id: '3',
    title: 'History Essay Draft',
    description: 'World War II analysis',
    completed: true,
    dueDate: new Date(2025, 10, 15),
    priority: 'high',
    difficulty: 'medium',
    category: 'History',
    estimatedTime: 180,
  },
  {
    id: '4',
    title: 'Chemistry Lab Report',
    description: 'Acid-base titration experiment',
    completed: false,
    dueDate: new Date(2025, 10, 20),
    priority: 'medium',
    difficulty: 'easy',
    category: 'Chemistry',
    estimatedTime: 90,
  },
  {
    id: '5',
    title: 'Practice Spanish Vocabulary',
    description: 'Unit 4 words and phrases',
    completed: false,
    dueDate: new Date(2025, 10, 17),
    priority: 'low',
    difficulty: 'easy',
    category: 'Spanish',
    estimatedTime: 30,
  },
];

export const mockExams: Exam[] = [
  {
    id: '1',
    subject: 'Mathematics',
    date: new Date(2025, 10, 25),
    topics: ['Calculus', 'Linear Algebra', 'Differential Equations'],
    importance: 'high',
  },
  {
    id: '2',
    subject: 'Physics',
    date: new Date(2025, 10, 28),
    topics: ['Mechanics', 'Thermodynamics', 'Waves'],
    importance: 'high',
  },
  {
    id: '3',
    subject: 'Chemistry',
    date: new Date(2025, 11, 2),
    topics: ['Organic Chemistry', 'Chemical Bonding'],
    importance: 'medium',
  },
];

export const mockStudySessions: StudySession[] = [
  {
    id: '1',
    subject: 'Mathematics',
    duration: 90,
    date: new Date(2025, 10, 15, 14, 0),
    startTime: '14:00',
    notes: 'Focused on integration techniques',
    category: 'Mathematics',
  },
  {
    id: '2',
    subject: 'Physics',
    duration: 60,
    date: new Date(2025, 10, 15, 16, 0),
    startTime: '16:00',
    notes: 'Reviewed thermodynamics concepts',
    category: 'Physics',
  },
  {
    id: '3',
    subject: 'History',
    duration: 120,
    date: new Date(2025, 10, 16, 10, 0),
    startTime: '10:00',
    notes: 'Essay writing and research',
    category: 'History',
  },
];

export const mockStudyPlans: StudyPlan[] = [];

export const categoryColors: Record<string, string> = {
  Mathematics: 'bg-blue-500',
  Physics: 'bg-purple-500',
  Chemistry: 'bg-green-500',
  History: 'bg-orange-500',
  Spanish: 'bg-pink-500',
  Biology: 'bg-teal-500',
  English: 'bg-indigo-500',
  Computer: 'bg-cyan-500',
};
