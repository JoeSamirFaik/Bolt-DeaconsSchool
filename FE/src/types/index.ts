export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'deacon' | 'servant' | 'parent' | 'admin';
  stage?: string;
  level?: string;
  avatar?: string;
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  stage: string;
  level: string;
  content: {
    text?: string;
    videoUrl?: string;
    audioUrl?: string;
    attachments?: string[];
  };
  duration: number;
  order: number;
  createdAt: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
  timeSpent: number;
}

export interface Attendance {
  id: string;
  userId: string;
  sessionId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetRole?: string;
  targetStage?: string;
  targetLevel?: string;
  read: boolean;
  createdAt: string;
}