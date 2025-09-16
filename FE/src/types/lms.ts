export interface Level {
  id: string;
  name: string;
  description?: string;
  order: number;
  passPercentage: number;
  isActive: boolean;
  subjects?: Subject[];
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  order: number;
  passPercentage: number;
  isActive: boolean;
  levelId: string;
  level?: Level;
  lessons?: Lesson[];
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  textContent?: string;
  imageUrl?: string;
  videoUrl?: string;
  contentType: 'text' | 'image' | 'video' | 'mixed';
  order: number;
  estimatedDuration: number;
  isActive: boolean;
  subjectId: string;
  subject?: Subject;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLevelDto {
  name: string;
  description?: string;
  order?: number;
  passPercentage?: number;
  isActive?: boolean;
}

export interface CreateSubjectDto {
  name: string;
  description?: string;
  order?: number;
  passPercentage?: number;
  isActive?: boolean;
  levelId: string;
}

export interface CreateLessonDto {
  title: string;
  description?: string;
  textContent?: string;
  imageUrl?: string;
  videoUrl?: string;
  contentType?: 'text' | 'image' | 'video' | 'mixed';
  order?: number;
  estimatedDuration?: number;
  isActive?: boolean;
  subjectId: string;
}