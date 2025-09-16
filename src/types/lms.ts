export interface Level {
  id: string;
  name: string;
  description: string;
  order: number;
  passPercentage: number; // Percentage of subjects/lessons needed to pass this level
  isActive: boolean;
  subjects: Subject[];
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  levelId: string;
  name: string;
  description: string;
  order: number;
  passPercentage: number; // Percentage of lessons needed to pass this subject
  isActive: boolean;
  lessons: Lesson[];
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  order: number;
  contentType: 'text' | 'image' | 'video' | 'mixed';
  content: LessonContent;
  duration: number; // in minutes
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LessonContent {
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  attachments?: string[];
}

export interface CreateLevelRequest {
  name: string;
  description: string;
  order: number;
  passPercentage: number;
}

export interface CreateSubjectRequest {
  levelId: string;
  name: string;
  description: string;
  order: number;
  passPercentage: number;
}

export interface CreateLessonRequest {
  subjectId: string;
  title: string;
  description: string;
  order: number;
  contentType: 'text' | 'image' | 'video' | 'mixed';
  content: LessonContent;
  duration: number;
}

export interface UpdateLevelRequest extends Partial<CreateLevelRequest> {
  id: string;
  isActive?: boolean;
}

export interface UpdateSubjectRequest extends Partial<CreateSubjectRequest> {
  id: string;
  isActive?: boolean;
}

export interface UpdateLessonRequest extends Partial<CreateLessonRequest> {
  id: string;
  isActive?: boolean;
}