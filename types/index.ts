export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  estimatedTime?: number;
  status?: 'todo' | 'inprogress' | 'completed';
  subject?: string;
  tags?: string[];
}

export interface Exam {
  id: string;
  subject: string;
  date: Date;
  topics: string[];
  importance: 'low' | 'medium' | 'high';
}

export interface StudySession {
  id: string;
  subject: string;
  duration: number;
  date: Date;
  startTime?: string;
  notes?: string;
  category: string;
}

export interface StudyPlan {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  goals: string[];
  hoursPerDay: number;
  exams: Exam[];
  generatedPlan?: string;
}
