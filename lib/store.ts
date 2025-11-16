import { create } from 'zustand';
import { Task, StudySession, StudyPlan, Exam } from '@/types';

interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  notifications: {
    taskReminders: boolean;
    examReminders: boolean;
    dailyReminderTime: string;
    weeklyReminderDay: string;
  };
}

interface Gamification {
  points: number;
  badges: string[];
  streak: number;
  lastCompletionDate: string | null;
  tasksCompleted: number;
  studyMinutes: number;
}

interface AppState {
  tasks: Task[];
  studySessions: StudySession[];
  studyPlans: StudyPlan[];
  exams: Exam[];
  settings: AppSettings;
  gamification: Gamification;
  initialized: boolean;
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;
  addStudySession: (session: StudySession) => void;
  deleteStudySession: (id: string) => void;
  addStudyPlan: (plan: StudyPlan) => void;
  deleteStudyPlan: (id: string) => void;
  addExam: (exam: Exam) => void;
  updateExam: (id: string, exam: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  initializeFromStorage: () => void;
  importData: (data: Partial<AppState>) => void;
  exportData: () => { tasks: Task[]; exams: Exam[]; studyPlans: StudyPlan[]; studySessions: StudySession[] };
}

// Helper to parse dates from localStorage
const parseDates = <T extends Record<string, any>>(obj: T): T => {
  const result: any = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      result[key] = new Date(value);
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = parseDates(value);
    }
  });
  return result as T;
};

// Save to localStorage
const saveToStorage = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// Load from localStorage
const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.map(parseDates) as T;
        }
        return parseDates(parsed) as T;
      } catch (e) {
        console.error(`Error parsing ${key} from localStorage:`, e);
      }
    }
  }
  return defaultValue;
};

const defaultSettings: AppSettings = {
  theme: 'system',
  accentColor: '#3b82f6', // blue-500
  notifications: {
    taskReminders: false,
    examReminders: false,
    dailyReminderTime: '09:00',
    weeklyReminderDay: 'monday',
  },
};

const defaultGamification: Gamification = {
  points: 0,
  badges: [],
  streak: 0,
  lastCompletionDate: null,
  tasksCompleted: 0,
  studyMinutes: 0,
};

// Helper to calculate points and badges
const calculateRewards = (task: Task, gamification: Gamification) => {
  let points = 10; // Base points
  
  // Bonus for priority
  if (task.priority === 'high') points += 15;
  else if (task.priority === 'medium') points += 10;
  else points += 5;
  
  // Bonus for difficulty
  if (task.difficulty === 'hard') points += 15;
  else if (task.difficulty === 'medium') points += 10;
  else points += 5;
  
  // Check for new badges
  const newBadges = [...gamification.badges];
  const tasksCompleted = gamification.tasksCompleted + 1;
  
  if (tasksCompleted === 1 && !newBadges.includes('first-task')) {
    newBadges.push('first-task');
  }
  if (tasksCompleted === 10 && !newBadges.includes('task-master')) {
    newBadges.push('task-master');
  }
  if (tasksCompleted === 50 && !newBadges.includes('task-legend')) {
    newBadges.push('task-legend');
  }
  if (gamification.streak >= 7 && !newBadges.includes('week-warrior')) {
    newBadges.push('week-warrior');
  }
  
  return { points, badges: newBadges, tasksCompleted };
};

export const useStore = create<AppState>((set, get) => ({
  tasks: [],
  studySessions: [],
  studyPlans: [],
  exams: [],
  settings: defaultSettings,
  gamification: defaultGamification,
  initialized: false,

  initializeFromStorage: () => {
    const tasks = loadFromStorage<Task[]>('studentfocus_tasks', []);
    const exams = loadFromStorage<Exam[]>('studentfocus_exams', []);
    const studyPlans = loadFromStorage<StudyPlan[]>('studentfocus_studyplans', []);
    const studySessions = loadFromStorage<StudySession[]>('studentfocus_studysessions', []);
    const settings = loadFromStorage<AppSettings>('studentfocus_settings', defaultSettings);
    const gamification = loadFromStorage<Gamification>('studentfocus_gamification', defaultGamification);

    // Apply theme on load
    if (typeof window !== 'undefined') {
      const theme = settings.theme === 'system' 
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : settings.theme;
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.style.setProperty('--accent-color', settings.accentColor);
    }

    set({
      tasks,
      exams,
      studyPlans,
      studySessions,
      settings,
      gamification,
      initialized: true,
    });
  },

  addTask: (task) =>
    set((state) => {
      // Check if task with same ID already exists
      if (state.tasks.some((t) => t.id === task.id)) {
        return state;
      }
      const newTasks = [...state.tasks, task];
      saveToStorage('studentfocus_tasks', newTasks);
      return { tasks: newTasks };
    }),

  updateTask: (id, updatedTask) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      saveToStorage('studentfocus_tasks', newTasks);
      return { tasks: newTasks };
    }),

  toggleTask: (id) =>
    set((state) => {
      const task = state.tasks.find((t) => t.id === id);
      if (!task) return state;

      const newTasks = state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      saveToStorage('studentfocus_tasks', newTasks);

      // If completing a task, update gamification
      if (!task.completed) {
        const today = new Date().toISOString().split('T')[0];
        const lastDate = state.gamification.lastCompletionDate;
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        // Calculate streak
        let newStreak = state.gamification.streak;
        if (lastDate === yesterday) {
          newStreak += 1;
        } else if (lastDate !== today) {
          newStreak = 1;
        }

        const rewards = calculateRewards(task, state.gamification);
        const newGamification = {
          ...state.gamification,
          points: state.gamification.points + rewards.points,
          badges: rewards.badges,
          tasksCompleted: rewards.tasksCompleted,
          streak: newStreak,
          lastCompletionDate: today,
        };

        saveToStorage('studentfocus_gamification', newGamification);

        // Trigger confetti
        if (typeof window !== 'undefined') {
          import('canvas-confetti').then((confetti) => {
            confetti.default({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
          });
        }

        return { tasks: newTasks, gamification: newGamification };
      }

      return { tasks: newTasks };
    }),

  reorderTasks: (tasks) =>
    set(() => {
      saveToStorage('studentfocus_tasks', tasks);
      return { tasks };
    }),

  deleteTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      saveToStorage('studentfocus_tasks', newTasks);
      return { tasks: newTasks };
    }),

  addStudySession: (session) =>
    set((state) => {
      // Check if session with same ID already exists
      if (state.studySessions.some((s) => s.id === session.id)) {
        return state;
      }
      const newSessions = [...state.studySessions, session];
      saveToStorage('studentfocus_studysessions', newSessions);
      return { studySessions: newSessions };
    }),

  deleteStudySession: (id) =>
    set((state) => {
      const newSessions = state.studySessions.filter((s) => s.id !== id);
      saveToStorage('studentfocus_studysessions', newSessions);
      return { studySessions: newSessions };
    }),

  addStudyPlan: (plan) =>
    set((state) => {
      // Check if plan with same ID already exists
      if (state.studyPlans.some((p) => p.id === plan.id)) {
        return state;
      }
      const newPlans = [...state.studyPlans, plan];
      saveToStorage('studentfocus_studyplans', newPlans);
      return { studyPlans: newPlans };
    }),

  deleteStudyPlan: (id) =>
    set((state) => {
      const newPlans = state.studyPlans.filter((p) => p.id !== id);
      saveToStorage('studentfocus_studyplans', newPlans);
      return { studyPlans: newPlans };
    }),

  addExam: (exam) =>
    set((state) => {
      // Check if exam with same ID already exists
      if (state.exams.some((e) => e.id === exam.id)) {
        return state;
      }
      const newExams = [...state.exams, exam];
      saveToStorage('studentfocus_exams', newExams);
      return { exams: newExams };
    }),

  updateExam: (id, updatedExam) =>
    set((state) => {
      const newExams = state.exams.map((exam) =>
        exam.id === id ? { ...exam, ...updatedExam } : exam
      );
      saveToStorage('studentfocus_exams', newExams);
      return { exams: newExams };
    }),

  deleteExam: (id) =>
    set((state) => {
      const newExams = state.exams.filter((exam) => exam.id !== id);
      saveToStorage('studentfocus_exams', newExams);
      return { exams: newExams };
    }),

  updateSettings: (newSettings) =>
    set((state) => {
      const updatedSettings = { ...state.settings, ...newSettings };
      saveToStorage('studentfocus_settings', updatedSettings);

      // Apply theme changes
      if (typeof window !== 'undefined') {
        if (newSettings.theme !== undefined) {
          const theme = updatedSettings.theme === 'system'
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : updatedSettings.theme;
          document.documentElement.classList.toggle('dark', theme === 'dark');
        }
        if (newSettings.accentColor !== undefined) {
          document.documentElement.style.setProperty('--accent-color', updatedSettings.accentColor);
        }
      }

      return { settings: updatedSettings };
    }),

  importData: (data) =>
    set((state) => {
      const newState = {
        tasks: data.tasks ? data.tasks.map(parseDates) : state.tasks,
        exams: data.exams ? data.exams.map(parseDates) : state.exams,
        studyPlans: data.studyPlans ? data.studyPlans.map(parseDates) : state.studyPlans,
        studySessions: data.studySessions ? data.studySessions.map(parseDates) : state.studySessions,
      };

      saveToStorage('studentfocus_tasks', newState.tasks);
      saveToStorage('studentfocus_exams', newState.exams);
      saveToStorage('studentfocus_studyplans', newState.studyPlans);
      saveToStorage('studentfocus_studysessions', newState.studySessions);

      return newState;
    }),

  exportData: () => {
    const state = get();
    return {
      tasks: state.tasks,
      exams: state.exams,
      studyPlans: state.studyPlans,
      studySessions: state.studySessions,
    };
  },
}));
