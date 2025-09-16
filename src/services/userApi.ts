import { User, LevelAssignment, AcademicYear, CreateUserRequest, CreateLevelAssignmentRequest } from '../types/user';

// Mock child notes data
const mockChildNotes: any[] = [
  {
    id: '1',
    deaconId: '1',
    servantId: '2',
    title: 'تقدم ممتاز في الحفظ',
    content: 'يوحنا يظهر تقدماً رائعاً في حفظ المزامير. لديه ذاكرة قوية ويشارك بنشاط في الدروس. أنصح بتشجيعه على المشاركة في مسابقة الحفظ القادمة.',
    category: 'academic',
    priority: 'medium',
    isPrivate: false,
    createdAt: '2024-12-20T14:30:00Z',
    updatedAt: '2024-12-20T14:30:00Z'
  },
  {
    id: '2',
    deaconId: '1',
    servantId: '2',
    title: 'ملاحظة حول السلوك',
    content: 'لاحظت أن يوحنا أصبح أكثر هدوءاً في الأسبوعين الماضيين. قد يكون هناك شيء يشغل باله. أقترح التحدث معه بلطف لمعرفة إذا كان يواجه أي تحديات.',
    category: 'behavioral',
    priority: 'high',
    isPrivate: true,
    createdAt: '2024-12-18T16:45:00Z',
    updatedAt: '2024-12-18T16:45:00Z'
  },
  {
    id: '3',
    deaconId: '1',
    servantId: '2',
    title: 'نمو روحي ملحوظ',
    content: 'يوحنا يظهر اهتماماً متزايداً بالصلاة والتأمل. يسأل أسئلة عميقة حول الإيمان ويشارك تجاربه الروحية مع زملائه. هذا تطور إيجابي جداً.',
    category: 'spiritual',
    priority: 'low',
    isPrivate: false,
    createdAt: '2024-12-15T11:20:00Z',
    updatedAt: '2024-12-15T11:20:00Z'
  },
  {
    id: '4',
    deaconId: '1',
    servantId: '2',
    title: 'اقتراح للأنشطة الإضافية',
    content: 'بناءً على اهتمام يوحنا بالألحان، أقترح تسجيله في ورشة الألحان المتقدمة. لديه صوت جميل وحس موسيقي جيد.',
    category: 'general',
    priority: 'medium',
    isPrivate: false,
    createdAt: '2024-12-12T09:15:00Z',
    updatedAt: '2024-12-12T09:15:00Z'
  }
];

// Mock data for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'deacon@example.com',
    firstName: 'يوحنا',
    lastName: 'سمير',
    role: 'deacon',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    deaconInfo: {
      dateOfBirth: '2010-05-15',
      parentId: '3',
      currentLevel: '1',
      enrollmentDate: '2024-09-01',
      notes: 'طالب متميز'
    }
  },
  {
    id: '2',
    email: 'servant@example.com',
    firstName: 'مريم',
    lastName: 'يوسف',
    role: 'servant',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    servantInfo: {
      specialization: 'تاريخ الكنيسة',
      assignedLevels: ['1', '2'],
      phone: '01234567890'
    }
  },
  {
    id: '3',
    email: 'parent@example.com',
    firstName: 'داود',
    lastName: 'إبراهيم',
    role: 'parent',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    parentInfo: {
      phone: '01234567890',
      address: 'القاهرة، مصر',
      occupation: 'مهندس',
      children: ['1']
    }
  }
];

const mockLevelAssignments: LevelAssignment[] = [
  {
    id: '1',
    deaconId: '1',
    levelId: '1',
    academicYear: '2024-2025',
    startDate: '2024-09-01',
    expectedEndDate: '2025-06-30',
    status: 'in_progress',
    progress: 60,
    notes: 'يحقق تقدماً جيداً',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockAcademicYears: AcademicYear[] = [
  {
    id: '1',
    year: '2024-2025',
    startDate: '2024-09-01',
    endDate: '2025-06-30',
    isActive: true,
    registrationStartDate: '2024-08-01',
    registrationEndDate: '2024-08-31'
  },
  {
    id: '2',
    year: '2025-2026',
    startDate: '2025-09-01',
    endDate: '2026-06-30',
    isActive: false,
    registrationStartDate: '2025-08-01',
    registrationEndDate: '2025-08-31'
  }
];

// Users API
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUsers), 500);
    });
  },

  getByRole: async (role: string): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = mockUsers.filter(u => u.role === role);
        resolve(users);
      }, 500);
    });
  },

  getById: async (id: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === id);
        if (user) resolve(user);
        else reject(new Error('User not found'));
      }, 500);
    });
  },

  create: async (data: CreateUserRequest): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockUsers.push(newUser);
        resolve(newUser);
      }, 500);
    });
  },

  update: async (id: string, data: Partial<User>): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockUsers.findIndex(u => u.id === id);
        if (index !== -1) {
          mockUsers[index] = { ...mockUsers[index], ...data, updatedAt: new Date().toISOString() };
          resolve(mockUsers[index]);
        } else {
          reject(new Error('User not found'));
        }
      }, 500);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockUsers.findIndex(u => u.id === id);
        if (index !== -1) {
          mockUsers.splice(index, 1);
          resolve();
        } else {
          reject(new Error('User not found'));
        }
      }, 500);
    });
  }
};

// Level Assignments API
export const levelAssignmentsApi = {
  getAll: async (): Promise<LevelAssignment[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockLevelAssignments), 500);
    });
  },

  getByDeaconId: async (deaconId: string): Promise<LevelAssignment[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const assignments = mockLevelAssignments.filter(a => a.deaconId === deaconId);
        resolve(assignments);
      }, 500);
    });
  },

  getByAcademicYear: async (academicYear: string): Promise<LevelAssignment[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const assignments = mockLevelAssignments.filter(a => a.academicYear === academicYear);
        resolve(assignments);
      }, 500);
    });
  },

  create: async (data: CreateLevelAssignmentRequest): Promise<LevelAssignment> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAssignment: LevelAssignment = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          status: 'assigned',
          progress: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockLevelAssignments.push(newAssignment);
        resolve(newAssignment);
      }, 500);
    });
  },

  update: async (id: string, data: Partial<LevelAssignment>): Promise<LevelAssignment> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockLevelAssignments.findIndex(a => a.id === id);
        if (index !== -1) {
          mockLevelAssignments[index] = { ...mockLevelAssignments[index], ...data, updatedAt: new Date().toISOString() };
          resolve(mockLevelAssignments[index]);
        } else {
          reject(new Error('Assignment not found'));
        }
      }, 500);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockLevelAssignments.findIndex(a => a.id === id);
        if (index !== -1) {
          mockLevelAssignments.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Assignment not found'));
        }
      }, 500);
    });
  }
};

// Academic Years API
export const academicYearsApi = {
  getAll: async (): Promise<AcademicYear[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAcademicYears), 500);
    });
  },

  getActive: async (): Promise<AcademicYear | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activeYear = mockAcademicYears.find(y => y.isActive);
        resolve(activeYear || null);
      }, 500);
    });
  },

  create: async (data: Omit<AcademicYear, 'id' | 'createdAt' | 'updatedAt'>): Promise<AcademicYear> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newYear: AcademicYear = {
          id: Math.random().toString(36).substr(2, 9),
          ...data
        };
        mockAcademicYears.push(newYear);
        resolve(newYear);
      }, 500);
    });
  }
};

// Child Notes API
export const childNotesApi = {
  getByDeaconId: async (deaconId: string): Promise<any[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const notes = mockChildNotes.filter(n => n.deaconId === deaconId);
        resolve(notes);
      }, 500);
    });
  },

  getByParentId: async (parentId: string): Promise<any[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find children of this parent
        const children = mockUsers.filter(u => u.role === 'deacon' && u.deaconInfo?.parentId === parentId);
        const childIds = children.map(c => c.id);
        
        // Get notes for all children
        const notes = mockChildNotes.filter(n => childIds.includes(n.deaconId));
        resolve(notes);
      }, 500);
    });
  },

  create: async (data: any): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newNote = {
          id: Math.random().toString(36).substr(2, 9),
          servantId: '2', // Current servant ID
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockChildNotes.push(newNote);
        resolve(newNote);
      }, 500);
    });
  },

  update: async (id: string, data: Partial<any>): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockChildNotes.findIndex(n => n.id === id);
        if (index !== -1) {
          mockChildNotes[index] = { ...mockChildNotes[index], ...data, updatedAt: new Date().toISOString() };
          resolve(mockChildNotes[index]);
        } else {
          reject(new Error('Note not found'));
        }
      }, 500);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockChildNotes.findIndex(n => n.id === id);
        if (index !== -1) {
          mockChildNotes.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Note not found'));
        }
      }, 500);
    });
  }
};