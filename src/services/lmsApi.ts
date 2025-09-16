import { 
  Level, 
  Subject, 
  Lesson, 
  CreateLevelRequest, 
  CreateSubjectRequest, 
  CreateLessonRequest,
  UpdateLevelRequest,
  UpdateSubjectRequest,
  UpdateLessonRequest
} from '../types/lms';

const API_BASE_URL = 'http://localhost:3000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to create headers with auth
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getAuthToken()}`
});

// Mock data for development - replace with actual API calls
const mockLevels: Level[] = [
  {
    id: '1',
    name: 'المستوى الابتدائي',
    description: 'المستوى الأساسي للشمامسة الصغار',
    order: 1,
    passPercentage: 70,
    isActive: true,
    subjects: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'المستوى المتوسط',
    description: 'المستوى المتوسط للشمامسة',
    order: 2,
    passPercentage: 75,
    isActive: true,
    subjects: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockSubjects: Subject[] = [
  {
    id: '1',
    levelId: '1',
    name: 'تاريخ الكنيسة',
    description: 'تعلم تاريخ الكنيسة القبطية',
    order: 1,
    passPercentage: 80,
    isActive: true,
    lessons: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockLessons: Lesson[] = [
  {
    id: '1',
    subjectId: '1',
    title: 'مقدمة في تاريخ الكنيسة',
    description: 'درس تمهيدي عن تاريخ الكنيسة القبطية',
    order: 1,
    contentType: 'text',
    content: {
      text: 'محتوى الدرس النصي...'
    },
    duration: 30,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Levels API
export const levelsApi = {
  getAll: async (): Promise<Level[]> => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockLevels), 500);
    });
  },

  getById: async (id: string): Promise<Level> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const level = mockLevels.find(l => l.id === id);
        if (level) resolve(level);
        else reject(new Error('Level not found'));
      }, 500);
    });
  },

  create: async (data: CreateLevelRequest): Promise<Level> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newLevel: Level = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          isActive: true,
          subjects: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockLevels.push(newLevel);
        resolve(newLevel);
      }, 500);
    });
  },

  update: async (data: UpdateLevelRequest): Promise<Level> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockLevels.findIndex(l => l.id === data.id);
        if (index !== -1) {
          mockLevels[index] = { ...mockLevels[index], ...data, updatedAt: new Date().toISOString() };
          resolve(mockLevels[index]);
        } else {
          reject(new Error('Level not found'));
        }
      }, 500);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockLevels.findIndex(l => l.id === id);
        if (index !== -1) {
          mockLevels.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Level not found'));
        }
      }, 500);
    });
  }
};

// Subjects API
export const subjectsApi = {
  getAll: async (): Promise<Subject[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockSubjects), 500);
    });
  },

  getByLevelId: async (levelId: string): Promise<Subject[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const subjects = mockSubjects.filter(s => s.levelId === levelId);
        resolve(subjects);
      }, 500);
    });
  },

  getById: async (id: string): Promise<Subject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const subject = mockSubjects.find(s => s.id === id);
        if (subject) resolve(subject);
        else reject(new Error('Subject not found'));
      }, 500);
    });
  },

  create: async (data: CreateSubjectRequest): Promise<Subject> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSubject: Subject = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          isActive: true,
          lessons: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockSubjects.push(newSubject);
        resolve(newSubject);
      }, 500);
    });
  },

  update: async (data: UpdateSubjectRequest): Promise<Subject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockSubjects.findIndex(s => s.id === data.id);
        if (index !== -1) {
          mockSubjects[index] = { ...mockSubjects[index], ...data, updatedAt: new Date().toISOString() };
          resolve(mockSubjects[index]);
        } else {
          reject(new Error('Subject not found'));
        }
      }, 500);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockSubjects.findIndex(s => s.id === id);
        if (index !== -1) {
          mockSubjects.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Subject not found'));
        }
      }, 500);
    });
  }
};

// Lessons API
export const lessonsApi = {
  getAll: async (): Promise<Lesson[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockLessons), 500);
    });
  },

  getBySubjectId: async (subjectId: string): Promise<Lesson[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lessons = mockLessons.filter(l => l.subjectId === subjectId);
        resolve(lessons);
      }, 500);
    });
  },

  getById: async (id: string): Promise<Lesson> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const lesson = mockLessons.find(l => l.id === id);
        if (lesson) resolve(lesson);
        else reject(new Error('Lesson not found'));
      }, 500);
    });
  },

  create: async (data: CreateLessonRequest): Promise<Lesson> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newLesson: Lesson = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockLessons.push(newLesson);
        resolve(newLesson);
      }, 500);
    });
  },

  update: async (data: UpdateLessonRequest): Promise<Lesson> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockLessons.findIndex(l => l.id === data.id);
        if (index !== -1) {
          mockLessons[index] = { ...mockLessons[index], ...data, updatedAt: new Date().toISOString() };
          resolve(mockLessons[index]);
        } else {
          reject(new Error('Lesson not found'));
        }
      }, 500);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockLessons.findIndex(l => l.id === id);
        if (index !== -1) {
          mockLessons.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Lesson not found'));
        }
      }, 500);
    });
  }
};