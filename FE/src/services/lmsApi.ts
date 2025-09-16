import { Level, Subject, Lesson, CreateLevelDto, CreateSubjectDto, CreateLessonDto } from '../types/lms';

const API_BASE = '/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Levels API
export const levelsApi = {
  getAll: async (): Promise<Level[]> => {
    const response = await fetch(`${API_BASE}/levels`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch levels');
    return response.json();
  },

  getById: async (id: string): Promise<Level> => {
    const response = await fetch(`${API_BASE}/levels/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch level');
    return response.json();
  },

  create: async (data: CreateLevelDto): Promise<Level> => {
    const response = await fetch(`${API_BASE}/levels`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create level');
    return response.json();
  },

  update: async (id: string, data: Partial<CreateLevelDto>): Promise<Level> => {
    const response = await fetch(`${API_BASE}/levels/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update level');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/levels/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete level');
  },
};

// Subjects API
export const subjectsApi = {
  getAll: async (): Promise<Subject[]> => {
    const response = await fetch(`${API_BASE}/subjects`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch subjects');
    return response.json();
  },

  getByLevel: async (levelId: string): Promise<Subject[]> => {
    const response = await fetch(`${API_BASE}/subjects/level/${levelId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch subjects');
    return response.json();
  },

  getById: async (id: string): Promise<Subject> => {
    const response = await fetch(`${API_BASE}/subjects/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch subject');
    return response.json();
  },

  create: async (data: CreateSubjectDto): Promise<Subject> => {
    const response = await fetch(`${API_BASE}/subjects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create subject');
    return response.json();
  },

  update: async (id: string, data: Partial<CreateSubjectDto>): Promise<Subject> => {
    const response = await fetch(`${API_BASE}/subjects/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update subject');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/subjects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete subject');
  },
};

// Lessons API
export const lessonsApi = {
  getAll: async (): Promise<Lesson[]> => {
    const response = await fetch(`${API_BASE}/lessons`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch lessons');
    return response.json();
  },

  getBySubject: async (subjectId: string): Promise<Lesson[]> => {
    const response = await fetch(`${API_BASE}/lessons/subject/${subjectId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch lessons');
    return response.json();
  },

  getById: async (id: string): Promise<Lesson> => {
    const response = await fetch(`${API_BASE}/lessons/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch lesson');
    return response.json();
  },

  create: async (data: CreateLessonDto): Promise<Lesson> => {
    const response = await fetch(`${API_BASE}/lessons`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create lesson');
    return response.json();
  },

  update: async (id: string, data: Partial<CreateLessonDto>): Promise<Lesson> => {
    const response = await fetch(`${API_BASE}/lessons/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update lesson');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/lessons/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete lesson');
  },
};