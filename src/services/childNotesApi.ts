import { ChildNote } from '../types/childNote';

// Mock data for development
const mockChildNotes: ChildNote[] = [
  {
    id: '1',
    deaconId: '1',
    teacherId: 'teacher1',
    title: 'تحسن ملحوظ في الحضور',
    content: 'أظهر الطالب تحسناً كبيراً في الحضور والمشاركة خلال الأسبوعين الماضيين. يشارك بفعالية في النقاشات ويظهر اهتماماً حقيقياً بالدروس.',
    category: 'behavioral',
    priority: 'medium',
    isPrivate: false,
    createdAt: '2024-12-20T10:30:00Z',
    updatedAt: '2024-12-20T10:30:00Z'
  },
  {
    id: '2',
    deaconId: '1',
    teacherId: 'teacher1',
    title: 'يحتاج دعم إضافي في الكتاب المقدس',
    content: 'الطالب يواجه صعوبة في حفظ الآيات المطلوبة. أنصح بمراجعة إضافية في المنزل وربما جلسات دعم فردية.',
    category: 'academic',
    priority: 'high',
    isPrivate: true,
    createdAt: '2024-12-18T14:15:00Z',
    updatedAt: '2024-12-18T14:15:00Z'
  },
  {
    id: '3',
    deaconId: '1',
    teacherId: 'teacher1',
    title: 'نمو روحي ملحوظ',
    content: 'يظهر الطالب نمواً روحياً جميلاً من خلال مشاركته في الصلوات والأنشطة الروحية. يسأل أسئلة عميقة ويظهر رغبة حقيقية في التعلم.',
    category: 'spiritual',
    priority: 'medium',
    isPrivate: false,
    createdAt: '2024-12-15T16:45:00Z',
    updatedAt: '2024-12-15T16:45:00Z'
  }
];

export const childNotesApi = {
  // Get all notes
  getAll: async (): Promise<ChildNote[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockChildNotes]), 300);
    });
  },

  // Get notes by deacon ID
  getByDeaconId: async (deaconId: string): Promise<ChildNote[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const notes = mockChildNotes.filter(note => note.deaconId === deaconId);
        resolve(notes);
      }, 300);
    });
  },

  // Get notes by teacher ID
  getByTeacherId: async (teacherId: string): Promise<ChildNote[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const notes = mockChildNotes.filter(note => note.teacherId === teacherId);
        resolve(notes);
      }, 300);
    });
  },

  // Create a new note
  create: async (noteData: Omit<ChildNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChildNote> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newNote: ChildNote = {
          ...noteData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockChildNotes.unshift(newNote);
        resolve(newNote);
      }, 300);
    });
  },

  // Update a note
  update: async (id: string, noteData: Partial<ChildNote>): Promise<ChildNote> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockChildNotes.findIndex(note => note.id === id);
        if (index === -1) {
          reject(new Error('Note not found'));
          return;
        }
        
        mockChildNotes[index] = {
          ...mockChildNotes[index],
          ...noteData,
          updatedAt: new Date().toISOString()
        };
        resolve(mockChildNotes[index]);
      }, 300);
    });
  },

  // Delete a note
  delete: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockChildNotes.findIndex(note => note.id === id);
        if (index === -1) {
          reject(new Error('Note not found'));
          return;
        }
        
        mockChildNotes.splice(index, 1);
        resolve();
      }, 300);
    });
  },

  // Get notes statistics
  getStatistics: async (): Promise<{
    total: number;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
    recent: number;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const total = mockChildNotes.length;
        const byCategory = mockChildNotes.reduce((acc, note) => {
          acc[note.category] = (acc[note.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        const byPriority = mockChildNotes.reduce((acc, note) => {
          acc[note.priority] = (acc[note.priority] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const recent = mockChildNotes.filter(note => 
          new Date(note.createdAt) > oneWeekAgo
        ).length;
        
        resolve({
          total,
          byCategory,
          byPriority,
          recent
        });
      }, 300);
    });
  }
};