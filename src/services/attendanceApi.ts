import { 
  Session, 
  Attendance, 
  AttendanceSession, 
  CreateSessionRequest, 
  CreateAttendanceRequest,
  AttendanceStats
} from '../types/attendance';

// Mock data for development
const mockSessions: Session[] = [
  {
    id: '1',
    name: 'درس الكتاب المقدس',
    description: 'درس أسبوعي في الكتاب المقدس',
    type: 'lesson',
    date: '2024-12-15',
    startTime: '10:00',
    endTime: '11:30',
    location: 'قاعة الدراسة الرئيسية',
    instructorId: '2',
    levelIds: ['1'],
    isRecurring: true,
    recurringPattern: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: [0], // Sunday
      endDate: '2025-06-30'
    },
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'رحلة إلى الدير',
    description: 'رحلة تعليمية إلى دير الأنبا بيشوي',
    type: 'trip',
    date: '2024-12-20',
    startTime: '08:00',
    endTime: '18:00',
    location: 'دير الأنبا بيشوي',
    instructorId: '2',
    levelIds: ['1', '2'],
    isRecurring: false,
    maxAttendees: 30,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockAttendanceSessions: AttendanceSession[] = [
  {
    id: '1',
    sessionId: '1',
    date: '2024-12-15',
    startTime: '10:00',
    endTime: '11:30',
    status: 'completed',
    attendanceCount: 8,
    totalExpected: 10,
    takenBy: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockAttendance: Attendance[] = [
  {
    id: '1',
    sessionId: '1',
    deaconId: '1',
    date: '2024-12-15',
    status: 'present',
    arrivalTime: '10:05',
    takenBy: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Sessions API
export const sessionsApi = {
  getAll: async (): Promise<Session[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockSessions), 500);
    });
  },

  getById: async (id: string): Promise<Session> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const session = mockSessions.find(s => s.id === id);
        if (session) resolve(session);
        else reject(new Error('Session not found'));
      }, 500);
    });
  },

  getByDateRange: async (startDate: string, endDate: string): Promise<Session[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sessions = mockSessions.filter(s => 
          s.date >= startDate && s.date <= endDate
        );
        resolve(sessions);
      }, 500);
    });
  },

  create: async (data: CreateSessionRequest): Promise<Session> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSession: Session = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockSessions.push(newSession);
        resolve(newSession);
      }, 500);
    });
  },

  update: async (id: string, data: Partial<Session>): Promise<Session> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockSessions.findIndex(s => s.id === id);
        if (index !== -1) {
          mockSessions[index] = { ...mockSessions[index], ...data, updatedAt: new Date().toISOString() };
          resolve(mockSessions[index]);
        } else {
          reject(new Error('Session not found'));
        }
      }, 500);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockSessions.findIndex(s => s.id === id);
        if (index !== -1) {
          mockSessions.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Session not found'));
        }
      }, 500);
    });
  }
};

// Attendance Sessions API
export const attendanceSessionsApi = {
  getAll: async (): Promise<AttendanceSession[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAttendanceSessions), 500);
    });
  },

  getBySessionId: async (sessionId: string): Promise<AttendanceSession[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sessions = mockAttendanceSessions.filter(s => s.sessionId === sessionId);
        resolve(sessions);
      }, 500);
    });
  },

  getByDate: async (date: string): Promise<AttendanceSession[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sessions = mockAttendanceSessions.filter(s => s.date === date);
        resolve(sessions);
      }, 500);
    });
  },

  create: async (sessionId: string, date: string): Promise<AttendanceSession> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const session = mockSessions.find(s => s.id === sessionId);
        if (session) {
          const newAttendanceSession: AttendanceSession = {
            id: Math.random().toString(36).substr(2, 9),
            sessionId,
            date,
            startTime: session.startTime,
            endTime: session.endTime,
            status: 'scheduled',
            attendanceCount: 0,
            totalExpected: 0, // This would be calculated based on enrolled deacons
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          mockAttendanceSessions.push(newAttendanceSession);
          resolve(newAttendanceSession);
        }
      }, 500);
    });
  }
};

// Attendance API
export const attendanceApi = {
  getAll: async (): Promise<Attendance[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAttendance), 500);
    });
  },

  getBySessionAndDate: async (sessionId: string, date: string): Promise<Attendance[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const attendance = mockAttendance.filter(a => 
          a.sessionId === sessionId && a.date === date
        );
        resolve(attendance);
      }, 500);
    });
  },

  getByDeaconId: async (deaconId: string): Promise<Attendance[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const attendance = mockAttendance.filter(a => a.deaconId === deaconId);
        resolve(attendance);
      }, 500);
    });
  },

  create: async (data: CreateAttendanceRequest): Promise<Attendance> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAttendance: Attendance = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          takenBy: '2', // This would come from current user context
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockAttendance.push(newAttendance);
        resolve(newAttendance);
      }, 500);
    });
  },

  update: async (id: string, data: Partial<Attendance>): Promise<Attendance> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockAttendance.findIndex(a => a.id === id);
        if (index !== -1) {
          mockAttendance[index] = { ...mockAttendance[index], ...data, updatedAt: new Date().toISOString() };
          resolve(mockAttendance[index]);
        } else {
          reject(new Error('Attendance record not found'));
        }
      }, 500);
    });
  },

  bulkUpdate: async (attendanceRecords: { deaconId: string; status: string; arrivalTime?: string; notes?: string }[], sessionId: string, date: string): Promise<Attendance[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedRecords: Attendance[] = [];
        
        attendanceRecords.forEach(record => {
          const existingIndex = mockAttendance.findIndex(a => 
            a.sessionId === sessionId && a.date === date && a.deaconId === record.deaconId
          );
          
          if (existingIndex !== -1) {
            // Update existing record
            mockAttendance[existingIndex] = {
              ...mockAttendance[existingIndex],
              status: record.status as any,
              arrivalTime: record.arrivalTime,
              notes: record.notes,
              updatedAt: new Date().toISOString()
            };
            updatedRecords.push(mockAttendance[existingIndex]);
          } else {
            // Create new record
            const newAttendance: Attendance = {
              id: Math.random().toString(36).substr(2, 9),
              sessionId,
              deaconId: record.deaconId,
              date,
              status: record.status as any,
              arrivalTime: record.arrivalTime,
              notes: record.notes,
              takenBy: '2',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            mockAttendance.push(newAttendance);
            updatedRecords.push(newAttendance);
          }
        });
        
        resolve(updatedRecords);
      }, 500);
    });
  },

  getStats: async (deaconId: string, startDate?: string, endDate?: string): Promise<AttendanceStats> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let attendance = mockAttendance.filter(a => a.deaconId === deaconId);
        
        if (startDate && endDate) {
          attendance = attendance.filter(a => a.date >= startDate && a.date <= endDate);
        }
        
        const totalSessions = attendance.length;
        const attendedSessions = attendance.filter(a => a.status === 'present').length;
        const lateCount = attendance.filter(a => a.status === 'late').length;
        const excusedCount = attendance.filter(a => a.status === 'excused').length;
        
        const stats: AttendanceStats = {
          totalSessions,
          attendedSessions,
          attendanceRate: totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 0,
          lateCount,
          excusedCount
        };
        
        resolve(stats);
      }, 500);
    });
  }
};